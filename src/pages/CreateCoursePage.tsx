import { Header } from '../utils/Header';
import { CourseForm } from '@/components/ui/forms/courseForm';

export const CreateCoursePage: React.FC = () => {
	return (
		<>
			<Header />
			<div className='flex items-center justify-center h-screen'>
				<div className='w-full max-w-md mx-auto p-8 rounded shadow-lg bg-card text-card-foreground dark:bg-card dark:text-card-foreground'>
					<h2 className='text-2xl font-bold text-center mb-6'>Cadastrar Curso</h2>
					<CourseForm />
				</div>
			</div>
		</>
	);
};
