import { MouseEvent, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SelectStoreProduct } from '@/components/SelectStoreProduct'
import { Trash2 } from 'lucide-react'

// Output value format
type SelectProductValue = {
  upc: string,
  products_number: number
}[]

// Inner value format to handle the component state
type SelectProductPlaceholder = {
  id: number,
  upc?: string,
  products_number?: number
}[]

interface SelectProductProps {
  onChange: (value: SelectProductValue | undefined) => void
}

export const SelectProducts = ({ onChange }: SelectProductProps) => {
  const [products, setProducts] = useState<SelectProductPlaceholder>([])

  const addProductHandler = (e: MouseEvent) => {
    e.preventDefault()

    const newProduct = {
      id: Date.now(),
      products_number: 1
    }
    setProducts([...products, newProduct])
  }

  useEffect(() => {
    const filteredProducts = products
      .filter(
        (product) =>
          product.upc !== undefined && product.products_number !== undefined,
      )
      .map((product) => ({
        upc: product.upc,
        products_number: product.products_number,
      })) as SelectProductValue;

    onChange(filteredProducts.length > 0 ? filteredProducts : undefined);
  }, [products])

  return (
    <div className="flex flex-col gap-4 items-start">
      {products.length > 0 && (
        <div className="flex flex-col w-full gap-2">
          {products.map((product) => (
            <div key={product.id} className="flex gap-2">
              <SelectStoreProduct
                className="w-[50%]"
                value={product.upc}
                onChange={(value) => {
                  setProducts(products.map(product1 => {
                    if (product1.id === product.id) {
                      product1.upc = value
                    }
                    return product1
                  }))
                }} />
              <Input
                className="w-[50%]"
                type="number"
                value={product.products_number || 1}
                min={1}
                placeholder="Quantity"
                onChange={(e) => {
                  setProducts(products.map(product1 => {
                    if (product1.id === product.id) {
                      product1.products_number = +e.target.value
                    }
                    return product1
                  }))
                }}
              />
              <Button size="icon" onClick={() => {
                setProducts(products.filter(product1 => product1.id !== product.id))
              }}>
                <Trash2 />
              </Button>
            </div>
          ))}
        </div>
      )}

      <Button onClick={addProductHandler} className="w-auto">Add product</Button>
    </div>
  )
}