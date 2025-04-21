import {useMutation, useQueryClient} from '@tanstack/react-query';
import {employeeService} from '@/shared/services/exployee.service';
import {QueryKeys} from '@/shared/constants/QueryKeys';

export const useDeleteEmployee = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: employeeService.deleteEmployee,
		onSuccess() {
			queryClient.invalidateQueries({queryKey: [QueryKeys.EMPLOYEES], exact: false});
		}
	})
}