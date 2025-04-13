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
import {ProductSchema, ProductSchemaType} from '@/shared/schemas/Product.schema';
import {useProductModal} from '@/features/product/context/ProductModals.context';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {useEffect} from 'react';
import {SelectCategory} from '@/components/SelectCategory';
import * as React from 'react';
import { useUpdateProduct } from '@/shared/hooks/product/useUpdateProduct';
import {toast} from 'sonner';
import {ApiError} from '@/shared/types/ApiError';

export const EditProductDialog = () => {
	const {closeModal, modal, product} = useProductModal();
	const {mutateAsync: updateProduct} = useUpdateProduct();

	const form = useForm({
		defaultValues: {
			category_number: String(product!.category_number),
			product_name: product!.product_name,
			characteristics: product!.characteristics
		},
		mode: "onChange",
		resolver: zodResolver(ProductSchema)
	})
	const submitHandler = async (data: ProductSchemaType) => {
		if (!product) return;

		try {
			await updateProduct({...data, productId: product.id_product});
			toast.success(`Product "${product.product_name}" updated successfully`);
			form.reset();
			closeModal();
		}
		catch (e) {
			const error = e as ApiError;
			toast.error(error.message);
		}
	}

	useEffect(() => {
		if (product !== undefined) {
			form.reset({...product, category_number: String(product!.category_number)});
		}
	}, [form, product])

	return (
		<Dialog modal={false} open={modal === "update"} onOpenChange={() => {
			closeModal();
		}}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit product "{product!.product_name}"</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(submitHandler)} className="flex flex-col gap-4">
						<FormField
							control={form.control}
							name="category_number"
							render={({field}) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<SelectCategory {...field} onValueChange={field.onChange}/>
									<FormMessage/>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="product_name"
							render={({field}) => (
								<FormItem>
									<FormLabel>Product Name</FormLabel>
									<FormControl>
										<Input placeholder={product!.product_name} {...field}/>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="characteristics"
							render={({field}) => (
								<FormItem>
									<FormLabel>Characteristics</FormLabel>
									<FormControl>
										<Textarea placeholder={product!.characteristics} {...field}/>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
						<Button disabled={!form.formState.isValid || form.formState.isSubmitting}>Save changes</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}