import { QueryKeys } from '@/shared/constants/QueryKeys'
import { productService } from '@/shared/services/product.service'

import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: productService.createProduct,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PRODUCTS],
        exact: false,
      })
    },
  })
}
