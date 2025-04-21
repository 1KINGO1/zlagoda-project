'use client'

import {Button} from '@/components/ui/button';
import {CirclePlus} from 'lucide-react';
import {CreateEmployeeDialog} from '@/features/employee/dialog/CreateEmployeeDialog';
import {useEmployeeModal} from '@/features/employee/context/EmployeeModals.context';
import {EditEmployeeDialog} from '@/features/employee/dialog/EditEmployeeDialog';
import {DeleteEmployeeDialog} from '@/features/employee/dialog/DeleteEmployeeDialog';

export const EmployeeDialogs = () => {
	const {employee, openModal} = useEmployeeModal();

	return (
		<>
			{employee !== undefined && (
				<>
					<EditEmployeeDialog/>
					<DeleteEmployeeDialog/>
				</>
			)}

			<CreateEmployeeDialog />

			<div className="fixed bottom-8 right-8">
				<Button className="w-12 h-12" onClick={() => openModal("add", undefined)}>
					<CirclePlus/>
				</Button>
			</div>
		</>
	)
}