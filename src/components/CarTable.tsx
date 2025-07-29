import { Button } from "@/components/ui/button"

interface Car {
    id: number
    name: string
    year: number
    brandName: string
    modelName: string
    imageUrl: string
}

interface Props {
    cars: Car[]
    onDelete: (id: number) => void
}

export default function CarTable({ cars, onDelete }: Props) {
    return (
        <div className="mt-10 p-4">
            <h2 className="text-xl font-bold mb-2">Список машин</h2>
            <table className="w-full text-left border rounded-md overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2">ID</th>
                        <th className="p-2">Название</th>
                        <th className="p-2">Год</th>
                        <th className="p-2">Бренд</th>
                        <th className="p-2">Модель</th>
                        <th className="p-2">Фото</th>
                        <th className="p-2">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map(car => (
                        <tr key={car.id} className="border-t">
                            <td className="p-2">{car.id}</td>
                            <td className="p-2">{car.name}</td>
                            <td className="p-2">{car.year}</td>
                            <td className="p-2">{car.brandName}</td>
                            <td className="p-2">{car.modelName}</td>
                            <td className="p-2">
                                <img src={car.imageUrl} alt={car.name} className="h-12 rounded" />
                            </td>
                            <td className="p-2">
                                <Button variant="destructive" onClick={() => onDelete(car.id)}>
                                    Удалить
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
