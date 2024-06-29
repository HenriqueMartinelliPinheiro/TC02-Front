import React from 'react';
import { useFormEvent } from '../../hooks/useFormEvent';
import Alert from '../../utils/Alert';
import InputField from './InputField';
import SelectField from './SelectField';

interface StatusOption {
  value: number;
  label: string;
}

const statusOptions: StatusOption[] = [
  { value: 0, label: 'Não Iniciado' },
  { value: 1, label: 'Iniciado' },
  { value: 2, label: 'Em Andamento' },
  { value: 3, label: 'Encerrado' },
  { value: 4, label: 'Cancelado' }
];

interface FormEventProps {
  initialData?: { id?: number; name: string; status: number };
}

export const FormEvent: React.FC<FormEventProps> = ({ initialData }) => {
  const {
    name,
    setName,
    status,
    setStatus,
    showAlert,
    alertMessage,
    handleSubmit,
    handleCloseAlert,
  } = useFormEvent({ initialData });

  return (
    <div className="max-w-sm mx-auto">
      {showAlert && (
        <Alert
          message={alertMessage}
          onClose={handleCloseAlert}
        />
      )}
      <form onSubmit={handleSubmit}>
        <InputField
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
        />
        <SelectField
          label="Status"
          value={status}
          onChange={(e) => setStatus(Number(e.target.value))}
          options={statusOptions}
          id="status"
        />
        <button
          type="submit"
          className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800"
        >
          {initialData?.id ? 'Atualizar Evento' : 'Cadastrar Evento'}
        </button>
      </form>
    </div>
  );
};
