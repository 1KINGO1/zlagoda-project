import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { GetReceiptsFilters, receiptService } from '@/shared/services/receipt.service'
import { QueryKeys } from '@/shared/constants/QueryKeys'

export const useReceiptTotalSum = (filters: GetReceiptsFilters) => {
  return useQuery({
    queryKey: [QueryKeys.RECEIPTS, "SUM", filters],
    staleTime: 1000 * 60,
    queryFn: () => receiptService.getTotalSum(filters ?? {}),
    placeholderData: keepPreviousData,
  })
}