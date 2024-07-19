import React, { useState } from 'react';
import Input from '../components/login/Input';
import { login } from '../services/loginService';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const data = await login(username, password);
      // Redirecionar ou realizar outras ações após o login bem-sucedido
    } catch (err) {
      setError('Nome de usuário ou senha incorretos');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded shadow">
        <h2 className="text-2xl mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuário"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />
        <button type="submit" className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
