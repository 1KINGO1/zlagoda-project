import {useMutation, useQueryClient} from '@tanstack/react-query';
import {categoryService} from '@/shared/services/category.service';
import {QueryKeys} from '@/shared/constants/QueryKeys';
import {Category} from '@/shared/entities/Category';

export const useCreateCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: categoryService.create,
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.CATEGORIES],
				exact: false
			});
		}
	})
}