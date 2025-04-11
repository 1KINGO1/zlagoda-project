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
import {CategorySchema, CategorySchemaType} from '@/shared/schemas/Category.schema';
import {Input} from '@/components/ui/input';
import {toast} from 'sonner';
import {ApiError} from '@/shared/types/ApiError';
import {useCreateCategory} from '@/shared/hooks/useCreateCategory';

interface CreateCategoryDialogProps {
	open: boolean,
	setOpen: (open: boolean) => void,
}

export const CreateCategoryDialog = (props: CreateCategoryDialogProps) => {
	const form = useForm({
		defaultValues: {
			category_name: '',
		},
		mode: "onChange",
		resolver: zodResolver(CategorySchema)
	})
	const {mutateAsync: createCategory} = useCreateCategory();


	const submitHandler = async (data: CategorySchemaType) => {
		try {
			const newCategory = await createCategory(data);
			toast.success(`Category ${newCategory.category_name} created successfully`);
			props.setOpen(false);
		} catch (e) {
			const error = e as ApiError;
			toast.error(error.message);
		}
	}


	return (
		<Dialog modal={false} open={props.open} onOpenChange={props.setOpen}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create new category</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(submitHandler)} className="flex flex-col gap-4">
						<FormField
							control={form.control}
							name="category_name"
							render={({field}) => (
								<FormItem>
									<FormLabel>Category Name</FormLabel>
									<FormControl>
										<Input
											placeholder={'Gadgets'}
											{...field}
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