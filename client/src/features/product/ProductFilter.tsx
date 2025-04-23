'use client'

import { ChangeEvent } from 'react'

import { SelectCategory } from '@/components/SelectCategory'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useProductFilter } from '@/features/product/context/ProductFilter.context'
import { useCategories } from '@/shared/hooks/category/useCategories'
import { debounce } from '@/shared/utils/debounce'

export const ProductFilter = () => {
  const { setSearchName, category_number, setCategoryNumber } =
    useProductFilter()

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
    </div>
  )
}
