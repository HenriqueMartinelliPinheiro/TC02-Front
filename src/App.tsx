import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './utils/Header';
import { EventPage } from './pages/EventPage';
import { CreateEventPage } from './pages/CreateEventPage';
import { EditEventPage } from './pages/EditEventPage';
import LoginPage from './pages/LoginPage';

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && <Header />}
      <div className="p-4">
        <Routes>
          <Route path="/eventos" element={<EventPage />} />
          <Route path='/cadastrarEvento' element={<CreateEventPage />} />
          <Route path='/editarEvento' element={<EditEventPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
