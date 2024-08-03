import { useState } from 'react';
import { createCourse } from '../services/course/createCourseService';

export const useCreateCourse = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<any>(null);
	const [message, setMessage] = useState<string | null>(null);

	const handleCreateCourse = async (
		courseName: string,
		courseCoordinatorEmail: string
	) => {
		setIsLoading(true);
		setError(null);
		try {
			const result = await createCourse(courseName, courseCoordinatorEmail);
			setData(result);
			setMessage('Curso Criado com sucesso!');
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('Erro desconhecido');
			}
		} finally {
			setIsLoading(false);
		}
	};

	return { handleCreateCourse, isLoading, error, data, message };
};
