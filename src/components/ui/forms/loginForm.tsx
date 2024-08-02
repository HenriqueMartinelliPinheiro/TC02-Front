// src/components/LoginForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { loginFormSchema } from '@/@types/loginFormSchema';
import { login } from '@/services/login/loginService';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const LoginForm: React.FC = () => {
	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const navigate = useNavigate();

	const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
		try {
			await login(values.email, values.password);
			navigate('/home');
			values.email = '';
			values.password = '';
		} catch (error) {
			if (error instanceof Error) {
				form.setError('root', { message: error.message });
			} else {
				form.setError('root', {
					message: 'Ocorreu um erro desconhecido',
				});
			}
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type='email' placeholder='email@email.com' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Senha</FormLabel>
							<FormControl>
								<Input type='password' placeholder='Senha' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{form.formState.errors.root && (
					<p className='text-red-600'>{form.formState.errors.root.message}</p>
				)}
				<Button type='submit' className='bg-green-500'>
					Enviar
				</Button>
			</form>
		</Form>
	);
};
