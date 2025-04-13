import {useQuery} from '@tanstack/react-query';
import {QueryKeys} from '@/shared/constants/QueryKeys';
import {categoryService} from '@/shared/services/category.service';

export const useCategories = (sortOrder?: "ASC" | "DESC") => {
	return useQuery({
		queryFn: () => categoryService.getAllCategories(sortOrder),
		queryKey: [QueryKeys.CATEGORIES, sortOrder],
		staleTime: 1000 * 60 * 1,
	});
}