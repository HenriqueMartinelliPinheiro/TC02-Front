import { Button } from '@/components/ui/button';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { roles } from '@/config/RoleRoutes';
import { DefaultWarning } from './DefaultWarning';

export const HomePageButtons: React.FC = () => {
	const navigate = useNavigate();
	const { role, loading } = useAuth();

	if (loading) {
		return <DefaultWarning message='Carregando, Aguarde' />;
	}

	return (
		<div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4 md:px-8 lg:px-16'>
			{roles.CREATE_USER_ROLES.includes(role ?? '') && (
				<div className='flex justify-center'>
					<Button
						className='w-full max-w-[200px] h-[20px] py-6 rounded bg-green-600 text-primary-foreground text-center'
						onClick={() => navigate('/cadastrarUsuario')}>
						Cadastrar Usuários
					</Button>
				</div>
			)}

			{roles.LIST_USERS_ROLES.includes(role ?? '') && (
				<div className='flex justify-center'>
					<Button
						className='w-full max-w-[200px] h-[20px] py-6 rounded bg-green-600 text-primary-foreground text-center'
						onClick={() => navigate('/usuarios')}>
						Consultar Usuários
					</Button>
				</div>
			)}

			{roles.CREATE_EVENT_ROLES.includes(role ?? '') && (
				<div className='flex justify-center'>
					<Button
						className='w-full max-w-[200px] h-[20px] py-6 rounded bg-green-600 text-primary-foreground text-center'
						onClick={() => navigate('/cadastrarEvento')}>
						Cadastrar Eventos
					</Button>
				</div>
			)}

			{roles.FETCH_ALL_EVENTS.includes(role ?? '') && (
				<div className='flex justify-center'>
					<Button
						className='w-full max-w-[200px] h-[20px] py-6 rounded bg-green-600 text-primary-foreground text-center'
						onClick={() => navigate('/eventos')}>
						Gerenciar Eventos
					</Button>
				</div>
			)}
		</div>
	);
};
