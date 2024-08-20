import React from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { z } from 'zod';
import { Alert } from '@/components/ui/alert';
import { eventFormSchema } from '@/@types/event/eventFormSchema';
import { PlusCircle, XIcon } from 'lucide-react';

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
	isEditMode = false,
}) => {
	const { fields, append, remove } = useFieldArray({
		control: formMethods.control,
		name: 'eventActivities',
	});

	React.useEffect(() => {
		if (fields.length === 0) {
			append({
				eventActivityTitle: '',
				eventActivityDescription: '',
				eventActivityStartDate: '',
				eventActivityEndDate: '',
			});
			remove(1);
		}
	}, [fields, append, remove]);

	const handleCheckboxChange = (id: number) => {
		const currentValue = formMethods.getValues('selectedCoursesIds') || [];
		const updatedValue = currentValue.includes(id)
			? currentValue.filter((courseId: number) => courseId !== id)
			: [...currentValue, id];

		formMethods.setValue('selectedCoursesIds', updatedValue);
	};

	const eventStatusValue = formMethods.getValues('eventStatus');

	return (
		<div className='container mx-auto py-10'>
			{isLoading && <div>Carregando...</div>}
			{error && <Alert className='text-red-500 my-4 p-2 text-center'>{error}</Alert>}
			{data && <Alert className='text-green-500 my-4 p-2 text-center'>{message}</Alert>}

			<Form {...formMethods}>
				<form onSubmit={formMethods.handleSubmit(onSubmit)} className='space-y-8'>
					<div className='flex flex-col lg:flex-row w-full'>
						<div className='flex-1 p-4'>
							<FormField
								control={formMethods.control}
								name='eventTitle'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Título do Evento</FormLabel>
										<FormControl>
											<Input type='text' placeholder='Título' {...field} />
										</FormControl>
									</FormItem>
								)}
							/>

							<div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
								<FormField
									control={formMethods.control}
									name='eventStartDate'
									render={({ field }) => (
										<FormItem className='flex-1'>
											<FormLabel>Data de Início</FormLabel>
											<FormControl>
												<Input type='datetime-local' {...field} className='w-full' />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={formMethods.control}
									name='eventEndDate'
									render={({ field }) => (
										<FormItem className='flex-1'>
											<FormLabel>Data de Fim</FormLabel>
											<FormControl>
												<Input type='datetime-local' {...field} className='w-full' />
											</FormControl>
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={formMethods.control}
								name='eventStatus'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Status do Evento</FormLabel>
										<FormControl>
											<select
												disabled={!isEditMode}
												value={eventStatusValue || 'Não Iniciado'}
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
						</div>

						<div className='border-l border-gray-300'></div>

						<div className='flex-1 p-4'>
							<FormField
								control={formMethods.control}
								name='selectedCoursesIds'
								render={() => (
									<FormItem>
										<FormLabel>Cursos Permitidos</FormLabel>
										<FormControl>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
												{courses.map((course) => (
													<div key={course.courseId} className='flex items-center'>
														<Checkbox
															checked={formMethods
																.watch('selectedCoursesIds')
																.includes(course.courseId)}
															onCheckedChange={() =>
																handleCheckboxChange(course.courseId)
															}
														/>
														<span className='ml-2'>{course.courseName}</span>
													</div>
												))}
											</div>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
					</div>

					<hr className='my-8 border-gray-300' />

					<div className='flex flex-col lg:flex-row w-full mt-8'>
						<div className='flex-1 p-4'>
							{fields.map((item, index) => (
								<div key={item.id} className='space-y-4'>
									<FormField
										control={formMethods.control}
										name={`eventActivities.${index}.eventActivityTitle`}
										render={({ field }) => (
											<FormItem className='flex-1'>
												<FormLabel>Título da Atividade</FormLabel>
												<FormControl>
													<Input
														type='text'
														placeholder='Título da Atividade'
														{...field}
														className='w-full'
													/>
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={formMethods.control}
										name={`eventActivities.${index}.eventActivityDescription`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Descrição da Atividade</FormLabel>
												<FormControl>
													<Input type='text' placeholder='Descrição' {...field} />
												</FormControl>
											</FormItem>
										)}
									/>

									<div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
										<FormField
											control={formMethods.control}
											name={`eventActivities.${index}.eventActivityStartDate`}
											render={({ field }) => (
												<FormItem className='flex-1'>
													<FormLabel>Data de Início</FormLabel>
													<FormControl>
														<Input type='datetime-local' {...field} className='w-full' />
													</FormControl>
												</FormItem>
											)}
										/>
										<FormField
											control={formMethods.control}
											name={`eventActivities.${index}.eventActivityEndDate`}
											render={({ field }) => (
												<FormItem className='flex-1'>
													<FormLabel>Data de Fim</FormLabel>
													<FormControl>
														<Input type='datetime-local' {...field} className='w-full' />
													</FormControl>
												</FormItem>
											)}
										/>
									</div>

									<div className='flex flex-col md:flex-row md:space-x-4'>
										<Button
											variant='destructive'
											className='my-2 flex-1'
											type='button'
											onClick={() => remove(index)}
											disabled={fields.length === 1}>
											<XIcon className='pr-1' />
											Remover Atividade
										</Button>

										<Button
											variant='default'
											type='button'
											className='my-2 flex-1'
											onClick={() =>
												append({
													eventActivityTitle: '',
													eventActivityDescription: '',
													eventActivityStartDate: '',
													eventActivityEndDate: '',
												})
											}>
											<PlusCircle className='pr-1' /> Adicionar Nova Atividade
										</Button>
									</div>
								</div>
							))}
						</div>

						<div className='border-l border-gray-300'></div>

						<div className='flex-1 p-4'></div>
					</div>

					<Button type='submit'>Enviar</Button>
				</form>
			</Form>
		</div>
	);
};
