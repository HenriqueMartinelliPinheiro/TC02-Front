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
			courses: [],
			eventStatus: 'Não Iniciado',
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
			<div className='flex items-center justify-center h-screen my-32	'>
				<div className='w-full max-w-md mx-auto p-8 rounded shadow-lg bg-card text-card-foreground'>
					<h2 className='my-5 text-center'>Cadastrar Eventos</h2>
					<EventForm
						formMethods={formMethods}
						onSubmit={onSubmit}
						error={error}
						data={data}
						message={message}
						statusOptions={statusOptions || []}
						courses={courses || []}
						selectedCourseIds={[]}
						isEditMode={false}
					/>
				</div>
			</div>
		</>
	);
};
