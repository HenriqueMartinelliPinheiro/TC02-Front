import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { EditIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export type Course = {
	courseId: number;
	courseName: string;
	courseCoordinatorEmail: string;
};

export const columns: ColumnDef<Course>[] = [
	{
		accessorKey: 'courseName',
		header: 'Name',
	},
	{
		accessorKey: 'courseCoordinatorEmail',
		header: 'Coordinator Email',
	},
	{
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({ row }) => (
			<div className='flex justify-center space-x-2'>
				<Link
					to={`../editarCurso/${row.original.courseId}`}
					state={{ course: row.original }}>
					<Button variant={'edit'}>
						<EditIcon className='pr-2' />
						Edit
					</Button>
				</Link>
			</div>
		),
	},
];
