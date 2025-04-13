import {z} from 'zod';

export const CustomerCardSchema = z.object({
	cust_surname: z.string()
		.trim()
		.min(3, "Customer surname must be at least 3 character long")
		.max(50, "Customer surname must be at most 50 characters long"),
	cust_name: z.string()
		.trim()
		.min(3, "Customer name must be at least 3 character long")
		.max(50, "Customer name must be at most 50 characters long"),
	cust_patronymic: z.string()
		.trim()
		.min(3, "Patronymic must be at least 3 character long")
		.max(50, "Patronymic must be at most 50 characters long")
		.nullable(),
	phone_number: z.string()
		.trim()
		.min(3, "Phone Number must be at least 3 character long")
		.max(13, "Phone Number must be at most 13 characters long"),
	city: z.string()
		.trim()
		.min(3, "City must be at least 3 character long")
		.max(50, "City must be at most 50 characters long")
		.nullable(),
	street: z.string()
		.trim()
		.min(3, "Street must be at least 3 character long")
		.max(50, "Street must be at most 50 characters long")
		.nullable(),
	zip_code: z.string()
		.trim()
		.min(3, "Zip Code must be at least 1 character long")
		.max(50, "Zip Code must be at most 50 characters long")
		.nullable(),
	percent: z.number().min(0).max(100)
})

export type CustomerCardSchemaType = z.infer<typeof CustomerCardSchema>;