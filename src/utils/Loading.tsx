import { Header } from './Header';

export const Loading: React.FC = () => {
	return (
		<>
			<Header />
			<h1 className='loading'>Carregando...</h1>
		</>
	);
};
