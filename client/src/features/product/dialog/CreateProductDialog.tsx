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
import {SelectCategory} from '@/components/SelectCategory';
import * as React from 'react';
import {useCreateProduct} from '@/shared/hooks/useCreateProduct';
import {toast} from 'sonner';
import {ApiError} from '@/shared/types/ApiError';

export const CreateProductDialog = () => {
	const {closeModal, modal} = useProductModal();

	const form = useForm({
		defaultValues: {
			category_number: '',
			product_name: '',
			characteristics: ''
		},
		mode: "onChange",
		resolver: zodResolver(ProductSchema)
	})
	const {mutateAsync: createProduct} = useCreateProduct();

	const submitHandler = async (data: ProductSchemaType) => {
		try {
			const product = await createProduct(data);
			toast.success(`Product "${product.product_name}"c created successfully`);
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
										<Input {...field}/>
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
										<Textarea {...field}/>
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