import { fetchCoursesService } from '@/services/course/fetchAllCoursesService';
import { Course } from '../components/tables/courses/CourseTableColumns';
import { useState, useEffect } from 'react';

export const useFetchCourses = (): {
	data: Course[];
	loading: boolean;
	error: boolean;
} => {
	const [data, setData] = useState<Course[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const courses = await fetchCoursesService();
				setData(courses);
				setError(false);
			} catch (error) {
				console.error('Erro ao buscar cursos:', error);
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return { data, loading, error };
};
