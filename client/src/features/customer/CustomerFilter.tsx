'use client';

import {ChangeEvent} from 'react';
import {Input} from '@/components/ui/input';
import {debounce} from '@/shared/utils/debounce';
import {useCustomerFilter} from '@/features/customer/context/CustomerFilter.context';

export const CustomerFilter = () => {
	const {setCustomerSurname, setPercent} = useCustomerFilter();

	return (
		<div className="flex gap-2">
			<Input
				placeholder="Search by surname"
				onChange={debounce((e: ChangeEvent<HTMLInputElement>) => setCustomerSurname(e.target.value === '' ? undefined : e.target.value), 300)}
			/>
			<Input
				type="number"
				min={0}
				max={100}
				onChange={debounce((e: ChangeEvent<HTMLInputElement>) => setPercent(e.target.value === '' ? undefined : +e.target.value), 300)}
			/>
		</div>
	)
}