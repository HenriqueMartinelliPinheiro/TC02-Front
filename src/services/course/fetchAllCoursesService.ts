import { API_ROUTES } from "../../config/apiConfig";
import { updateTokens } from "../login/updateTokens";

export const courseService = {
  fetchAllCourses: async () => {
    try {
      const accessToken = localStorage.getItem('accessToken') ?? '';

      const response = await fetch(API_ROUTES.CREATE_COURSE, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      updateTokens(response);

      const data = await response.json();
      return data.courses;
    } catch (error) {
      throw error;
    }
  },
};
