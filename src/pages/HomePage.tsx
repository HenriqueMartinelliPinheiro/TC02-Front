import { Button } from '@/components/ui/button';
import { Header } from '@/utils/Header';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<>
			<div className='relative h-screen '>
				<Header />
				<div className='flex flex-col items-center justify-center h-full'>
					<div className='mb-12'>
						<h1 className='text-2xl font-semibold'>Gerenciar Eventos</h1>
					</div>
					<div className='w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
						<Button
							className='bg-green-500 py-6 px-4 rounded'
							onClick={() => navigate('/eventos')}>
							Gerenciar Evento
						</Button>
						<Button
							className=' bg-green-500 py-6 px-4 rounded'
							onClick={() => navigate('/cadastrarEvento')}>
							Cadastrar Eventos
						</Button>
						<Button
							className='bg-green-500 py-6 px-4 rounded'
							onClick={() => navigate('/cursos')}>
							Gerenciar Cursos
						</Button>
						<Button
							className='bg-green-500 py-6 px-4 rounded'
							onClick={() => navigate('/cadastrarCurso')}>
							Cadastrar Cursos
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};
