import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {CustomerCardSchema, CustomerCardSchemaType} from '@/shared/schemas/CustomerCard.schema';
import {useCustomerModal} from '@/features/customer/context/CustomerModals.context';
import {useCreateCustomer} from '@/shared/hooks/customer/useCreateCustomer';
import {toast} from 'sonner';
import {ApiError} from '@/shared/types/ApiError';
import {CustomerForm} from '@/features/customer/CustomerForm';

export const CreateCustomerDialog = () => {
	const {closeModal, modal} = useCustomerModal();
	const {mutateAsync: createCustomer} = useCreateCustomer();

	const form = useForm<CustomerCardSchemaType>({
		defaultValues: {
			cust_surname: '',
			cust_name: '',
			phone_number: '',
			percent: 0
		},
		mode: "onChange",
		resolver: zodResolver(CustomerCardSchema)
	})

	const submitHandler = async (data: CustomerCardSchemaType) => {
		try {
			const customer = await createCustomer(data);
			toast.success(`Customer "${customer.cust_name}" created successfully`);
			form.reset();
			closeModal();
		}
		catch (e) {
			const error = e as ApiError;
			toast.error(error.message);
		}
	}

	return (
		<Dialog modal={false} open={modal === "add"} onOpenChange={() => {
			closeModal();
		}}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create product</DialogTitle>
				</DialogHeader>
				<CustomerForm form={form} onSubmit={submitHandler} buttonText="Create"/>
			</DialogContent>
		</Dialog>
	);
}