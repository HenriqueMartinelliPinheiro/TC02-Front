import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EventForm } from '@/components/forms/EventForm';
import { eventFormSchema } from '@/@types/event/eventFormSchema';
import { useCreateEvent } from '@/hooks/event/useCreateEvent';
import { useFetchStatusOptions } from '@/hooks/event/useFetchStatusOptions';
import { z } from 'zod';
import { useFetchCourses } from '@/hooks/course/useFetchCourses';
import { Header } from '@/utils/Header';

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
		},
	});

	const { data: statusOptions } = useFetchStatusOptions();
	const { data: courses } = useFetchCourses(0, 0, '');

	const onSubmit = async (values: z.infer<typeof eventFormSchema>) => {
		await handleCreateEvent(values);
		if (data) {
			formMethods.reset();
		}
	};

	return (
		<>
			<Header />
			<div className='flex items-center justify-center min-h-screen mt-24'>
				<div className='w-full max-w-7xl p-8 rounded shadow-lg bg-card text-card-foreground mx-8'>
					<h2 className=' text-center'>Cadastrar Eventos</h2>
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
