import {Injectable, NotFoundException} from '@nestjs/common';
import {DatabaseService} from "../../core/database/database.service";
import {Receipt, ReceiptItem} from "../../core/entities/Receipt";
import {CreateReceiptDto} from "./dto/CreateReceipt.dto";
import {Employee} from "../../core/entities/Employee";
import {EmployeeService} from '../employee/employee.service';

@Injectable()
export class ReceiptService {
	constructor(
		private readonly databaseService: DatabaseService,
	) {
	}

	async create(employee: Employee, createReceiptDto: CreateReceiptDto) {
		const transactionClient = await this.databaseService.getClient();

		try {
			await transactionClient.query('BEGIN');
			const getProductsQuery = `
        SELECT upc, products_number, selling_price FROM store_product
        WHERE upc = ANY($1)
        FOR UPDATE;
      `;
			const productsResult = await transactionClient.query
				< {upc: string, products_number: number, selling_price: number} >
				(
					getProductsQuery, [createReceiptDto.products.map(product => product.upc)]
				);

			if (productsResult.rows.length < createReceiptDto.products.length) {
				const notFoundProducts = createReceiptDto.products.filter(product => !productsResult.rows.some(row => row.upc === product.upc));
				throw new NotFoundException(`Products with UPC ${notFoundProducts.map(product => product.upc).join(', ')} not found`);
			}

			// Check if all products are available
			// Map with key as UPC and value as [products_number, selling_price]
			const products = new Map<string, [number, number]>();
			for (const row of productsResult.rows) {
				products.set(row.upc, [row.products_number, row.selling_price]);
			}
			for (const product of createReceiptDto.products) {
				const [availableStock] = products.get(product.upc);
				if (!availableStock || availableStock < product.products_number) {
					throw new NotFoundException(`Product with UPC ${product.upc} not found or insufficient stock`);
				}
			}

			// Calculate total sum
			const totalSum = createReceiptDto.products.reduce(
				(sum, product) => sum + product.products_number * products.get(product.upc)[1], 0
			);

			// Insert receipt
			const insertQuery = `
			  INSERT INTO receipt (id_employee, card_number, sum_total)
			  VALUES ($1, $2, $3)
			  RETURNING *;
			`;
			const values = [
				employee.id_employee,
				createReceiptDto.card_number,
				totalSum,
			];
			const result = await transactionClient.query<Receipt>(insertQuery, values);
			const receipt = result.rows[0];

			// Insert sales
			const insertSaleValues = [];
			for (const product of createReceiptDto.products) {
				insertSaleValues.push([receipt.receipt_number, product.upc, product.products_number, products.get(product.upc)[1]]);
			}
			const insertSaleQuery = `
				INSERT INTO sale (receipt_number, upc, product_number, selling_price)
				VALUES ${insertSaleValues.map((_, i) => `($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}, $${i * 4 + 4})`).join(', ')}
			`;
			await transactionClient.query(insertSaleQuery, insertSaleValues.flat());

			// Update product stock
			const updateProductQueries = [];
			for (const product of createReceiptDto.products) {
				const [availableStock] = products.get(product.upc);
				const newStock = availableStock - product.products_number;
				updateProductQueries.push(`
					UPDATE store_product
					SET products_number = $1
					WHERE upc = $2
				`);
				updateProductQueries.push(
					transactionClient.query(updateProductQueries[updateProductQueries.length - 1], [newStock, product.upc])
				);
			}
			await Promise.all(updateProductQueries);
			await transactionClient.query('COMMIT');
			transactionClient.release();

			return receipt;
		} catch (e) {
			await transactionClient.query('ROLLBACK');
			transactionClient.release();
			// Handle foreign key violation
			if (e.code === '23503' && e.constraint === 'fk_receipt_id_employee') {
				throw new NotFoundException('Employee not found');
			}
			if (e.code === '23503' && e.constraint === 'fk_receipt_customer_card') {
				throw new NotFoundException('Card Number not found');
			}

			throw e;
		}
	}

	async getReceiptById(receipt_number: string, detailed: boolean = false): Promise<Receipt | null> {
		const query = `
      SELECT * FROM receipt
      WHERE receipt_number = $1
    `;
		const result = await this.databaseService.query<Receipt>(query, [receipt_number]);

		const receipt = result.rows.length ? result.rows[0] : null;

		if (!receipt) {
			return receipt;
		}

		if (detailed) {
			const receiptItems = await this.getReceiptsItemsByReceiptNumber([receipt.receipt_number]);
			receipt.items = receiptItems[receipt.receipt_number];
		}

		return receipt
	}
	async remove(receipt_number: string): Promise<void> {
		const receipt = await this.getReceiptById(receipt_number);
		if (!receipt) {
			throw new NotFoundException('Receipt not found');
		}

		const query = `
      DELETE FROM receipt
      WHERE receipt_number = $1
    `;

		await this.databaseService.query(query, [receipt_number]);
	}
	async getReceiptsItemsByReceiptNumber(receipt_numbers: string[]): Promise<{
		[k: string]: ReceiptItem[]
	}> {
		const query = `
      SELECT 
			receipt.receipt_number, 
			receipt.print_date,
			sale.product_number, 
			sale.selling_price,
			product.product_name
			FROM receipt
			INNER JOIN sale ON receipt.receipt_number = sale.receipt_number
			INNER JOIN store_product ON store_product.upc = sale.upc
			INNER JOIN product ON store_product.id_product = product.id_product
			WHERE receipt.receipt_number = ANY($1)
    `;
		const result = await this.databaseService.query
			< ReceiptItem & {receipt_number: string} >
			(query, [receipt_numbers]
			);
		const receipts = new Map<string, ReceiptItem[]>();
		for (const row of result.rows) {
			if (!receipts.has(row.receipt_number)) {
				receipts.set(row.receipt_number, []);
			}
			receipts.get(row.receipt_number).push({
				print_date: row.print_date,
				product_number: row.product_number,
				selling_price: row.selling_price,
				product_name: row.product_name,
			});
		}

		return Object.fromEntries(receipts);
	}
	async getReceiptsSorted(sortOptions: {
		employee_id?: string;
		startDate?: Date;
		endDate?: Date;
		detailed?: boolean;
	}): Promise<Receipt[]> {
		let query = `
      SELECT * FROM receipt
    `;
		const values = [];

		if (sortOptions.employee_id !== undefined) {
			query += ` WHERE id_employee = $${values.length + 1}`;
			values.push(sortOptions.employee_id);
		}
		if (sortOptions.startDate !== undefined) {
			query += ` ${values.length > 0 ? "AND" : "WHERE"} print_date >= $${values.length + 1}`;
			values.push(sortOptions.startDate);
		}
		if (sortOptions.endDate !== undefined) {
			query += ` ${values.length > 0 ? "AND" : "WHERE"} print_date <= $${values.length + 1}`;
			values.push(sortOptions.endDate);
		}

		const receiptQueryResult = await this.databaseService.query<Receipt>(query, values);

		if (sortOptions.detailed === undefined) return receiptQueryResult.rows;

		const receiptUpcs = receiptQueryResult.rows.map(receipt => receipt.receipt_number);

		const receiptItems = await this.getReceiptsItemsByReceiptNumber(receiptUpcs);
		for (const receipt of receiptQueryResult.rows) {
			receipt.items = receiptItems[receipt.receipt_number];
		}

		return receiptQueryResult.rows;
	}
	async getReceiptsSum(sortOptions: {
		employee_id?: string;
		startDate?: Date;
		endDate?: Date;
	}): Promise<{ totalSum: number }> {
		let query = `
			SELECT 
			SUM(sale.selling_price * sale.product_number) as total_sum
			FROM receipt
			INNER JOIN sale ON sale.receipt_number = receipt.receipt_number
		`
		const values = [];

		if (sortOptions.employee_id !== undefined) {
			query += ` WHERE receipt.id_employee = $${values.length + 1}`;
			values.push(sortOptions.employee_id);
		}

		if (sortOptions.startDate !== undefined) {
			query += ` ${values.length > 0 ? "AND" : "WHERE"} receipt.print_date >= $${values.length + 1}`;
			values.push(sortOptions.startDate);
		}

		if (sortOptions.endDate !== undefined) {
			query += ` ${values.length > 0 ? "AND" : "WHERE"} receipt.print_date <= $${values.length + 1}`;
			values.push(sortOptions.endDate);
		}

		const result = await this.databaseService.query<{ total_sum: number }>(query, values);
		return {totalSum: result.rows[0].total_sum}
	}
	async findUserLastReceipts(employee: Employee): Promise<Receipt[]> {
		const query = `
			SELECT * FROM receipt
			WHERE id_employee = $1
			AND print_date >= CURRENT_DATE
			ORDER BY print_date DESC;
		`;
		const result = await this.databaseService.query<Receipt>(query, [employee.id_employee]);

		return result.rows;
	}
}
