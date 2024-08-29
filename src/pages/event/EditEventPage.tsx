import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { eventFormSchema } from '@/@types/event/eventFormSchema';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header } from '../../utils/Header';
import { EventForm } from '@/components/forms/EventForm';
import { useEditEvent } from '../../hooks/event/useEditPage';
import { API_ROUTES } from '@/config/apiConfig';

export const EditEventPage: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { handleEditEvent, error, data, message } = useEditEvent();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const formMethods = useForm<z.infer<typeof eventFormSchema>>({
		resolver: zodResolver(eventFormSchema),
	});

	useEffect(() => {
		const eventData = location.state?.event;

		if (eventData) {
			formMethods.reset({
				eventTitle: eventData.eventTitle,
				eventStartDate: new Date(eventData.eventStartDate).toISOString().slice(0, 16),
				eventEndDate: new Date(eventData.eventEndDate).toISOString().slice(0, 16),
				eventStatus: eventData.eventStatus,
				selectedCoursesIds: eventData.selectedCoursesIds,
				eventActivities: eventData.eventActivities,
				eventLatitude: eventData.eventLatitude,
				eventLongitude: eventData.eventLongitude,
				eventRadius: eventData.eventRadius,
			});
			setIsLoading(false);
		} else {
			const fetchEvent = async (eventId: number) => {
				try {
					const response = await fetch(`${API_ROUTES.GET_EVENT_BY_ID}/${eventId}`);
					if (!response.ok) {
						throw new Error('Failed to load event data');
					}
					const data = await response.json();
					formMethods.reset({
						eventTitle: data.eventTitle,
						eventStartDate: new Date(data.eventStartDate).toISOString().slice(0, 16),
						eventEndDate: new Date(data.eventEndDate).toISOString().slice(0, 16),
						eventStatus: data.eventStatus,
						selectedCoursesIds: data.selectedCoursesIds,
						eventActivities: data.eventActivities,
						eventLatitude: data.eventLatitude,
						eventLongitude: data.eventLongitude,
						eventRadius: data.eventRadius,
					});
				} catch (error) {
					console.log(error);
					navigate('/eventos');
				} finally {
					setIsLoading(false);
				}
			};

			const eventId = Number(location.state?.eventId);
			if (eventId) {
				fetchEvent(eventId);
			} else {
				setIsLoading(false);
			}
		}
	}, [location.state, formMethods]);

	const onSubmit = async (values: z.infer<typeof eventFormSchema>) => {
		const eventId = Number(location.state?.eventId);
		await handleEditEvent(eventId, values);
		if (data) {
			formMethods.reset();
			navigate('/eventos');
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
