// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Header} from './utils/Header';
import {EventPage} from './pages/EventPage';
import {CreateEventPage} from './pages/CreateEventPage';
import { EditEventPage } from './pages/EditEventPage';

function App() {
  return (
    <Router>
      <Header />
      <div className="p-4">
        <Routes>
          <Route path="/eventos" element={<EventPage />} />
          <Route path='/cadastrarEvento' element={<CreateEventPage/>}/>
          <Route path='/editarEvento' element={<EditEventPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
