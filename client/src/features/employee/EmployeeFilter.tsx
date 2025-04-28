'use client'

import { ChangeEvent } from 'react'

import { Input } from '@/components/ui/input'
import { useEmployeeFilter } from '@/features/employee/context/EmployeeFilter.context'
import { debounce } from '@/shared/utils/debounce'
import { usePrintEmployee } from '@/shared/hooks/employee/usePrintEmployee'
import { Button } from '@/components/ui/button'

export const EmployeeFilter = () => {
  const { setSurname } = useEmployeeFilter()
  const {printEmployee, isLoading} = usePrintEmployee();

  return (
    <div className='flex gap-2'>
      <Input
        placeholder='Search by surname'
        onChange={debounce(
          (e: ChangeEvent<HTMLInputElement>) => setSurname(e.target.value),
          300,
        )}
      />
      <Button disabled={isLoading} onClick={printEmployee}>
        Print
      </Button>
    </div>
  )
}
