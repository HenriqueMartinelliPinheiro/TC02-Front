import React from 'react';
import { useCreateCourse } from '../../../hooks/useCreateCourse';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseFormSchema } from '@/@types/courseFormSchema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loading } from '@/utils/loading';

interface CourseFormProps {
	initialData?: { id?: number; name: string; coordinatorEmail: string; status: number };
}

export const CourseForm: React.FC<CourseFormProps> = () => {
	const { handleCreateCourse, isLoading, error, data, message } = useCreateCourse();
	const form = useForm<z.infer<typeof courseFormSchema>>({
		resolver: zodResolver(courseFormSchema),
		defaultValues: {
			coordinatorEmail: '',
			courseName: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof courseFormSchema>) => {
		await handleCreateCourse(values.courseName, values.coordinatorEmail);
		if (!error) {
			form.reset();
		}
	};

	return (
		<div className='max-w-sm mx-auto'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name='courseName'
						render={({ field }) => (
							<FormItem className='my-6'>
								<FormLabel>Nome do Curso</FormLabel>
								<FormControl>
									<Input type='text' placeholder='Nome do Curso' {...field} />
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='coordinatorEmail'
						render={({ field }) => (
							<FormItem className='my-6'>
								<FormLabel>Email do Coordenador do Curso</FormLabel>
								<FormControl>
									<Input type='text' placeholder='coordenador@email.com' {...field} />
								</FormControl>
							</FormItem>
						)}
					/>

					<Button type='submit' disabled={isLoading}>
						Enviar
					</Button>
				</form>
				{isLoading && <Loading />}
				{error && <p className='text-red-500'>{error}</p>}
				{data && <p className='text-green-500'>{message}</p>}
			</Form>
		</div>
	);
};
