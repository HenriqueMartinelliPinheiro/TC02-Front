import React, { useState } from 'react';
import { Input} from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';

import { createCourse } from '../services/course/createCourseServices';
import { Header } from '../utils/Header';

export const CreateCoursePage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen w-128">
        <div className="w-full max-w-md py-12 px-4 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Cadastrar Curso</h2>
          <CourseForm />
        </div>
      </div>
    </>
  );
};

interface CourseFormProps {
  initialData?: { id?: number; name: string; coordinatorEmail: string; status: number };
}

const CourseForm: React.FC<CourseFormProps> = ({ initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [coordinatorEmail, setCoordinatorEmail] = useState(initialData?.coordinatorEmail || '');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCourse(name, coordinatorEmail);
      setMessage('Curso criado com sucesso!');
      setCoordinatorEmail("");
      setName("");
    } catch (error) {
      setMessage('Erro ao criar o curso. Tente novamente.');
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          {message && (
            <Alert 
              className={`my-4 text-center ${message.includes('sucesso') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </Alert>
          )}
          <label htmlFor="course-name" className="block text-sm font-medium text-gray-700">Nome do Curso</label>
          <Input 
            type='text' 
            id="course-name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="mt-1 block w-full" 
          />
        </div>

        <div className="mb-4">
          <label htmlFor="coordinator-email" className="block text-sm font-medium text-gray-700">Email do Coordenador</label>
          <Input 
            type='text' 
            id="coordinator-email" 
            value={coordinatorEmail} 
            onChange={(e) => setCoordinatorEmail(e.target.value)} 
            className="mt-1 block w-full" 
          />
        </div>

        <Button 
          type="submit" 
          className="my-4 w-full bg-green-500 py-2 px-4 rounded-lg hover:bg-green-700">
          Cadastrar Curso
        </Button>
     
      </form>
    </div>
  );
};