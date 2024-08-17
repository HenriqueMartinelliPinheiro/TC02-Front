import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './pages/user/LoginPage';
import PrivateRoute from './utils/PrivateRoute';
import { HomePage } from './pages/HomePage';
import { CreateCoursePage } from './pages/course/CreateCoursePage';
import { DefaultWarning } from './utils/DefaultWarning';
import ListCoursesPage from './pages/course/ListCoursePage';
import { EditCoursePage } from './pages/course/EditCoursePage';
import { CourseProvider } from './context/CourseContext';
import { CreateUserPage } from './pages/user/CreateUserPage';
import { ListUsersPage } from './pages/user/ListUsersPage';
import { roles } from './config/RoleRoutes';
import { Unauthorized } from './utils/Unauthorized';
import { CreateEventPage } from './pages/event/CreateEventPage';

const App: React.FC = () => {
	return (
		<AuthProvider>
			<CourseProvider>
				<Router>
					<Routes>
						<Route path='/login' element={<LoginPage />} />
						<Route
							path='/loading'
							element={<DefaultWarning message='Carregando, Aguarde...' />}
						/>
						<Route path='/unauthorized' element={<Unauthorized />} />

						<Route element={<PrivateRoute roles={roles.HOME_PAGE_ROLES} />}>
							<Route path='/home' element={<HomePage />} />
							<Route path='/' element={<HomePage />} />
						</Route>

						<Route element={<PrivateRoute roles={roles.CREATE_COURSE_ROLES} />}>
							<Route path='/cadastrarCurso' element={<CreateCoursePage />} />
						</Route>

						<Route element={<PrivateRoute roles={roles.LIST_COURSES_ROLES} />}>
							<Route path='/cursos' element={<ListCoursesPage />} />
						</Route>

						<Route element={<PrivateRoute roles={roles.EDIT_COURSE_ROLES} />}>
							<Route path='/editarCurso/:courseId' element={<EditCoursePage />} />
						</Route>

						<Route element={<PrivateRoute roles={roles.CREATE_USER_ROLES} />}>
							<Route path='/cadastrarUsuario' element={<CreateUserPage />} />
						</Route>

						<Route element={<PrivateRoute roles={roles.LIST_USERS_ROLES} />}>
							<Route path='/usuarios' element={<ListUsersPage />} />
						</Route>

						<Route element={<PrivateRoute roles={roles.CREATE_EVENT_ROLES} />}>
							<Route path='/cadastrarEvento' element={<CreateEventPage />} />
						</Route>
					</Routes>
				</Router>
			</CourseProvider>
		</AuthProvider>
	);
};

export default App;
