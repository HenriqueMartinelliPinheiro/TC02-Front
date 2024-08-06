import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { setErrorMap, z } from 'zod';
import { courseFormSchema } from '@/@types/course/courseFormSchema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loading } from '@/utils/Loading';
import { Alert } from '../ui/alert';

interface CourseFormProps {
	formMethods: UseFormReturn<z.infer<typeof courseFormSchema>>;
	onSubmit: (values: z.infer<typeof courseFormSchema>) => Promise<void>;
	isLoading?: boolean;
	error: string | null;
	data: any;
	message: string | null;
}

export const CourseForm: React.FC<CourseFormProps> = ({
	formMethods,
	onSubmit,
	isLoading,
	error,
	data,
	message,
}) => {
	const [courseName, setCourseName] = useState(formMethods.watch('courseName'));
	const [courseCoordinatorEmail, setCourseCoordinatorEmail] = useState(
		formMethods.watch('coordinatorEmail')
	);
	const [courseId, setCourseId] = useState(formMethods.watch('courseId'));

	return (
		<div className='max-w-sm mx-auto'>
			{isLoading && <Loading />}
			{error && (
				<Alert className='text-red-500 my-4 p-2 text-center alert'>{error}</Alert>
			)}
			{data && (
				<Alert className='text-green-500 my-4 p-2 text-center alert'>{message}</Alert>
			)}
			<Form {...formMethods}>
				<form onSubmit={formMethods.handleSubmit(onSubmit)}>
					<FormField
						control={formMethods.control}
						name='courseName'
						render={({ field }) => (
							<FormItem className='my-6'>
								<FormLabel>Nome do Curso</FormLabel>
								<FormControl>
									<Input
										type='text'
										placeholder='Nome do Curso'
										{...field}
										value={courseName}
										onChange={(e) => {
											setCourseName(e.target.value);
											formMethods.setValue('courseName', e.target.value);
										}}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={formMethods.control}
						name='coordinatorEmail'
						render={({ field }) => (
							<FormItem className='my-6'>
								<FormLabel>Email do Coordenador do Curso</FormLabel>
								<FormControl>
									<Input
										type='email'
										placeholder='coordenador@email.com'
										{...field}
										value={courseCoordinatorEmail}
										onChange={(e) => {
											setCourseCoordinatorEmail(e.target.value);
											formMethods.setValue('coordinatorEmail', e.target.value);
										}}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<Button type='submit'>Enviar</Button>
				</form>
			</Form>
		</div>
	);
};
