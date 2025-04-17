import {useMutation, useQueryClient} from '@tanstack/react-query';
import {QueryKeys} from '@/shared/constants/QueryKeys';
import {storeProductService} from '@/shared/services/storeProduct.service';

export const useUpdateStoreProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: storeProductService.updateStoreProduct,
		onSuccess() {
			queryClient.invalidateQueries({queryKey: [QueryKeys.STORE_PRODUCTS], exact: false});
		}
	})
}