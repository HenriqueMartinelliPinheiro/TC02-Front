import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { EditIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export type Event = {
	eventId: number;
	eventTitle: string;
	eventStatus: string;
	eventStartDate: string;
	eventEndDate: string;
};

export const columns: ColumnDef<Event>[] = [
	{
		accessorKey: 'eventTitle',
		header: 'Título',
	},
	{
		accessorKey: 'eventStartDate',
		header: 'Data de Início',
		cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString('pt-BR'),
	},
	{
		accessorKey: 'eventEndDate',
		header: 'Data de Fim',
		cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString('pt-BR'),
	},
	{
		accessorKey: 'eventStatus',
		header: 'Status',
	},
	{
		accessorKey: 'actions',
		header: 'Ações',
		cell: ({ row }) => (
			<div className='flex justify-center space-x-2'>
				<Link
					to={`../editarEvento/${row.original.eventId}`}
					state={{ event: row.original }}>
					<Button variant={'edit'}>
						<EditIcon className='pr-2' />
						Edit
					</Button>
				</Link>
			</div>
		),
	},
];
