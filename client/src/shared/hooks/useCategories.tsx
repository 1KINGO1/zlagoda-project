import {useQuery} from '@tanstack/react-query';
import {QueryKeys} from '@/shared/constants/QueryKeys';
import {categoryService} from '@/shared/services/category.service';

export const useCategories = () => {
	return useQuery({
		queryFn: categoryService.getAllCategories,
		queryKey: [QueryKeys.CATEGORIES],
	});
}