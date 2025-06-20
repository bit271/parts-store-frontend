// src/features/parts/PartList.jsx
import { useEffect, useState } from 'react';
import { fetchParts } from './partsAPI';
import PartItem from './PartItem';

export default function PartList() {
    const [parts, setParts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchParts()
            .then(data => {
                setParts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка при получении запчастей:', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="p-4">Загрузка...</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 max-w-7xl mx-auto">
            {parts.map(part => (
                <PartItem key={part.id} part={part} />
            ))}
        </div>
    );
}
