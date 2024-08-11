import React from 'react';
import { Header } from '@/utils/Header';
import { UserTable } from '@/components/tables/users/UserTable';

export const ListUsersPage: React.FC = () => {
	return (
		<div>
			<Header />
			<h2 className='mt-24 text-center'>Usuários</h2>
			<UserTable />
		</div>
	);
};
