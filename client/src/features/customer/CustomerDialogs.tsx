'use client'

import {EditCustomerDialog} from './dialog/EditCustomerDialog';
import {Button} from '@/components/ui/button';
import {CirclePlus} from 'lucide-react';
import {CreateCustomerDialog} from '@/features/customer/dialog/CreateCustomerDialog';
import {useCustomerModal} from '@/features/customer/context/CustomerModals.context';
import {DeleteCustomerDialog} from '@/features/customer/dialog/DeleteCategoryDialog';

export const CustomerDialogs = () => {
	const {customer, openModal} = useCustomerModal();

	return (
		<>
			{customer !== undefined && (
				<>
					<EditCustomerDialog/>
					<DeleteCustomerDialog/>
				</>
			)}

			<CreateCustomerDialog />

			<div className="fixed bottom-8 right-8">
				<Button className="w-12 h-12" onClick={() => openModal("add", undefined)}>
					<CirclePlus/>
				</Button>
			</div>
		</>
	)
}