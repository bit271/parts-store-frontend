import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CarAdmin from './pages/CarAdmin';
import PartAdmin from './pages/PartAdmin';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/cars" element={<CarAdmin />} />
        <Route path="/admin/parts" element={<PartAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
