import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { z } from 'zod';
import { Alert } from '@/components/ui/alert';
import { eventFormSchema } from '@/@types/event/eventFormSchema';

interface EventFormProps {
	formMethods: UseFormReturn<z.infer<typeof eventFormSchema>>;
	onSubmit: (values: z.infer<typeof eventFormSchema>) => Promise<void>;
	isLoading?: boolean;
	error: string | null;
	data: any;
	message: string | null;
	statusOptions: { value: string; label: string }[];
	courses: { courseId: number; courseName: string }[];
	selectedCourseIds: number[];
	isEditMode?: boolean;
}

export const EventForm: React.FC<EventFormProps> = ({
	formMethods,
	onSubmit,
	isLoading,
	error,
	data,
	message,
	statusOptions = [],
	courses,
	selectedCourseIds,
	isEditMode = false,
}) => {
	const handleCheckboxChange = (id: number) => {
		const currentValue = formMethods.getValues('courses') as number[];
		const updatedValue = currentValue.includes(id)
			? currentValue.filter((courseId) => courseId !== id)
			: [...currentValue, id];

		formMethods.setValue('courses', updatedValue);
	};
	const eventStatusValue = formMethods.getValues('eventStatus');
	return (
		<div className='max-w-sm mx-auto'>
			{isLoading && <div>Carregando...</div>}
			{error && <Alert className='text-red-500 my-4 p-2 text-center'>{error}</Alert>}
			{data && <Alert className='text-green-500 my-4 p-2 text-center'>{message}</Alert>}

			<Form {...formMethods}>
				<form onSubmit={formMethods.handleSubmit(onSubmit)} className='space-y-8'>
					<FormField
						control={formMethods.control}
						name='eventTitle'
						render={({ field }) => (
							<FormItem className='my-6'>
								<FormLabel>Título do Evento</FormLabel>
								<FormControl>
									<Input type='text' placeholder='Título' {...field} />
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={formMethods.control}
						name='eventStartDate'
						render={({ field }) => (
							<FormItem className='my-6'>
								<FormLabel>Data de Início</FormLabel>
								<FormControl>
									<Input type='datetime-local' {...field} />
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={formMethods.control}
						name='eventEndDate'
						render={({ field }) => (
							<FormItem className='my-6'>
								<FormLabel>Data de Fim</FormLabel>
								<FormControl>
									<Input type='datetime-local' {...field} />
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={formMethods.control}
						name='eventStatus'
						render={({ field }) => (
							<FormItem className='my-6'>
								<FormLabel>Status do Evento</FormLabel>
								<FormControl>
									<select
										disabled={!isEditMode}
										value={field.value || 'Não Iniciado'}
										onChange={(e) => {
											field.onChange(e.target.value);
										}}
										className='w-full p-2 border rounded'>
										<option value='' disabled>
											Selecione um Status
										</option>
										{statusOptions.map((status) => (
											<option key={status.value} value={status.value}>
												{status.label}
											</option>
										))}
									</select>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={formMethods.control}
						name='courses'
						render={() => (
							<FormItem className='my-6'>
								<FormLabel>Cursos Permitidos</FormLabel>
								<FormControl>
									{courses.map((course) => (
										<div key={course.courseId} className='flex items-center'>
											<Checkbox
												checked={selectedCourseIds.includes(course.courseId)}
												onCheckedChange={() => handleCheckboxChange(course.courseId)}
											/>
											<span className='ml-2'>{course.courseName}</span>
										</div>
									))}
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
