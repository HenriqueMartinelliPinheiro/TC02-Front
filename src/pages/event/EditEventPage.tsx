import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { eventFormSchema } from '@/@types/event/eventFormSchema';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../utils/Header';
import { EventForm } from '@/components/forms/EventForm';
import { useEditEvent } from '../../hooks/event/useEditPage';
import { useGetEventById } from '@/hooks/event/useGetEventById';

export const EditEventPage: React.FC = () => {
	const { eventId } = useParams<{ eventId: string }>();
	const navigate = useNavigate();
	const { handleEditEvent, error, data, message } = useEditEvent();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const formMethods = useForm<z.infer<typeof eventFormSchema>>({
		resolver: zodResolver(eventFormSchema),
	});

	const { event, error: eventError } = useGetEventById(Number(eventId));

	useEffect(() => {
		if (event?.event) {
			const startDate = event.event.eventStartDate
				? new Date(event.event.eventStartDate).toISOString().slice(0, 16)
				: '';
			const endDate = event.event.eventEndDate
				? new Date(event.event.eventEndDate).toISOString().slice(0, 16)
				: '';

			formMethods.reset({
				eventTitle: event.event.eventTitle,
				eventStartDate: startDate,
				eventEndDate: endDate,
				eventStatus: event.event.eventStatus,
				selectedCoursesIds: event.event.selectedCoursesIds,
				eventActivities: event.event.eventActivities,
				eventLatitude: event.event.eventLatitude,
				eventLongitude: event.event.eventLongitude,
				eventRadius: event.event.eventRadius,
			});
			setIsLoading(false);
		} else if (eventError) {
			console.log('error:', eventError);
			// navigate('/eventos');
			setIsLoading(false);
		}
	}, [event, eventError, formMethods, navigate]);

	const onSubmit = async (values: z.infer<typeof eventFormSchema>) => {
		if (eventId) {
			await handleEditEvent(Number(eventId), values);
			if (data) {
				formMethods.reset();
				navigate('/eventos');
			}
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Header />
			<div className='flex items-center justify-center min-h-screen mt-24 mb-12'>
				<div className='w-full max-w-7xl p-8 rounded shadow-lg bg-card text-card-foreground mx-8'>
					<h2 className='my-5 text-center'>Editar Evento</h2>
					<EventForm
						formMethods={formMethods}
						onSubmit={onSubmit}
						error={error}
						data={data}
						message={message}
						statusOptions={[]}
						courses={[]}
						selectedCourseIds={formMethods.getValues('selectedCoursesIds')}
						isEditMode={true}
					/>
				</div>
			</div>
		</>
	);
};
