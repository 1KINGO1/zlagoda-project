'use client'

import {Card} from '@/components/ui/card';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {useForm} from 'react-hook-form';
import {Button} from '@/components/ui/button';
import {LoginFormSchema, LoginFormSchemaType} from '@/shared/schemas/LoginForm.schema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useLogin} from '@/features/auth/hooks/useLogin';

export function AuthForm() {
	const form = useForm<LoginFormSchemaType>({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: zodResolver(LoginFormSchema),
	});
	const { mutateAsync: login } = useLogin({
		onSuccess: () => {
			// Handle successful login, e.g., redirect or show a success message
		},
		onError: (error) => {
			if (error.statusCode === 404) {
				form.setError('login', { type: 'manual', message: 'Invalid login' });
			}
			if (error.statusCode === 400) {
				form.setError('password', { type: 'manual', message: 'Invalid password' });
			}
		},
	})

	const submitHandler = (data: LoginFormSchemaType) => {
		return login(data);
	}

	return (
		<Card className="p-6 min-w-[400px]">
			<Form {...form}>
				<form className="flex flex-col gap-4" onSubmit={form.handleSubmit(submitHandler)}>
					<FormField
						control={form.control}
						name="login"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Login</FormLabel>
								<FormControl>
									<Input placeholder="employee-ivan-ivanov" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" placeholder="password123" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" color="primary" disabled={!form.formState.isValid || form.formState.isSubmitting}>Login</Button>
				</form>
			</Form>
		</Card>
	)
}