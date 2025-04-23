'use client'

import { ChangeEvent } from 'react'

import { Input } from '@/components/ui/input'
import { useEmployeeFilter } from '@/features/employee/context/EmployeeFilter.context'
import { debounce } from '@/shared/utils/debounce'

export const EmployeeFilter = () => {
  const { setSurname } = useEmployeeFilter()

  return (
    <div className='flex gap-2'>
      <Input
        placeholder='Search by surname'
        onChange={debounce(
          (e: ChangeEvent<HTMLInputElement>) => setSurname(e.target.value),
          300,
        )}
      />
    </div>
  )
}
