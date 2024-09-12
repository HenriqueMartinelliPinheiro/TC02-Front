import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { roles } from '@/config/RoleRoutes';

export const Header: React.FC = () => {
	const { logout, role, loading } = useAuth();
	const navigate = useNavigate();
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const [isEventMenuOpen, setIsEventMenuOpen] = useState(false);

	if (loading) {
		return null;
	}

	return (
		<header className='p-4'>
			<div className='absolute top-0 left-0 w-full h-16 py-10 bg-gradient-to-l bg-green-300 flex items-center p-4'>
				<a href='/home'>
					<img
						src='/bannerIFC.png'
						alt='Banner IFC'
						className='h-16 w-auto object-contain'
					/>
				</a>
			</div>
			<div className='absolute top-1 right-0 flex items-center p-4 space-x-4'>
				{/* Menu de Gerenciamento de Usuários */}
				{(roles.CREATE_USER_ROLES.includes(role ?? '') ||
					roles.LIST_USERS_ROLES.includes(role ?? '')) && (
					<div
						className={`relative ${
							isUserMenuOpen ? 'bg-gray-100' : ''
						} hover:bg-gray-100 rounded-md`}>
						<Button
							className='flex items-center w-full'
							onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
							Gerenciar Usuários
							<ChevronDown className='ml-2' />
						</Button>
						{isUserMenuOpen && (
							<div className='absolute top-10 left-0 bg-gray-100 shadow-md rounded-md p-4 w-full'>
								{roles.CREATE_USER_ROLES.includes(role ?? '') && (
									<div
										className='w-full py-2 cursor-pointer hover:bg-gray-200'
										onClick={() => navigate('/cadastrarUsuario')}>
										Cadastrar Usuários
									</div>
								)}
								{roles.LIST_USERS_ROLES.includes(role ?? '') && (
									<div
										className='w-full py-2 cursor-pointer hover:bg-gray-200'
										onClick={() => navigate('/usuarios')}>
										Consultar Usuários
									</div>
								)}
							</div>
						)}
					</div>
				)}

				{/* Menu de Gerenciamento de Eventos */}
				{(roles.CREATE_EVENT_ROLES.includes(role ?? '') ||
					roles.FETCH_ALL_EVENTS.includes(role ?? '')) && (
					<div
						className={`relative ${
							isEventMenuOpen ? 'bg-gray-100' : ''
						} hover:bg-gray-100 rounded-md`}>
						<Button
							className='flex items-center w-full'
							onClick={() => setIsEventMenuOpen(!isEventMenuOpen)}>
							Gerenciar Eventos
							<ChevronDown className='ml-2' />
						</Button>
						{isEventMenuOpen && (
							<div className='absolute top-10 left-0 bg-gray-100 shadow-md rounded-md p-4 w-full'>
								{roles.CREATE_EVENT_ROLES.includes(role ?? '') && (
									<div
										className='w-full py-2 cursor-pointer bg-gray-700 text-white hover:bg-gray-200'
										onClick={() => navigate('/cadastrarEvento')}>
										Cadastrar Eventos
									</div>
								)}
								{roles.FETCH_ALL_EVENTS.includes(role ?? '') && (
									<div
										className='w-full py-2 cursor-pointer hover:bg-gray-200'
										onClick={() => navigate('/eventos')}>
										Gerenciar Eventos
									</div>
								)}
							</div>
						)}
					</div>
				)}

				{/* Botão de Logout */}
				<Button
					onClick={() => {
						logout();
						navigate('/home');
					}}>
					<LogOut className='px-1' /> Sair
				</Button>
			</div>
		</header>
	);
};
