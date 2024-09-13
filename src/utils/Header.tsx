import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, ChevronDown, Menu } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { roles } from '@/config/RoleRoutes';

export const Header: React.FC = () => {
	const { logout, role, loading } = useAuth();
	const navigate = useNavigate();
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const [isEventMenuOpen, setIsEventMenuOpen] = useState(false);
	const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

	if (loading) {
		return null;
	}

	const mainButtonStyles =
		'flex items-center w-full bg-green-600 text-white hover:bg-gray-700 rounded-md px-4 py-2';
	const submenuContainerStyles =
		'absolute bg-gray-700 shadow-md rounded-md p-2 w-full z-10';
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
				<button
					className='block md:hidden ml-auto'
					onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}>
					<Menu className='h-8 w-8 text-black' />
				</button>
			</div>

			{isHamburgerOpen && (
				<div className='absolute top-16 left-0 w-full bg-green-300 p-4 space-y-4 shadow-lg md:hidden'>
					{(roles.CREATE_USER_ROLES.includes(role ?? '') ||
						roles.LIST_USERS_ROLES.includes(role ?? '')) && (
						<div className='relative w-full'>
							<Button
								className={mainButtonStyles}
								onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
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

					{(roles.CREATE_EVENT_ROLES.includes(role ?? '') ||
						roles.FETCH_ALL_EVENTS.includes(role ?? '')) && (
						<div className='relative w-full'>
							<Button
								className={mainButtonStyles}
								onClick={() => setIsEventMenuOpen(!isEventMenuOpen)}>
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
										<div
											className={submenuItemStyles}
											onClick={() => navigate('/eventos')}>
											Gerenciar Eventos
										</div>
									)}
								</div>
							)}
						</div>
					)}

					<Button
						className='w-full'
						onClick={() => {
							logout();
							navigate('/home');
						}}>
						<LogOut className='px-1' /> Sair
					</Button>
				</div>
			)}

			<div className='absolute top-1 right-0 hidden md:flex items-center p-4 space-x-4'>
				{(roles.CREATE_USER_ROLES.includes(role ?? '') ||
					roles.LIST_USERS_ROLES.includes(role ?? '')) && (
					<div className='relative'>
						<Button
							className={mainButtonStyles}
							onMouseEnter={() => setIsUserMenuOpen(true)}
							onMouseLeave={() => setIsUserMenuOpen(false)}>
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

				{(roles.CREATE_EVENT_ROLES.includes(role ?? '') ||
					roles.FETCH_ALL_EVENTS.includes(role ?? '')) && (
					<div className='relative'>
						<Button
							className={mainButtonStyles}
							onMouseEnter={() => setIsEventMenuOpen(true)}
							onMouseLeave={() => setIsEventMenuOpen(false)}>
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
