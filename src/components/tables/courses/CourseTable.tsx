import { columns } from './CourseTableColumns';
import { DataTable } from '../../../utils/DataTable';
import { useFetchCourses } from '@/hooks/useFetchCourses';
import { Loading } from '@/utils/Loading';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

export const CourseTable = () => {
	const { data, loading, error } = useFetchCourses();
	const [currentPage, setCurrentPage] = useState(0);
	const pageSize = 10; // Defina o tamanho da página

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

	const startIndex = currentPage * pageSize;
	const paginatedData = data.slice(startIndex, startIndex + pageSize);

	return (
		<div className='container mx-auto py-10'>
			<div className='flex justify-end mb-4'>
				<a href='/cadastrarCurso'>
					<Button className='bg-green-500'>
						<PlusCircle className='pr-2' />
						Cadastrar Novo Curso
					</Button>
				</a>
			</div>
			<DataTable columns={columns} data={paginatedData} />
			<div className='flex justify-center mt-4'>
				{Array.from({ length: Math.ceil(data.length / pageSize) }).map((_, index) => (
					<Button
						key={index}
						onClick={() => handlePageChange(index)}
						className={`mx-1 ${currentPage === index ? 'bg-green-500' : 'bg-gray-500'}`}>
						{index + 1}
					</Button>
				))}
			</div>
		</div>
	);
};
