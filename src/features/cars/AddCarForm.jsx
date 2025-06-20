// src/features/cars/AddCarForm.jsx
import { useEffect, useState } from 'react';
import { fetchBrands, fetchModels, createCar } from './carsAPI';

export default function AddCarForm() {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [image, setImage] = useState('');
    const [brandId, setBrandId] = useState('');
    const [modelId, setModelId] = useState('');
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchBrands().then(setBrands);
        fetchModels().then(setModels);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const car = {
            name,
            year: parseInt(year),
            image,
            brandId: parseInt(brandId),
            modelId: parseInt(modelId),
        };

        try {
            await createCar(car);
            setSuccessMessage('Машина успешно добавлена!');
            setName('');
            setYear('');
            setImage('');
            setBrandId('');
            setModelId('');
        } catch (err) {
            alert('Ошибка при добавлении машины');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 border rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4">Добавить новую машину</h2>

            {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}

            <label className="block mb-2">
                Имя:
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="w-full border px-3 py-2 mt-1 rounded"
                />
            </label>

            <label className="block mb-2">
                Год выпуска:
                <input
                    type="number"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    required
                    className="w-full border px-3 py-2 mt-1 rounded"
                />
            </label>

            <label className="block mb-2">
                Бренд:
                <select
                    value={brandId}
                    onChange={e => setBrandId(e.target.value)}
                    required
                    className="w-full border px-3 py-2 mt-1 rounded"
                >
                    <option value="">Выберите бренд</option>
                    {brands.map(brand => (
                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
                </select>
            </label>

            <label className="block mb-2">
                Модель:
                <select
                    value={modelId}
                    onChange={e => setModelId(e.target.value)}
                    required
                    className="w-full border px-3 py-2 mt-1 rounded"
                >
                    <option value="">Выберите модель</option>
                    {models.map(model => (
                        <option key={model.id} value={model.id}>{model.name}</option>
                    ))}
                </select>
            </label>

            <label className="block mb-4">
                Ссылка на изображение:
                <input
                    type="text"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    className="w-full border px-3 py-2 mt-1 rounded"
                />
            </label>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Добавить
            </button>
        </form>
    );
}
