import { API_ROUTES } from '../config/apiConfig';


export const login = async (userEmail: string, userPassword: string) => {
    try {
      const response = await fetch(API_ROUTES.ADMIN_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail, userPassword }),
      });

      if (!response.ok) {
        console.log("Resposta não OK:", response);
        throw new Error('Erro ao fazer login');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Erro ao fazer login');
    }
  };
  