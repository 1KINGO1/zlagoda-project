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
import {useEffect} from 'react';
import {toast} from 'sonner';
import {ApiError} from '@/shared/types/ApiError';
import {useUpdateStoreProduct} from '@/shared/hooks/store-products/useUpdateStoreProduct';
import {StoreProductSchema, StoreProductSchemaType} from '@/shared/schemas/StoreProduct.schema';
import {useStoreProductModal} from '@/features/store-product/context/StoreProductModals.context';
import {SelectProduct} from '@/components/SelectProduct';
import {Checkbox} from '@/components/ui/checkbox';

export const EditStoreProductDialog = () => {
	const {closeModal, modal, storeProduct} = useStoreProductModal();
	const {mutateAsync: updateStoreProduct} = useUpdateStoreProduct();

	const form = useForm({
		defaultValues: {
			id_product: storeProduct!.id_product,
			selling_price: +storeProduct!.selling_price,
			products_number: storeProduct!.products_number,
			promotional_product: storeProduct!.promotional_product,
		},
		mode: "onChange",
		resolver: zodResolver(StoreProductSchema)
	})
	const submitHandler = async (data: StoreProductSchemaType) => {
		if (!storeProduct) return;

		try {
			const updatedStoreProduct = await updateStoreProduct({...data, storeProductUPC: storeProduct.upc});
			toast.success(`Store product #${storeProduct.upc} updated successfully`);
			form.reset(updatedStoreProduct);
			closeModal();
		}
		catch (e) {
			const error = e as ApiError;
			toast.error(error.message);
		}
	}

	useEffect(() => {
		console.log(form.getValues())
		if (storeProduct !== undefined) {
			form.reset({...storeProduct, selling_price: +storeProduct!.selling_price});
		}
	}, [form, storeProduct])

	return (
		<Dialog modal={false} open={modal === "update"} onOpenChange={() => {
			closeModal();
		}}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Update store product</DialogTitle>
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
						<Button disabled={!form.formState.isValid || form.formState.isSubmitting}>Update</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}