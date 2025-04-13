import {useMutation, useQueryClient} from '@tanstack/react-query';
import {QueryKeys} from '@/shared/constants/QueryKeys';
import {customerService} from '@/shared/services/customer.service';

export const useDeleteCustomer = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: customerService.deleteCustomer,
		onSuccess() {
			queryClient.invalidateQueries({queryKey: [QueryKeys.CUSTOMERS], exact: false});
		}
	})
}