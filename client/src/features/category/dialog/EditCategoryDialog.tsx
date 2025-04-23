import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog';
import {Category as CategoryType} from '@/shared/entities/Category';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {CategorySchema, CategorySchemaType} from '@/shared/schemas/Category.schema';
import {useUpdateCategory} from '@/shared/hooks/category/useUpdateCategory';
import {toast} from 'sonner';
import {ApiError} from '@/shared/types/ApiError';
import {useEffect} from 'react';
import {CategoryForm} from '@/features/category/CategoryForm';

interface EditCategoryDialogProps {
	category: CategoryType,
	open: boolean,
	setOpen: (open: boolean) => void,
}

export const EditCategoryDialog = (props: EditCategoryDialogProps) => {
	const form = useForm({
		defaultValues: {
			category_name: props.category?.category_name,
		},
		resolver: zodResolver(CategorySchema),
		mode: "onChange",
	})
	const {mutateAsync: updateCategory} = useUpdateCategory();

	const submitHandler = async (data: CategorySchemaType) => {
		if (!props.category) return;

		try {
			await updateCategory({changeData: data, category_number: props.category.category_number});
			props.setOpen(false);
		} catch (e) {
			const error = e as ApiError;

			toast.error("Updating failed: " + error.message)
		}
	}

	useEffect(() => {
		if (props.category) {
			form.reset(props.category);
		}
	}, [form, props.category])


	return (
		<Dialog modal={false} open={props.open} onOpenChange={props.setOpen}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit category "{props.category?.category_name}"</DialogTitle>
				</DialogHeader>
				<CategoryForm form={form} onSubmit={submitHandler} buttonText="Update"/>
			</DialogContent>
		</Dialog>
	);
}