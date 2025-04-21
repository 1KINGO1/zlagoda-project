import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {QueryKeys} from '@/shared/constants/QueryKeys';
import {employeeService, GetAllEmployeesFilter} from '@/shared/services/exployee.service';

export const useEmployees = (filters: GetAllEmployeesFilter) => {
	return useQuery({
		queryKey: [QueryKeys.EMPLOYEES, filters],
		staleTime: 1000 * 60,
		queryFn: () => employeeService.getAllEmployees(filters),
		placeholderData: keepPreviousData
	});
}