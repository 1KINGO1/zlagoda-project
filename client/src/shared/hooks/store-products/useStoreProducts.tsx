import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {QueryKeys} from '@/shared/constants/QueryKeys';
import {GetStoreProductsFilters, storeProductService} from '@/shared/services/storeProduct.service';

export const useStoreProducts = (filters?: GetStoreProductsFilters) => {
	return useQuery({
		queryKey: [QueryKeys.STORE_PRODUCTS, filters],
		staleTime: 1000 * 60,
		queryFn: () => storeProductService.getStoreProducts(filters ?? {}),
		placeholderData: keepPreviousData
	});
}