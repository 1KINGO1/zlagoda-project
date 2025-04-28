import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FormProps } from '@/shared/types/FormProps'
import { ReceiptSchemaType } from '@/shared/schemas/Receipt.schema'
import { SelectCustomer } from '@/components/SelectCustomer'
import { SelectProducts } from './SelectProducts'

export const ReceiptForm = ({
  form,
  onSubmit,
  buttonText,
}: FormProps<ReceiptSchemaType>) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <FormField
          control={form.control}
          name='card_number'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer</FormLabel>
              <SelectCustomer value={field.value} onChange={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='products'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Products*</FormLabel>
              <SelectProducts onChange={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          {buttonText}
        </Button>
      </form>
    </Form>
  )
}
