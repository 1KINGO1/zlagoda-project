import {useMutation, useQueryClient} from '@tanstack/react-query';
import {categoryService} from '@/shared/services/category.service';
import {QueryKeys} from '@/shared/constants/QueryKeys';
import {Category} from '@/shared/entities/Category';

export const useUpdateCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: categoryService.update,
		onSuccess(data) {
			queryClient.setQueryData([QueryKeys.CATEGORIES], (old: Category[] = []) => {
				return old.map(category => category.category_number === data.category_number ? {...category, ...data} : category);
			});
		}
	})
}