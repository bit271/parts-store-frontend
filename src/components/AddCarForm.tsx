import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import ImageUploader from "./ImageUploader"
import BrandSelect from "./BrandSelect"
import ModelSelect from "./ModelSelect"
import { addCar, getCars, deleteCar } from "@/api/api"
import CarTable from "./CarTable"

interface Car {
    id: number
    name: string
    year: number
    brandName: string
    modelName: string
    imageUrl: string
}

export default function AddCarForm() {
    const [name, setName] = useState("")
    const [year, setYear] = useState("")
    const [brandId, setBrandId] = useState<number | null>(null)
    const [modelId, setModelId] = useState<number | null>(null)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [cars, setCars] = useState<Car[]>([])
    const [loading, setLoading] = useState(false)

    const fetchCars = async () => {
        try {
            const res = await getCars()
            setCars(res.data)
        } catch {
            alert("Ошибка загрузки машин")
        }
    }

    useEffect(() => {
        fetchCars()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!brandId || !modelId) {
            alert("Выберите бренд и модель")
            return
        }
        if (!imageFile) {
            alert("Загрузите фото")
            return
        }

        const formData = new FormData()
        formData.append("name", name)
        formData.append("year", year)
        formData.append("brandId", brandId.toString())
        formData.append("modelId", modelId.toString())
        formData.append("image", imageFile)

        setLoading(true)
        try {
            await addCar(formData)
            alert("Машина добавлена")
            setName("")
            setYear("")
            setBrandId(null)
            setModelId(null)
            setImageFile(null)
            fetchCars()
        } catch {
            alert("Ошибка при добавлении машины")
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteCar = async (id: number) => {
        if (!confirm("Удалить машину?")) return
        try {
            await deleteCar(id)
            setCars(cars.filter(c => c.id !== id))
        } catch {
            alert("Ошибка при удалении машины")
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded-xl border shadow-md max-w-2xl mx-auto">
                <div>
                    <Label>Название</Label>
                    <Input value={name} onChange={e => setName(e.target.value)} required disabled={loading} />
                </div>
                <div>
                    <Label>Год выпуска</Label>
                    <Input type="number" value={year} onChange={e => setYear(e.target.value)} required disabled={loading} />
                </div>
                <div>
                    <BrandSelect selectedId={brandId} onChange={setBrandId} />
                </div>
                <div>
                    <ModelSelect selectedId={modelId} onChange={setModelId} />
                </div>
                <div>
                    <ImageUploader image={imageFile} onImageChange={setImageFile} />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>Добавить машину</Button>
            </form>

            <CarTable cars={cars} onDelete={handleDeleteCar} />
        </div>
    )
}
