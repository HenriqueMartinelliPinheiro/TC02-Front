import React from 'react';
import { useForm } from 'react-hook-form';
import { Header } from '../utils/Header';
import { CourseForm } from '@/components/forms/CourseForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEditCourse } from '@/hooks/course/useEditCourse';
import { useLocation } from 'react-router-dom';
import { courseFormSchema } from '@/@types/course/courseFormSchema';

export const EditCoursePage: React.FC = () => {
	const location = useLocation();
	const { handleEditCourse, error, data, message } = useEditCourse();

	const formMethods = useForm<z.infer<typeof courseFormSchema>>({
		resolver: zodResolver(courseFormSchema),
		defaultValues: {
			coordinatorEmail: location.state.course.courseCoordinatorEmail,
			courseName: location.state.course.courseName,
			courseId: location.state.course.courseId,
		},
	});

	const onSubmit = async (values: z.infer<typeof courseFormSchema>) => {
		await handleEditCourse(values.courseName, values.coordinatorEmail, values.courseId);
		if (!error) {
			formMethods.reset();
		}
	};

	return (
		<>
			<Header />
			<div className='flex items-center justify-center h-screen'>
				<div className='w-full max-w-md mx-auto p-8 rounded shadow-lg'>
					<h2 className='my-5 text-center'>Cadastrar Curso</h2>
					<CourseForm
						formMethods={formMethods}
						onSubmit={onSubmit}
						error={error}
						data={data}
						message={message}
					/>
				</div>
			</div>
		</>
	);
};