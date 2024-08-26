const API_BASE_URL = 'http://localhost:4000';

export const API_ROUTES = {
	ADMIN_LOGIN: `${API_BASE_URL}/loginUser`,
	CREATE_COURSE: `${API_BASE_URL}/createCourse`,
	FETCH_ALL_COURSES: `${API_BASE_URL}/fetchAllCourses`,
	EDIT_COURSE: `${API_BASE_URL}/editCourse`,
	GET_COURSE_BY_ID: `${API_BASE_URL}/getCourse`,
	FETCH_ALL_ROLES: `${API_BASE_URL}/fetchAllRoles`,
	CREATE_USER: `${API_BASE_URL}/createUser`,
	FETCH_ALL_USERS: `${API_BASE_URL}/fetchAllUsers`,
	CREATE_EVENT: `${API_BASE_URL}/createEvent`,
	FETCH_STATUS_OPTIONS: `${API_BASE_URL}/fetchAllEventStatusOptions`,
	FETCH_ALL_EVENTS: `${API_BASE_URL}/fetchAllEvents`,
};
