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
		<>
			<div className='w-full flex flex-wrap justify-center gap-4 px-4 md:px-8 lg:px-16'>
				{roles.LIST_COURSES_ROLES.includes(role ?? '') && (
					<Button
						className='py-6 px-4 rounded flex-1 max-w-[calc(25%-1rem)] min-w-[200px]'
						onClick={() => navigate('/cursos')}>
						Gerenciar Cursos
					</Button>
				)}

				{roles.CREATE_COURSE_ROLES.includes(role ?? '') && (
					<Button
						className='py-6 px-4 rounded flex-1 max-w-[calc(25%-1rem)] min-w-[200px]'
						onClick={() => navigate('/cadastrarCurso')}>
						Cadastrar Cursos
					</Button>
				)}

				{roles.CREATE_USER_ROLES.includes(role ?? '') && (
					<Button
						className='py-6 px-4 rounded flex-1 max-w-[calc(25%-1rem)] min-w-[200px]'
						onClick={() => navigate('/cadastrarUsuario')}>
						Cadastrar Usuários
					</Button>
				)}

				{roles.LIST_USERS_ROLES.includes(role ?? '') && (
					<Button
						className='py-6 px-4 rounded flex-1 max-w-[calc(25%-1rem)] min-w-[200px]'
						onClick={() => navigate('/usuarios')}>
						Consultar Usuários
					</Button>
				)}
			</div>
		</>
	);
};
