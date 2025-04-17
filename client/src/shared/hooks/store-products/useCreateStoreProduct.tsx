import {useMutation, useQueryClient} from '@tanstack/react-query';
import {QueryKeys} from '@/shared/constants/QueryKeys';
import {storeProductService} from '@/shared/services/storeProduct.service';

export const useCreateStoreProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: storeProductService.createStoreProduct,
		onSuccess() {
			queryClient.invalidateQueries({queryKey: [QueryKeys.STORE_PRODUCTS], exact: false});
		}
	})
}