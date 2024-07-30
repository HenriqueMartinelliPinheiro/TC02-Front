import React from 'react';
import { CreateButton, EditButton, ViewButton } from '../../../utils/ActionButton';

interface Course {
  id: number;
  name: string;
  coordinatorEmail: string;
}

interface CourseTableProps {
  courses: Course[];
  onCreate: () => void;
  onEdit: (id: number) => void;
  onView: (id: number) => void;

}

export const CourseTable: React.FC<CourseTableProps> = ({ courses, onCreate, onEdit, onView }) => {
  return (
    <div>
      <CreateButton onClick={onCreate} />
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nome do Curso
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email do Coordenador
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {courses.map((course) => (
            <tr key={course.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.coordinatorEmail}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <EditButton onClick={() => onEdit(course.id)} />
                <ViewButton onClick={() => onView(course.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
