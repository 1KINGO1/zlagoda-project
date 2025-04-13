import {useMutation, useQueryClient} from '@tanstack/react-query';
import {categoryService} from '@/shared/services/category.service';
import {QueryKeys} from '@/shared/constants/QueryKeys';

export const useDeleteCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: categoryService.delete,
		onSuccess(data) {
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.CATEGORIES],
				exact: false
			});
		}
	})
}