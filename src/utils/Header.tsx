import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
	const { logout } = useAuth();
	const navigate = useNavigate();
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
			<div className='absolute top-0 right-0 flex items-center p-4 space-x-2'>
				<Button
					className=''
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
