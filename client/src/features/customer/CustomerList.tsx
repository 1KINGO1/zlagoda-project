'use client'

import {useCategories} from '@/shared/hooks/category/useCategories';
import {useMemo} from 'react';
import {TableCell, TableRow} from '@/components/ui/table';
import {Button} from '@/components/ui/button';
import {Pencil, Trash2} from 'lucide-react';
import {useCustomerFilter} from '@/features/customer/context/CustomerFilter.context';
import {useCustomerModal} from '@/features/customer/context/CustomerModals.context';
import {useCustomers} from '@/shared/hooks/customer/useCustomers';
import {Skeleton} from '@/components/ui/skeleton';

export const CustomerList = () => {
	const filters = useCustomerFilter()
	const {data: customers, isSuccess: isCustomersLoaded, isLoading} = useCustomers({
		percent: filters.percent,
		sort: filters.surnameSort,
		surname: filters.customerSurname
	});
	const {openModal} = useCustomerModal();

	return useMemo(() => {
		if (isLoading || !isCustomersLoaded ) return [
			<TableRow key="loading1">
				<TableCell colSpan={6} className="text-center">
					<Skeleton className="h-[40px]" />
				</TableCell>
			</TableRow>,
			<TableRow key="loading2">
				<TableCell colSpan={6} className="text-center">
					<Skeleton className="h-[40px]" />
				</TableCell>
			</TableRow>,
			<TableRow key="loading3">
				<TableCell colSpan={6} className="text-center">
					<Skeleton className="h-[40px]" />
				</TableCell>
			</TableRow>
		];

		return customers!.map((customer) => (
			<TableRow key={customer.card_number}>
				<TableCell>{customer.card_number}</TableCell>
				<TableCell>{customer.cust_surname}</TableCell>
				<TableCell>{customer.cust_name}</TableCell>
				<TableCell className="text-center">{customer.phone_number}</TableCell>
				<TableCell className="text-center">{customer.percent}</TableCell>
				<TableCell className="text-right">
					<Button size="icon" variant="ghost" onClick={() => {
						openModal("update", customer)
					}}>
						<Pencil />
					</Button>
					<Button size="icon" variant="ghost" onClick={() => {
						openModal("delete", customer)
					}}>
						<Trash2 />
					</Button>
				</TableCell>
			</TableRow>
		));
	}, [isLoading, customers, isCustomersLoaded]);
}