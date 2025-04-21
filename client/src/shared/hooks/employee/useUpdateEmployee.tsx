import {useMutation, useQueryClient} from '@tanstack/react-query';
import {employeeService} from '@/shared/services/exployee.service';
import {QueryKeys} from '@/shared/constants/QueryKeys';

export const useUpdateEmployee = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: employeeService.updateEmployee,
		onSuccess() {
			queryClient.invalidateQueries({queryKey: [QueryKeys.EMPLOYEES], exact: false});
		}
	})
}