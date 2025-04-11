import {useMutation, useQueryClient} from '@tanstack/react-query';
import {QueryKeys} from '@/shared/constants/QueryKeys';
import {productService} from '@/shared/services/product.service';

export const useCreateProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: productService.createProduct,
		onSuccess() {
			queryClient.invalidateQueries({queryKey: [QueryKeys.PRODUCTS], exact: false});
		}
	})
}