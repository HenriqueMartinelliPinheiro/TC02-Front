const API_BASE_URL = 'http://localhost:3000';

export const API_ROUTES = {
  GET_ALL_EVENTS: `${API_BASE_URL}/getAllEvents`,
  CREATE_EVENT: `${API_BASE_URL}/createEvent`,
  UPDATE_EVENT: (id: number) => `${API_BASE_URL}/updateEvent/${id}`,
  GET_EVENT: (id: number) => `${API_BASE_URL}/getEvent/${id}`,
};
