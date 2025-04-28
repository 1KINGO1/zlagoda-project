import { Button } from '@/components/ui/button'
import { usePrintStoreProduct } from '@/shared/hooks/store-products/usePrintStoreProduct'
import { StoreProductSearch } from '@/features/store-product/StoreProductSearch'

export const StoreProductsTopPanel = () => {
  const {printStoreProduct} = usePrintStoreProduct()

  return (
    <div className="flex gap-2 justify-between">
      <StoreProductSearch />
      <Button onClick={printStoreProduct}>Print</Button>
    </div>
  )
}