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
import {Input} from '@/components/ui/input';
import * as React from 'react';
import {CustomerCardSchema, CustomerCardSchemaType} from '@/shared/schemas/CustomerCard.schema';
import {useCustomerModal} from '@/features/customer/context/CustomerModals.context';
import {useCreateCustomer} from '@/shared/hooks/customer/useCreateCustomer';
import {toast} from 'sonner';
import {ApiError} from '@/shared/types/ApiError';

export const CreateCustomerDialog = () => {
	const {closeModal, modal} = useCustomerModal();
	const {mutateAsync: createCustomer} = useCreateCustomer();

	const form = useForm({
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

				<Form {...form}>
					<form onSubmit={form.handleSubmit(submitHandler)} className="flex flex-col gap-4">
						<FormField
							control={form.control}
							name="cust_surname"
							render={({field}) => (
								<FormItem>
									<FormLabel>Surname *</FormLabel>
									<FormControl>
										<Input {...field}/>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="cust_name"
							render={({field}) => (
								<FormItem>
									<FormLabel>Name *</FormLabel>
									<FormControl>
										<Input {...field}/>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="cust_patronymic"
							render={({field}) => (
								<FormItem>
									<FormLabel>Patronymic</FormLabel>
									<FormControl>
										<Input {...field} value={field.value ?? ''} onChange={(e) => {
											const value = e.target.value;
											field.onChange(value === "" ? null : value);
										}}/>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="phone_number"
							render={({field}) => (
								<FormItem>
									<FormLabel>Phone number *</FormLabel>
									<FormControl>
										<Input {...field}/>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="city"
							render={({field}) => (
								<FormItem>
									<FormLabel>City</FormLabel>
									<FormControl>
										<Input {...field} value={field.value ?? ''} onChange={(e) => {
											const value = e.target.value;
											field.onChange(value === "" ? undefined : value);
										}}/>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="street"
							render={({field}) => (
								<FormItem>
									<FormLabel>Street</FormLabel>
									<FormControl>
										<Input {...field} value={field.value ?? ''} onChange={(e) => {
											const value = e.target.value;
											field.onChange(value === "" ? undefined : value);
										}}/>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="zip_code"
							render={({field}) => (
								<FormItem>
									<FormLabel>Zip Code</FormLabel>
									<FormControl>
										<Input {...field} value={field.value ?? ''} onChange={(e) => {
											const value = e.target.value;
											field.onChange(value === "" ? undefined : value);
										}}/>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="percent"
							render={({field}) => (
								<FormItem>
									<FormLabel>Percent *</FormLabel>
									<FormControl>
										<Input type="number" {...field} onChange={(e) => {
											const value = e.target.value;
											field.onChange(value === "" ? undefined : +value);
										}}/>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
						<Button disabled={!form.formState.isValid || form.formState.isSubmitting}>Create</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}