import {useMutation, useQueryClient} from '@tanstack/react-query';
import {QueryKeys} from '@/shared/constants/QueryKeys';
import {productService} from '@/shared/services/product.service';

export const useUpdateProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: productService.updateProduct,
		onSuccess() {
			queryClient.invalidateQueries({queryKey: [QueryKeys.PRODUCTS], exact: false});
		}
	})
}