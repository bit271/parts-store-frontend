import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CarAdmin from './pages/CarAdmin';
import PartAdmin from './pages/PartAdmin';
import './App.css';
import MainPage from './pages/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin/cars" element={<CarAdmin />} />
        <Route path="/admin/parts" element={<PartAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
