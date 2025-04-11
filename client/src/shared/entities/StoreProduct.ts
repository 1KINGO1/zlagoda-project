import {Product} from './Product';

export interface StoreProduct {
  upc: string,
  upc_prom: string | null,
  id_product: number,
  selling_price: number,
  products_number: number,
  promotional_product: boolean

  product?: Product
}
