import React, { useState } from 'react';
import InputField from '../forms/components/InputField';
import { createCourse } from '../../services/createCourse';

interface CourseFormProps {
  initialData?: { id?: number; name: string; coordinatorEmail: string; status: number };
}

export const CourseForm: React.FC<CourseFormProps> = ({ initialData }) => {
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
        <InputField 
          label="Nome do Curso"
          type='text' 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          id="course-name" 
        />

        <InputField
          type='text' 
          label="Email do Coordenador" 
          value={coordinatorEmail} 
          onChange={(e) => setCoordinatorEmail(e.target.value)} 
          id="coordinator-email" 
        />

        <button 
          type="submit" 
          className="my-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
          Cadastrar Curso
        </button>

        {message && (
          <div className={`my-4 text-center ${message.includes('sucesso') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};
