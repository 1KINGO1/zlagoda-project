'use client'

import { PrintButton } from '@/components/PrintButton'
import { ChangeEvent } from 'react'

import { SelectCategory } from '@/components/SelectCategory'
import { Input } from '@/components/ui/input'
import { useProductFilter } from '@/features/product/context/ProductFilter.context'
import { debounce } from '@/shared/utils/debounce'
import { usePrintProduct } from '@/shared/hooks/product/usePrintProduct'

export const ProductFilter = () => {
  const { setSearchName, category_number, setCategoryNumber } =
    useProductFilter();
  const { printProducts, isLoading } = usePrintProduct();

  return (
    <div className='flex gap-2'>
      <Input
        placeholder='Search'
        onChange={debounce(
          (e: ChangeEvent<HTMLInputElement>) => setSearchName(e.target.value),
          300,
        )}
      />
      <SelectCategory
        value={category_number ? category_number + '' : undefined}
        onValueChange={value => setCategoryNumber(+value)}
      />
      <PrintButton onClick={printProducts} disabled={isLoading} />
    </div>
  )
}
