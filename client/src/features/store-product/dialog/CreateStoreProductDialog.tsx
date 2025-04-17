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
import {toast} from 'sonner';
import {ApiError} from '@/shared/types/ApiError';
import {useStoreProductModal} from '@/features/store-product/context/StoreProductModals.context';
import {StoreProductSchema, StoreProductSchemaType} from '@/shared/schemas/StoreProduct.schema';
import {SelectProduct} from '@/components/SelectProduct';
import {Checkbox} from '@/components/ui/checkbox';
import {useCreateStoreProduct} from '@/shared/hooks/store-products/useCreateStoreProduct';

export const CreateStoreProductDialog = () => {
	const {modal, closeModal} = useStoreProductModal();

	const form = useForm({
		defaultValues: {
			id_product: undefined,
			selling_price: undefined,
			products_number: undefined,
			promotional_product: false
		},
		mode: "onChange",
		resolver: zodResolver(StoreProductSchema),
	})
	const {mutateAsync: createStoreProduct} = useCreateStoreProduct();

	const submitHandler = async (data: StoreProductSchemaType) => {
		try {
			await createStoreProduct(data);
			toast.success(`Store product created successfully`);
			form.reset();
			closeModal();
		} catch (e) {
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
					<DialogTitle>Create store product</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(submitHandler)} className="flex flex-col gap-4">
						<FormField
							control={form.control}
							name="id_product"
							render={({field}) => (
								<FormItem>
									<FormLabel>Product</FormLabel>
									<SelectProduct value={field.value} onChange={field.onChange}/>
									<FormMessage/>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="selling_price"
							render={({field}) => (
								<FormItem>
									<FormLabel>Selling Price</FormLabel>
									<FormControl>
										<Input
											type="number"
											{...field}
											value={String(field.value)}
											onChange={
												(e) =>
													field.onChange(e.target.value !== undefined ? +e.target.value : undefined)
											}
										/>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="products_number"
							render={({field}) => (
								<FormItem>
									<FormLabel>Products Amount</FormLabel>
									<FormControl>
										<Input
											type="number"
											{...field}
											value={String(field.value)}
											onChange={
												(e) =>
													field.onChange(e.target.value !== undefined ? +e.target.value : undefined)
											}
										/>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="promotional_product"
							render={({field}) => (
								<FormItem>
									<FormLabel>Promotional?</FormLabel>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
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