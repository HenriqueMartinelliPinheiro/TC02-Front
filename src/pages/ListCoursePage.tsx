// import React, { useState, useEffect } from 'react';
// import { CourseTable } from '../components/table/course/courseTable';
// import { NavigateButton } from '../utils/NavigateButton';
// import { courseService } from '../services/course/fetchAllCoursesService'; // Certifique-se de que o caminho está correto

// interface Course {
//   id: number;
//   name: string;
//   coordinatorEmail: string;
// }

// export const ListCoursesPage: React.FC = () => {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const courses = await courseService.fetchAllCourses();
//         setCourses(courses);
//         setLoading(false);
//       } catch (err) {
//         setError('Erro ao buscar cursos');
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   const handleCreate = () => {
   
//   };

//   const handleEdit = (id: number) => {
   
//   };

//   const handleView = (id: number) => {
   
//   };

//   if (loading) {
//     return <p>Carregando...</p>;
//   }

//   if (error) {
//     return <p>Erro: {error}</p>;
//   }

//   return (
//     <div>
//       <h1 className="text-2xl bg-blue-200 my-4 px-4 py-2 rounded-lg">Cursos</h1>
//       <CourseTable courses={courses} onCreate={handleCreate} onEdit={handleEdit} onView={handleView} />
//       <NavigateButton route="/cadastrarCurso" buttonText="Cadastrar Curso" />
//     </div>
//   );
// };
