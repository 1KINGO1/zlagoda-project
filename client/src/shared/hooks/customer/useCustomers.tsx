import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {QueryKeys} from '@/shared/constants/QueryKeys';
import {customerService, GetCustomerFilters} from '@/shared/services/customer.service';

export const useCustomers = (filters?: GetCustomerFilters) => {
	return useQuery({
		queryKey: [QueryKeys.CUSTOMERS, filters],
		staleTime: 1000 * 60,
		queryFn: () => customerService.getCustomers(filters ?? {}),
		placeholderData: keepPreviousData
	});
}