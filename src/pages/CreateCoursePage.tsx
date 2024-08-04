import { Header } from '../utils/Header';
import { CourseForm } from '@/components/forms/CourseForm';

export const CreateCoursePage: React.FC = () => {
	return (
		<>
			<Header />
			<div className='flex items-center justify-center h-screen'>
				<div className='w-full max-w-md mx-auto p-8 rounded shadow-lg bg-card text-card-foreground dark:bg-card dark:text-card-foreground'>
					<h2 className='my-5 text-center'>Cadastrar Curso</h2>
					<CourseForm />
				</div>
			</div>
		</>
	);
};
