import React from 'react';
import { CourseForm } from '../components/forms/CourseForm';
import { Header } from '../utils/Header';

export const CreateCoursePage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="flex bg-gray-100 flex-col items-center justify-center min-h-screen w-128">
        <div className="w-full max-w-md bg-white py-12">
          <h1 className="text-2xl font-bold text-center">Cadastrar Curso</h1>
          <CourseForm />
        </div>
      </div>
    </>
  );
};
