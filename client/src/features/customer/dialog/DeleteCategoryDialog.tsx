import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {toast} from 'sonner';
import {ApiError} from '@/shared/types/ApiError';
import {useEffect, useState} from 'react';
import {useCustomerModal} from '@/features/customer/context/CustomerModals.context';
import {useDeleteCustomer} from '@/shared/hooks/customer/useDeleteCustomer';

export const DeleteCustomerDialog = () => {
	const {customer, closeModal, modal} = useCustomerModal();
	const {mutateAsync: deleteCustomer} = useDeleteCustomer();
	const [isDisabled, setIsDisabled] = useState(false);

	const onSubmit = async () => {
		if (!customer) return;

		try {
			await deleteCustomer(customer.card_number);
			toast.success(`Customer "${customer.cust_name}" deleted successfully`);
			closeModal();
		}
		catch (e) {
			const error = e as ApiError;
			setIsDisabled(true);
			toast.error(error.message);
		}
	}

	useEffect(() => {
		setIsDisabled(false);
	}, [modal]);

	return (
		<Dialog modal={false} open={modal === "delete"} onOpenChange={closeModal}>
		<DialogContent className="sm:max-w-[425px]">
			<DialogHeader>
				<DialogTitle>Delete customer "{customer?.cust_name}"</DialogTitle>
			</DialogHeader>
			<DialogFooter>
				<Button type="submit" disabled={isDisabled} onClick={onSubmit}>Delete</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
	);
}