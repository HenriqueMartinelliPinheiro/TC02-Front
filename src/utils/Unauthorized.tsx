import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { DefaultWarning } from './DefaultWarning';

export const Unauthorized: React.FC = () => {
	const navigate = useNavigate();
	return (
		<>
			<Header />
			<DefaultWarning message='Sem autorização para acessar este recurso. Redirecionando...' />
			S{' '}
			{setTimeout(() => {
				navigate('/home');
			}, 3000)}
		</>
	);
};
