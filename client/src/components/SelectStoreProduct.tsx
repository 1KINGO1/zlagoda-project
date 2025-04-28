'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

import { useProducts } from '@/shared/hooks/product/useProducts'
import { debounce } from '@/shared/utils/debounce'
import { cn } from '@/shared/utils/utils'

import { Button } from './ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { useStoreProducts } from '@/shared/hooks/store-products/useStoreProducts'

interface SelectStoreProductProps {
  value: string | undefined
  onChange(value: string | undefined): void,
  className?: string
}

export function SelectStoreProduct({ value, onChange, className }: SelectStoreProductProps) {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const { data: storeProducts, isLoading } = useStoreProducts({ name: searchValue })

  if (!storeProducts || isLoading) return <></>

  const selectedStoreProduct = storeProducts.find(storeProduct => storeProduct.upc === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between', className)}
        >
          {selectedStoreProduct ? selectedStoreProduct.product?.product_name : 'Select product...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput
            placeholder="Search store product..."
            className="h-9"
            onValueChange={debounce(
              (value: string) => setSearchValue(value),
              300,
            )}
          />
          <CommandList>
            <CommandEmpty>No store products found.</CommandEmpty>
            <CommandGroup>
              {storeProducts.map(storeProduct => (
                <CommandItem
                  key={storeProduct.upc}
                  onSelect={() => {
                    onChange(storeProduct.upc)
                    setOpen(false)
                  }}
                >
                  {storeProduct.product?.product_name}
                  <Check
                    className={cn(
                      value === storeProduct.upc
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
