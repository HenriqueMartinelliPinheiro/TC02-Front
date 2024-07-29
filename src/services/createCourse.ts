import { API_ROUTES } from "../config/apiConfig";

export const createCourse = async (courseName: string, courseCoordinatorEmail: string) => {
  try {
    const accessToken = localStorage.getItem('accessToken') ?? '';
    const refreshToken = localStorage.getItem('refreshToken') ?? '';

    const response = await fetch(API_ROUTES.CREATE_COURSE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': accessToken,
        'x-refresh-token': refreshToken
      },
      body: JSON.stringify({
        courseName,
        courseCoordinatorEmail,
        requestEmail: localStorage.getItem('userEmail'),
      })
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};
