import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { EditIcon, SearchIcon } from 'lucide-react';

export type Course = {
	courseId: number;
	courseName: string;
	coordinatorEmail: string;
};

const handleViewDetails = (courseId: number) => {
	console.log('Visualizar Detalhes:', courseId);
};

const handleEdit = (courseId: number) => {
	console.log('Editar:', courseId);
};

export const columns: ColumnDef<Course>[] = [
	{
		accessorKey: 'courseId',
		header: 'ID',
	},
	{
		accessorKey: 'courseName',
		header: 'Nome',
	},
	{
		accessorKey: 'courseCoordinatorEmail',
		header: 'Email do Coordenador',
	},
	{
		accessorKey: 'actions',
		header: 'Ações',
		cell: ({ row }) => (
			<div className='flex justify-center space-x-2'>
				<Button
					onClick={() => handleViewDetails(row.original.courseId)}
					className='bg-green-500'>
					{' '}
					<SearchIcon className='pr-2' />
					Visualizar Detalhes
				</Button>
				<Button onClick={() => handleEdit(row.original.courseId)} className='bg-blue-500'>
					<EditIcon className='pr-2' />
					Editar
				</Button>
			</div>
		),
	},
];
