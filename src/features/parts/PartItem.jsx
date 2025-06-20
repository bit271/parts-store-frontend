export default function PartItem({ part }) {
    return (
        <div className="border rounded-xl p-4 shadow hover:shadow-md transition">
            <img
                src={`/images/${part.image}`} // если сервится с public/images/
                alt={part.name}
                className="h-40 object-contain mb-3"
            />
            <h2 className="text-xl font-semibold">{part.name}</h2>
            <p className="text-gray-600">Каталожный №: {part.catalogNum}</p>
            <p className="text-gray-600">Категория: {part.categoryName}</p>
            <p className="text-gray-600">Авто: {part.carName}</p>
            <p className="text-gray-800 mt-2">{part.description}</p>
            <p className="text-lg font-bold mt-2">{part.price} грн</p>
            <p className={`mt-1 ${part.availableCount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                В наличии: {part.availableCount}
            </p>
        </div>
    );
}