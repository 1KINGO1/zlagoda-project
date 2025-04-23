export interface Receipt {
  receipt_number: string
  id_employee: string
  card_number: string | null
  print_date: Date
  sum_total: number
  vat: number

  items?: ReceiptItem[]
}

export interface ReceiptItem {
  print_date: Date
  product_number: number
  selling_price: number
  product_name: string
}
