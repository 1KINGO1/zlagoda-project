'use client'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ReceiptList } from './ReceiptList'
import { ReceiptFilter } from '@/features/receipt/ReceiptFilter'
import { ReceiptDialogs } from '@/features/receipt/ReceiptDialogs'

export const Receipts = () => {
  return (
    <div>
      <ReceiptFilter />
      <Table className='mt-3'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Receipt Number</TableHead>
            <TableHead className='text-center'>Employee</TableHead>
            <TableHead className='text-center'>Customer</TableHead>
            <TableHead className='text-right'>Total Sum</TableHead>
            <TableHead className='text-right'>Vat</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <ReceiptList />
        </TableBody>
      </Table>
      <ReceiptDialogs />
    </div>
  )
}
