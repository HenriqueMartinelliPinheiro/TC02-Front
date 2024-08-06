import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import PrivateRoute from './utils/PrivateRoute';
import { HomePage } from './pages/HomePage';
import { CreateCoursePage } from './pages/CreateCoursePage';
import { Loading } from './utils/Loading';
import ListCoursesPage from './pages/ListCoursePage';
import { EditCoursePage } from './pages/EditCoursePage';

// import { ListCoursesPage } from './pages/ListCoursePage';

const App: React.FC = () => {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path='/login' element={<LoginPage />} />
					<Route path='/loading' element={<Loading />} />
					<Route element={<PrivateRoute />}>
						<Route path='/home' element={<HomePage />} />
						<Route path='/cadastrarCurso' element={<CreateCoursePage />} />
						<Route path='/cursos' element={<ListCoursesPage />} />
						<Route path='/editarCurso/:courseId' element={<EditCoursePage />} />
					</Route>
				</Routes>
			</Router>
		</AuthProvider>
	);
};

export default App;
