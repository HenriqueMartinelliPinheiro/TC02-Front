import React from 'react';
import { useForm } from 'react-hook-form';
import { Header } from '../../utils/Header';
import { CourseForm } from '@/components/forms/CourseForm';
import { courseFormSchema } from '@/@types/course/courseFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateCourse } from '@/hooks/course/useCreateCourse';

export const CreateCoursePage: React.FC = () => {
	const { handleCreateCourse, error, data, message } = useCreateCourse();
	const formMethods = useForm<z.infer<typeof courseFormSchema>>({
		resolver: zodResolver(courseFormSchema),
		defaultValues: {
			coordinatorEmail: '',
			courseName: '',
			courseId: 0,
		},
	});

	const onSubmit = async (values: z.infer<typeof courseFormSchema>) => {
		await handleCreateCourse(values.courseName, values.coordinatorEmail);
		if (data) {
			formMethods.reset();
		}
	};

	return (
		<>
			<Header />
			<div className='flex items-center justify-center h-screen'>
				<div className='w-full max-w-md mx-auto p-8 rounded shadow-lg bg-card text-card-foreground'>
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