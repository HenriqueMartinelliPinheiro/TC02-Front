import { useState, useEffect } from 'react';
import { fetchRolesService } from '@/services/role/fetchRolesService';

interface Role {
	roleId: number;
	roleTitle: string;
}

export const useFetchRoles = (): {
	data: Role[];
	loading: boolean;
	error: boolean;
} => {
	const [data, setData] = useState<Role[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchRoles = async () => {
			try {
				const roles = await fetchRolesService();
				setData(roles);
				setError(false);
			} catch (err) {
				console.error('Erro ao buscar roles:', err);
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		fetchRoles();
	}, []);

	return { data, loading, error };
};
