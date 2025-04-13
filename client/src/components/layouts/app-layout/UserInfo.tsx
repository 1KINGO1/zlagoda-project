'use client'

import {useCurrentEmployee} from '@/shared/hooks/auth/useCurrentEmployee';

export const UserInfo = () => {
	const {data, isSuccess} = useCurrentEmployee();

	return isSuccess ? (
		<div className="flex gap-2 items-center">
			<div className="bg-gray-900 text-gray-50 py-1.5 px-2.5 rounded-lg text-sm select-none">
				{data?.empl_role}
			</div>
			<p className="text-lg font-medium">{data?.empl_surname} {data?.empl_name} {data?.empl_patronymic}</p>
		</div>
	) : <span>Loading...</span>
}