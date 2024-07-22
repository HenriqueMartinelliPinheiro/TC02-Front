import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {

  const navigate = useNavigate();

  return (
    <> 
      <div className="relative h-screen bg-gray-200">
        <div className="absolute top-0 left-0 w-full bg-gradient-to-l from-green-700 to-green-200 flex items-center p-4">
          <img src="/bannerIFC.png" alt="Banner IFC" className="h-16 w-auto object-contain" />
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <div className='mb-12'>
            <h1 className="text-2xl">Gerenciar Eventos</h1>
          </div>
          <div className="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-600 hover:to-green-900 text-white py-6 px-4 rounded hover:bg-green-900"
              onClick={()=>navigate('/eventos')}>Gerenciar Evento</button>

              <button className="bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-600 hover:to-green-900 py-6 px-4 rounded"
              onClick={()=>navigate('/cadastrarEvento')}>Cadastrar Eventos</button>

              <button className="bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-600 hover:to-green-900 py-6 px-4 rounded"
              onClick={()=>navigate('/cursos')}>Gerenciar Cursos</button>

              <button className="bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-600 hover:to-green-900 py-6 px-4 rounded"
              onClick={()=>navigate('/cadastrarCurso')}>Cadastrar Cursos</button>
          </div>
        </div>
      </div>
    </>
  );
}
