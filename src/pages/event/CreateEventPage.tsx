import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EventForm } from '@/components/forms/EventForm';
import { eventFormSchema } from '@/@types/event/eventFormSchema';
import { useCreateEvent } from '@/hooks/event/useCreateEvent';
import { useFetchStatusOptions } from '@/hooks/event/useFetchStatusOptions';
import { useFetchCourses } from '@/hooks/course/useFetchCourses';
import { Header } from '@/utils/Header';
import { z } from 'zod';

export const CreateEventPage: React.FC = () => {
	const { handleCreateEvent, error, data, message } = useCreateEvent();

	const formMethods = useForm<z.infer<typeof eventFormSchema>>({
		resolver: zodResolver(eventFormSchema),
		defaultValues: {
			eventTitle: '',
			eventStartDate: '',
			eventEndDate: '',
			eventStatus: 'Não Iniciado',
			selectedCoursesIds: [],
			eventActivities: [],
			eventLatitude: undefined,
			eventLongitude: undefined,
			eventRadius: undefined,
		},
	});

	const { data: statusOptions } = useFetchStatusOptions();
	const { data: courses } = useFetchCourses(0, 0, '');

	const onSubmit = async (values: z.infer<typeof eventFormSchema>) => {
		console.log(values);
		const adjustedValues = {
			...values,
			eventStartDate: new Date(`${values.eventStartDate}:00Z`),
			eventEndDate: new Date(`${values.eventEndDate}:00Z`),
			eventActivities:
				values.eventActivities?.map((activity) => ({
					...activity,
					eventActivityStartDate: new Date(`${activity.eventActivityStartDate}:00Z`),
					eventActivityEndDate: new Date(`${activity.eventActivityEndDate}:00Z`),
				})) || [],
		};

		await handleCreateEvent(adjustedValues);
		if (data) {
			formMethods.reset();
		}
	};

	return (
		<>
			<Header />
			<div className='flex items-center justify-center min-h-screen mt-24 mb-12'>
				<div className='w-full max-w-7xl p-8 rounded shadow-lg bg-card text-card-foreground mx-8'>
					<h2 className='text-center'>Cadastrar Eventos</h2>
					<EventForm
						formMethods={formMethods}
						onSubmit={onSubmit}
						error={error}
						data={data}
						message={message}
						statusOptions={statusOptions || []}
						courses={courses || []}
						selectedCourseIds={formMethods.getValues('selectedCoursesIds')}
						isEditMode={false}
					/>
				</div>
			</div>
		</>
	);
};
