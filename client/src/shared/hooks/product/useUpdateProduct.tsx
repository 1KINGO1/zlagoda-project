import { QueryKeys } from '@/shared/constants/QueryKeys'
import { productService } from '@/shared/services/product.service'

import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: productService.updateProduct,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PRODUCTS],
        exact: false,
      })
    },
  })
}
