import React, { useState } from 'react';
import { Input} from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
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
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto bg-white p-8 rounded shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          {error && <Alert className="mb-4 text-red-600">{error}</Alert>}
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Email"
            id="username"
            className="mb-4"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            id="password"
            className="mb-4"
          />
          <Button type="submit" className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700">
            Entrar
          </Button>
        </form>
      </div>
    </>
  );
};