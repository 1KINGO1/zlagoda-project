'use client'

import { useReceiptFilter } from '@/features/receipt/context/ReceiptFilter.context'
import { SelectEmployee } from '@/components/SelectEmployee'
import { DatePicker } from '@/components/ui/date-picker'
import { DateRange } from 'react-day-picker'
import { usePrintReceipt } from '@/shared/hooks/receipt/usePrintReceipt'
import { Button } from '@/components/ui/button'

export const ReceiptFilter = () => {
  const {employee_id, setEmployeeId, startDate, endDate, setEndDate, setStartDate} = useReceiptFilter();
  const {printReceipt, isLoading} = usePrintReceipt();

  const setDate = (date?: DateRange) => {
    setStartDate(date?.from);
    setEndDate(date?.to);
  }

  return (
    <div className='flex gap-2 w-full justify-between'>
      <DatePicker
        className="w-100"
        mode="range"
        date={{
          from: startDate,
          to: endDate,
        }}
        setDate={setDate}
        toYear={new Date().getFullYear()}
      />
      <SelectEmployee value={employee_id ?? ''}
                      onChange={setEmployeeId}
                      className="w-full shrink-1"
      />
      <Button disabled={isLoading} onClick={printReceipt}>
        Print
      </Button>
    </div>
  )
}
