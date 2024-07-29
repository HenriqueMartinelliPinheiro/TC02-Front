import React, { useState } from 'react';
import InputField from '../components/forms/components/InputField';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await login(username, password);
      navigate('/home');
    } catch (err) {
      setError('Nome de usuário ou senha incorretos');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <InputField
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Email"
          id="username"
        />
        <InputField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          id="password"
        />
        <button type="submit" className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
