import { useState } from 'react';
import { columns } from './CourseTableColumns';
import { DataTable } from '../../../utils/DataTable';
import { useFetchCourses } from '@/hooks/course/useFetchCourses';
import { Loading } from '@/utils/Loading';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const CourseTable = () => {
	const { data, loading, error } = useFetchCourses();
	const [currentPage, setCurrentPage] = useState(0);
	const [searchTerm, setSearchTerm] = useState('');
	const pageSize = 15;

	const handlePageChange = (pageIndex: number) => {
		setCurrentPage(pageIndex);
	};

	if (loading) {
		return (
			<div className='container mx-auto py-10'>
				<Loading />
			</div>
		);
	}

	if (error) {
		return (
			<div className='container mx-auto py-10'>
				<p>Erro ao carregar cursos.</p>
			</div>
		);
	}

	const filteredData = data.filter(
		(course) =>
			course.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			course.courseCoordinatorEmail?.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const startIndex = currentPage * pageSize;
	const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

	return (
		<div className='container mx-auto py-10'>
			<div className='flex justify-between mb-4'>
				<Input
					variant={'search'}
					type='text'
					placeholder='Pesquisar por nome ou email...'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className='px-2 py-2 border rounded-md'
				/>
				<Button className='mx-4'>
					<Search />
				</Button>
				<a href='/cadastrarCurso'>
					<Button>
						<PlusCircle className='pr-2' />
						Cadastrar Novo Curso
					</Button>
				</a>
			</div>
			<DataTable columns={columns} data={paginatedData} />
			<div className='flex justify-center mt-4'>
				{Array.from({ length: Math.ceil(filteredData.length / pageSize) }).map(
					(_, index) => (
						<Button
							key={index}
							onClick={() => handlePageChange(index)}
							className={`mx-1 ${currentPage === index ? '' : 'bg-gray-500'}`}>
							{index + 1}
						</Button>
					)
				)}
			</div>
		</div>
	);
};
