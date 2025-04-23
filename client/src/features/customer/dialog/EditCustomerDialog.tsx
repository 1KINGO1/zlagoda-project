import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {CustomerCardSchema, CustomerCardSchemaType} from '@/shared/schemas/CustomerCard.schema';
import {useCustomerModal} from '@/features/customer/context/CustomerModals.context';
import {Input} from '@/components/ui/input';
import {useEffect} from 'react';
import {useUpdateCustomer} from '@/shared/hooks/customer/useUpdateCustomer';
import {toast} from 'sonner';
import {ApiError} from '@/shared/types/ApiError';
import {CustomerForm} from '@/features/customer/CustomerForm';

export const EditCustomerDialog = () => {
	const {closeModal, modal, customer} = useCustomerModal();
	const {mutateAsync: updateCustomer} = useUpdateCustomer();

	const form = useForm({
		defaultValues: customer,
		mode: "onChange",
		resolver: zodResolver(CustomerCardSchema)
	})
	const submitHandler = async (data: CustomerCardSchemaType) => {
		if (!customer) return;

		try {
			await updateCustomer({...data, customerNumber: customer.card_number});
			toast.success(`Customer "${customer.cust_name}" updated successfully`);
			form.reset();
			closeModal();
		} catch (e) {
			const error = e as ApiError;
			toast.error(error.message);
		}
	}

	useEffect(() => {
		if (customer !== undefined) {
			form.reset(customer);
		}
	}, [form, customer])

	// TODO: Refactor all dialogs => separate shared forms

	return (
		<Dialog modal={false} open={modal === "update"} onOpenChange={() => {
			closeModal();
		}}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Update customer</DialogTitle>
				</DialogHeader>
				<CustomerForm form={form} onSubmit={submitHandler} buttonText="Update" />
			</DialogContent>
		</Dialog>
	);
}