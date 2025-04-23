import {ProductSchemaType} from '@/shared/schemas/Product.schema';
import { FormProps } from '@/shared/types/FormProps';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {SelectCategory} from '@/components/SelectCategory';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import * as React from 'react';

export const ProductForm = (
	{form, onSubmit, buttonText}: FormProps<ProductSchemaType>
) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<FormField
					control={form.control}
					name="category_number"
					render={({field}) => (
						<FormItem>
							<FormLabel>Category</FormLabel>
							<SelectCategory {...field} onValueChange={field.onChange}/>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="product_name"
					render={({field}) => (
						<FormItem>
							<FormLabel>Product Name</FormLabel>
							<FormControl>
								<Input {...field}/>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="characteristics"
					render={({field}) => (
						<FormItem>
							<FormLabel>Characteristics</FormLabel>
							<FormControl>
								<Textarea {...field}/>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<Button disabled={!form.formState.isValid || form.formState.isSubmitting}>
					{buttonText}
				</Button>
			</form>
		</Form>
	)
}