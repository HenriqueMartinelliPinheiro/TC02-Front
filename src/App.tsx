import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import PrivateRoute from './utils/PrivateRoute';
import { HomePage } from './pages/HomePage';
import { CreateCoursePage } from './pages/CreateCoursePage';
import { ThemeProvider } from '@/components/theme-provider';
import { Loading } from './utils/loading';

// import { ListCoursesPage } from './pages/ListCoursePage';

const App: React.FC = () => {
	return (
		<ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
			<AuthProvider>
				<Router>
					<Routes>
						<Route path='/login' element={<LoginPage />} />
						<Route path='/loading' element={<Loading />} />
						<Route element={<PrivateRoute />}>
							<Route path='/home' element={<HomePage />} />
							<Route path='/cadastrarCurso' element={<CreateCoursePage />} />
						</Route>
					</Routes>
				</Router>
			</AuthProvider>
		</ThemeProvider>
	);
};

export default App;
