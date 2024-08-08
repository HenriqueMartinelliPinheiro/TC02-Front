import React from 'react';
import { CourseTable } from '../../components/tables/courses/CourseTable';
import { Header } from '@/utils/Header';

const ListCoursesPage: React.FC = () => {
	return (
		<div>
			<Header />
			<h2 className='mt-24 text-center'>Cursos</h2>
			<CourseTable />
		</div>
	);
};

export default ListCoursesPage;
