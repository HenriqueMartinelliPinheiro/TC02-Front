import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './pages/user/LoginPage';
import PrivateRoute from './utils/PrivateRoute';
import { HomePage } from './pages/HomePage';
import { CreateCoursePage } from './pages/course/CreateCoursePage';
import { Loading } from './utils/Loading';
import ListCoursesPage from './pages/course/ListCoursePage';
import { EditCoursePage } from './pages/course/EditCoursePage';
import { CourseProvider } from './context/CourseContext';
import { CreateUserPage } from './pages/user/CreateUserPage';
import { ListUsersPage } from './pages/user/ListUsersPage';

const App: React.FC = () => {
	return (
		<AuthProvider>
			<CourseProvider>
				<Router>
					<Routes>
						<Route path='/login' element={<LoginPage />} />
						<Route path='/loading' element={<Loading />} />
						<Route element={<PrivateRoute />}>
							<Route path='/' element={<HomePage />}></Route>
							<Route path='/home' element={<HomePage />} />
							<Route path='/cadastrarCurso' element={<CreateCoursePage />} />
							<Route path='/cursos' element={<ListCoursesPage />} />
							<Route path='/editarCurso/:courseId' element={<EditCoursePage />} />
							<Route path='/cadastrarUsuario' element={<CreateUserPage />} />
							<Route path='/usuarios' element={<ListUsersPage />} />
						</Route>
					</Routes>
				</Router>
			</CourseProvider>
		</AuthProvider>
	);
};

export default App;
