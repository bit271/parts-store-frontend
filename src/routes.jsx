import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PartsPage from './pages/PartsPage';
import AdminAddCarPage from './pages/AdminAddCarPage';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/parts" element={<PartsPage />} />
                <Route path="/admin/cars/add" element={<AdminAddCarPage />} />
            </Routes>
        </BrowserRouter>
    );
}