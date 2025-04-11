'use client';

import {ChangeEvent} from 'react';
import {Input} from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { useCategories } from '@/shared/hooks/useCategories';
import {useProductFilter} from '@/features/product/context/ProductFilter.context';
import {debounce} from '@/shared/utils/debounce';
import {SelectCategory} from '@/components/SelectCategory';

export const ProductFilter = () => {
	const {setSearchName, category_number, setCategoryNumber} = useProductFilter();

	return (
		<div className="flex gap-2">
			<Input
				placeholder="Search"
				onChange={debounce((e: ChangeEvent<HTMLInputElement>) => setSearchName(e.target.value), 300)}
			/>
			<SelectCategory
				value={category_number ? category_number + "" : undefined}
				onValueChange={(value) => setCategoryNumber(+value)}
			/>
		</div>
	)
}