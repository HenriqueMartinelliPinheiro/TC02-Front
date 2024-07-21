import React from 'react';

export const HomePage: React.FC = () => {
  return (
    <> 
      <div className="relative h-screen bg-gray-200">
        <div className="absolute top-0 left-0 w-full bg-gradient-to-l from-green-700 to-green-200 flex items-center p-4">
          <img src="/bannerIFC.png" alt="Banner IFC" className="h-16 w-auto object-contain" />
        </div>
        <div className="flex items-center justify-center h-full">
        <h1 className="text-2xl mb-4">Home Page</h1>
          <div className="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-gradient-to-r from-green-400 to-green-600 text-white py-6 px-4 rounded">Gerenciar Eventos</button>
            <button className="bg-gradient-to-r from-green-400 to-green-600 text-white py-6 px-4 rounded">Cadastrar Eventos</button>
            <button className="bg-gradient-to-r from-green-400 to-green-600 text-white py-6 px-4 rounded">Gerenciar Cursos</button>
            <button className="bg-gradient-to-r from-green-400 to-green-600 text-white py-6 px-4 rounded">Cadastrar Cursos</button>
        </div>

        </div>
      </div>
    </>
  );
}
