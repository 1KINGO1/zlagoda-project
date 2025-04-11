import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {QueryKeys} from '@/shared/constants/QueryKeys';
import {GetProductsFilters, productService} from '@/shared/services/product.service';

export const useProducts = (filters?: GetProductsFilters) => {
	return useQuery({
		queryKey: [QueryKeys.PRODUCTS, filters],
		queryFn: () => productService.getProducts(filters ?? {}),
		placeholderData: keepPreviousData
	});
}