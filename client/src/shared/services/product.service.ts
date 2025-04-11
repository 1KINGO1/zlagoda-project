import {API_BASE_URL} from '@/shared/constants/apiBaseUrl';
import {Product} from '@/shared/entities/Product';
import {ProductSchemaType} from '@/shared/schemas/Product.schema';

export interface GetProductsFilters {
	category_number?: number;
	name?: string;
	sort?: 'ASC' | 'DESC';
}

class ProductService {
	async getProducts(filters: GetProductsFilters): Promise<Product[]> {
		const url = new URL(`${API_BASE_URL}product`);

		for (const [key, value] of Object.entries(filters)) {
			if (value !== undefined) {
				url.searchParams.set(key, value.toString());
			}
		}

		const response = await fetch(url.toString(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});

		const data = await response.json();
		if (!response.ok) {
			throw data;
		}
		return data;
	}
	async createProduct(productSchema: ProductSchemaType): Promise<Product> {
		const response = await fetch(`${API_BASE_URL}product`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({...productSchema, category_number: Number(productSchema.category_number)}),
		});

		const data = await response.json();
		if (!response.ok) {
			throw data;
		}
		return data;
	}
	async updateProduct({
		productId,
		...productSchema
											}: {productId: number} & ProductSchemaType): Promise<Product> {
		const response = await fetch(`${API_BASE_URL}product/${productId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({...productSchema, category_number: Number(productSchema.category_number)}),
		});

		const data = await response.json();
		if (!response.ok) {
			throw data;
		}
		return data;
	}
	async deleteProduct(productId: number): Promise<void> {
		const response = await fetch(`${API_BASE_URL}product/${productId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});

		const data = await response.json();
		if (!response.ok) {
			throw data;
		}
		return data;
	}
}

export const productService = new ProductService();