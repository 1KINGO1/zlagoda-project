import { QueryKeys } from '@/shared/constants/QueryKeys'
import {
  GetProductsFilters,
  productService,
} from '@/shared/services/product.service'

import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useProducts = (filters?: GetProductsFilters) => {
  return useQuery({
    queryKey: [QueryKeys.PRODUCTS, filters],
    staleTime: 1000 * 60,
    queryFn: () => productService.getProducts(filters ?? {}),
    placeholderData: keepPreviousData,
  })
}
