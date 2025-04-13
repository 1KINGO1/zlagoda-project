import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Category as CategoryType} from '@/shared/entities/Category';
import {useDeleteCategory} from '@/shared/hooks/category/useDeleteCategory';
import {toast} from 'sonner';
import {ApiError} from '@/shared/types/ApiError';

interface DeleteCategoryDialogProps {
	category: CategoryType,
	open: boolean,
	setOpen: (open: boolean) => void,
}

export const DeleteCategoryDialog = (props: DeleteCategoryDialogProps) => {
	const {mutateAsync: deleteCategory} = useDeleteCategory();

	const onSubmit = async () => {
		if (!props.category) return;

		try {
			await deleteCategory(props.category.category_number);
			props.setOpen(false);
		} catch (e) {
			const error = e as ApiError;

			toast.error("Deletion failed: " + error.message)
		}
	}

	return (
		<Dialog modal={false} open={props.open} onOpenChange={props.setOpen}>
		<DialogContent className="sm:max-w-[425px]">
			<DialogHeader>
				<DialogTitle>Delete category "{props.category?.category_name}"</DialogTitle>
			</DialogHeader>
			<DialogFooter>
				<Button type="submit" onClick={onSubmit}>Delete</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
	);
}