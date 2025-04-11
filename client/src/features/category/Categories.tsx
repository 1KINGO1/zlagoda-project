'use client';

import {useCategories} from '@/shared/hooks/useCategories';
import {Category} from '@/features/category/Category';
import {Category as CategoryType} from '@/shared/entities/Category';
import {useState} from 'react';
import {EditCategoryDialog} from '@/features/category/dialog/EditCategoryDialog';
import {DeleteCategoryDialog} from '@/features/category/dialog/DeleteCategoryDialog';
import {Button} from '@/components/ui/button';
import {CirclePlus} from 'lucide-react';
import {CreateCategoryDialog} from '@/features/category/dialog/CreateCategoryDialog';

export const Categories = () => {
	const {data: categories, isLoading} = useCategories();
	const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
	const [openDialog, setOpenDialog] = useState<"update" | "create" | "delete" | null>(null);
	const closeDialog = () => setOpenDialog(null);

	const handleOpenEditDialog = (category: CategoryType) => {
		setSelectedCategory(category);
		setOpenDialog("update");
	}

	const handleOpenDeleteDialog = (category: CategoryType) => {
		setSelectedCategory(category);
		setOpenDialog("delete");
	}

	const handleOpenCreateDialog = () => {
		setOpenDialog("create");
	}

	return isLoading ? (<div>Loading...</div>) : (
		<div>
			<div className="flex flex-col gap-4 mt-4 h-auto">
				{categories?.map((category) => (
					<Category
						category={category}
						key={category.category_number}
						handleOpenEditDialog={handleOpenEditDialog}
						handleOpenDeleteDialog={handleOpenDeleteDialog}
					/>
				))}
			</div>

			{selectedCategory !== null && (<>
				<EditCategoryDialog category={selectedCategory} open={openDialog === "update"} setOpen={closeDialog}/>
				<DeleteCategoryDialog category={selectedCategory} open={openDialog === "delete"} setOpen={closeDialog}/>
			</>)}

			<CreateCategoryDialog open={openDialog === "create"} setOpen={closeDialog}/>
		</div>
	)
}