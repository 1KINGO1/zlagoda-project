import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {ProductSchema, ProductSchemaType} from '@/shared/schemas/Product.schema';
import {useProductModal} from '@/features/product/context/ProductModals.context';
import {useCreateProduct} from '@/shared/hooks/product/useCreateProduct';
import {toast} from 'sonner';
import {ApiError} from '@/shared/types/ApiError';
import {ProductForm} from '@/features/product/ProductForm';

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
				<ProductForm form={form} onSubmit={submitHandler} buttonText={"Create"} />
			</DialogContent>
		</Dialog>
	);
}