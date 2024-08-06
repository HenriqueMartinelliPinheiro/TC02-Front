import { fetchCoursesService } from '@/services/course/fetchAllCoursesService';
import { useState, useEffect } from 'react';
import { Course } from '../../components/tables/courses/CourseTableColumns';

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
				const sortedCourses = courses.sort((course1: Course, course2: Course) =>
					course1.courseName.localeCompare(course2.courseName)
				);
				setData(sortedCourses);
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
