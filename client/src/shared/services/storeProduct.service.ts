import { API_BASE_URL } from '@/shared/constants/apiBaseUrl'
import { Product } from '@/shared/entities/Product'
import { StoreProduct } from '@/shared/entities/StoreProduct'
import { ProductSchemaType } from '@/shared/schemas/Product.schema'
import { StoreProductSchemaType } from '@/shared/schemas/StoreProduct.schema'
import { setURLSearchParams } from '@/shared/utils/setURLSearchParams'

export interface GetStoreProductsFilters {
  sortByAmount?: 'ASC' | 'DESC'
  sortByName?: 'ASC' | 'DESC'
  promotionalProduct?: boolean
  productInfo?: boolean
}

class StoreProductService {
  async getStoreProducts(
    filters: GetStoreProductsFilters,
  ): Promise<StoreProduct[]> {
    const url = new URL(`${API_BASE_URL}store-product`)
    setURLSearchParams(url, filters)

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const data = await response.json()
    if (!response.ok) {
      throw data
    }
    return data
  }
  async createStoreProduct(
    storeProductSchema: StoreProductSchemaType,
  ): Promise<StoreProduct> {
    const response = await fetch(`${API_BASE_URL}store-product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(storeProductSchema),
    })

    const data = await response.json()
    if (!response.ok) {
      throw data
    }
    return data
  }
  async updateStoreProduct({
    storeProductUPC,
    ...productSchema
  }: {
    storeProductUPC: string
  } & StoreProductSchemaType): Promise<StoreProduct> {
    const response = await fetch(
      `${API_BASE_URL}store-product/${storeProductUPC}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(productSchema),
      },
    )

    const data = await response.json()
    if (!response.ok) {
      throw data
    }
    return data
  }
  async deleteStoreProduct(storeProductUPC: string): Promise<void> {
    const response = await fetch(
      `${API_BASE_URL}store-product/${storeProductUPC}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )

    const data = await response.json()
    if (!response.ok) {
      throw data
    }
    return data
  }
}

export const storeProductService = new StoreProductService()
