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

	const mainButtonStyles =
		'flex items-center w-full bg-green-600 text-white hover:bg-gray-800 rounded-md px-4 py-2';
	const submenuContainerStyles =
		'absolute top-10 left-0 bg-gray-700 shadow-md rounded-md p-2 w-full';
	const submenuItemStyles =
		'w-full py-2 cursor-pointer text-white bg-gray-700 hover:bg-gray-600 p-4 rounded';

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
						className='relative'
						onMouseEnter={() => setIsUserMenuOpen(true)}
						onMouseLeave={() => setIsUserMenuOpen(false)}>
						<Button className={mainButtonStyles}>
							Gerenciar Usuários
							<ChevronDown className='ml-2' />
						</Button>
						{isUserMenuOpen && (
							<div className={submenuContainerStyles}>
								{roles.CREATE_USER_ROLES.includes(role ?? '') && (
									<div
										className={submenuItemStyles}
										onClick={() => navigate('/cadastrarUsuario')}>
										Cadastrar Usuários
									</div>
								)}
								{roles.LIST_USERS_ROLES.includes(role ?? '') && (
									<div
										className={submenuItemStyles}
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
						className='relative'
						onMouseEnter={() => setIsEventMenuOpen(true)}
						onMouseLeave={() => setIsEventMenuOpen(false)}>
						<Button className={mainButtonStyles}>
							Gerenciar Eventos
							<ChevronDown className='ml-2' />
						</Button>
						{isEventMenuOpen && (
							<div className={submenuContainerStyles}>
								{roles.CREATE_EVENT_ROLES.includes(role ?? '') && (
									<div
										className={submenuItemStyles}
										onClick={() => navigate('/cadastrarEvento')}>
										Cadastrar Eventos
									</div>
								)}
								{roles.FETCH_ALL_EVENTS.includes(role ?? '') && (
									<div className={submenuItemStyles} onClick={() => navigate('/eventos')}>
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
