import { PrintButton } from '@/components/PrintButton'
import { usePrintStoreProduct } from '@/shared/hooks/store-products/usePrintStoreProduct'
import { StoreProductSearch } from '@/features/store-product/StoreProductSearch'
import { useStoreProducts } from '@/shared/hooks/store-products/useStoreProducts'

export const StoreProductsTopPanel = () => {
  const {printStoreProduct} = usePrintStoreProduct()
  const {isLoading} = useStoreProducts()

  return (
    <div className="flex gap-2 justify-between">
      <StoreProductSearch />
      <PrintButton onClick={printStoreProduct} disabled={isLoading} />
    </div>
  )
}