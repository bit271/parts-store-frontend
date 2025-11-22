import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CarAdmin from './pages/CarAdmin';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/cars" element={<CarAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
