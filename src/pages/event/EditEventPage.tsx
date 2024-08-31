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
import { useFetchCourses } from '@/hooks/course/useFetchCourses';
import { useFetchStatusOptions } from '@/hooks/event/useFetchStatusOptions';

interface EventCourse {
	eventId: number;
	courseId: number;
	course: {
		courseId: number;
		courseName: string;
		createdAt: string;
		updatedAt: string;
		courseCoordinatorEmail: string;
	};
}

interface EventActivity {
	eventActivityId: number;
	eventActivityTitle: string;
	eventActivityDescription: string;
	eventActivityStartDate: string;
	eventActivityEndDate: string;
	eventId: number;
	createdAt: string;
	updatedAt: string;
}

export const EditEventPage: React.FC = () => {
	const { eventId } = useParams<{ eventId: string }>();
	const navigate = useNavigate();
	const { handleEditEvent, error, data, message } = useEditEvent();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const formMethods = useForm<z.infer<typeof eventFormSchema>>({
		resolver: zodResolver(eventFormSchema),
	});

	const { event, error: eventError } = useGetEventById(Number(eventId));
	const { data: courses } = useFetchCourses(0, 0, '');
	const { data: statusOptions } = useFetchStatusOptions();

	console.log('event:', event);
	useEffect(() => {
		if (event?.event && courses) {
			const selectedCourseIds = event.event.eventCourse.map(
				(ec: EventCourse) => ec.course.courseId
			);

			const formattedActivities = event.event.eventActivity.map(
				(activity: EventActivity) => ({
					...activity,
					eventActivityStartDate: formatDateForInput(activity.eventActivityStartDate),
					eventActivityEndDate: formatDateForInput(activity.eventActivityEndDate),
				})
			);

			formMethods.setValue('eventTitle', event.event.eventTitle);
			formMethods.setValue(
				'eventStartDate',
				formatDateForInput(event.event.eventStartDate)
			);
			formMethods.setValue('eventEndDate', formatDateForInput(event.event.eventEndDate));
			formMethods.setValue('eventStatus', event.event.eventStatus);
			formMethods.setValue('selectedCoursesIds', selectedCourseIds);
			formMethods.setValue('eventActivities', formattedActivities);
			formMethods.setValue('eventLatitude', event.event.eventLocation.latitude);
			formMethods.setValue('eventLongitude', event.event.eventLocation.longitude);
			formMethods.setValue('eventRadius', event.event.eventLocation.radius);

			setIsLoading(false);
		} else if (eventError) {
			console.log('error:', eventError);
			setIsLoading(false);
		}
	}, [event, eventError, formMethods, navigate, courses]);

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
						statusOptions={statusOptions}
						courses={courses}
						selectedCourseIds={formMethods.getValues('selectedCoursesIds')}
						isEditMode={true}
					/>
				</div>
			</div>
		</>
	);
};

const formatDateForInput = (dateString: string): string => {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');

	return `${year}-${month}-${day}T${hours}:${minutes}`;
};
