import {useQuery} from '@tanstack/react-query';
import {employeeService} from '@/shared/services/exployee.service';
import {QueryKeys} from '@/shared/constants/QueryKeys';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useLogout} from '@/shared/hooks/auth/useLogout';

export const useCurrentEmployee = () => {
	const query = useQuery({
		queryFn: employeeService.getCurrentEmployeeInfo,
		queryKey: [QueryKeys.CURRENT_EMPLOYEE],
	});
	const router = useRouter();
	const {mutateAsync: logout} = useLogout();

	useEffect(() => {
		if (query.isError) {
			logout()
				.then(() => router.push("/login"))
				.catch(() => router.push("/login"))
		}
	}, [query.isError])

	return query;
}