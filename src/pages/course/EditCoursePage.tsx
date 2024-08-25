import React, { useEffect, useState } from 'react';
import { useCourse } from '@/context/CourseContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { courseFormSchema } from '@/@types/course/courseFormSchema';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../../utils/Header';
import { CourseForm } from '@/components/forms/CourseForm';
import { useEditCourse } from '@/hooks/course/useEditCourse';
import { API_ROUTES } from '@/config/apiConfig';

export const EditCoursePage: React.FC = () => {
	const location = useLocation();
	const { course, setCourse } = useCourse();
	const { handleEditCourse, error, data, message } = useEditCourse();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	const formMethods = useForm<z.infer<typeof courseFormSchema>>({
		resolver: zodResolver(courseFormSchema),
	});

	useEffect(() => {
		const courseData = location.state?.course;

		if (courseData) {
			setCourse(courseData);
			formMethods.reset({
				coordinatorEmail: courseData.courseCoordinatorEmail,
				courseName: courseData.courseName,
				courseId: courseData.courseId,
			});
			setIsLoading(false);
		} else {
			const fetchCourse = async (courseId: number) => {
				try {
					const response = await fetch(`${API_ROUTES.GET_COURSE_BY_ID}/${courseId}`);
					if (!response.ok) {
						throw new Error('Failed to load course data');
					}
					const data = await response.json();
					setCourse(data);
					formMethods.reset({
						coordinatorEmail: data.courseCoordinatorEmail,
						courseName: data.courseName,
						courseId: data.courseId,
					});
				} catch (error) {
				} finally {
					setIsLoading(false);
				}
			};

			if (course) {
				fetchCourse(course.courseId);
			} else {
				setIsLoading(false);
			}
		}
	}, [location.state, course, setCourse, formMethods]);

	const onSubmit = async (values: z.infer<typeof courseFormSchema>) => {
		await handleEditCourse(values.courseName, values.coordinatorEmail, values.courseId);
		useEffect(() => {
			if (data) {
				formMethods.reset();
				navigate('/cursos');
			}
		}, [data, navigate, formMethods]);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!course) {
		return <div>Course not found</div>;
	}

	return (
		<>
			<div className='flex flex-col items-center justify-start min-h-screen'>
				<Header />
				<div className='flex items-center justify-center h-screen'>
					<div className='w-full max-w-md mx-auto p-8 rounded shadow-lg bg-white'>
						<h2 className='my-5 text-center'>Editar Curso</h2>
						<CourseForm
							formMethods={formMethods}
							onSubmit={onSubmit}
							error={error}
							data={data}
							message={message}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditCoursePage;
