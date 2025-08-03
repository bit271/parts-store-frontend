import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    getBrands,
    getModels,
    getCars,
    addCar,
    deleteCar,
    addBrand,
    deleteBrand,
    addModel,
    deleteModel,
} from "@/api/api"

interface BrandModel {
    id: number
    name: string
}

interface Car {
    id: number
    year: number
    brandName: string
    modelName: string
    dateAdd: string
    description: string
    imageName: string
}

export default function AddCarForm() {
    const [description, setDescription] = useState("")
    const [year, setYear] = useState("")
    const [brands, setBrands] = useState<BrandModel[]>([])
    const [models, setModels] = useState<BrandModel[]>([])
    const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null)
    const [selectedModelId, setSelectedModelId] = useState<number | null>(null)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>("")
    const [cars, setCars] = useState<Car[]>([])
    const [selectedCarId, setSelectedCarId] = useState<number | null>(null)
    const [newBrandName, setNewBrandName] = useState("")
    const [newModelName, setNewModelName] = useState("")

    const imageInputRef = useRef<HTMLInputElement>(null)
    const selectedCar = cars.find((car) => car.id === selectedCarId)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const [brandsRes, modelsRes, carsRes] = await Promise.all([
            getBrands(),
            getModels(),
            getCars(),
        ])
        setBrands(brandsRes.data)
        setModels(modelsRes.data)
        setCars(carsRes.data)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!description || !year || !selectedBrandId || !selectedModelId || !imageFile) return

        const formData = new FormData()
        formData.append("description", description)
        formData.append("year", year)
        formData.append("brandId", selectedBrandId.toString())
        formData.append("modelId", selectedModelId.toString())
        formData.append("image", imageFile)

        await addCar(formData)
        await fetchData()
        setDescription("")
        setYear("")
        setSelectedBrandId(null)
        setSelectedModelId(null)
        setImageFile(null)
        setImagePreview("")
        if (imageInputRef.current) imageInputRef.current.value = ""
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImageFile(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const handleDeleteBrand = async () => {
        if (selectedBrandId) {
            await deleteBrand(selectedBrandId)
            await fetchData()
            setSelectedBrandId(null)
        }
    }

    const handleDeleteModel = async () => {
        if (selectedModelId) {
            await deleteModel(selectedModelId)
            await fetchData()
            setSelectedModelId(null)
        }
    }

    const handleDeleteCar = async (carId: number) => {
        await deleteCar(carId)
        await fetchData()
        setSelectedCarId(null)
    }

    const handleAddBrand = async () => {
        if (!newBrandName.trim()) return
        await addBrand(newBrandName)
        await fetchData()
        setNewBrandName("")
    }

    const handleAddModel = async () => {
        if (!newModelName.trim()) return
        await addModel(newModelName)
        await fetchData()
        setNewModelName("")
    }

    return (
        <div className="grid gap-6 max-w-6xl mx-auto p-4">
            <h2 className="text-2xl font-semibold">Добавление авто</h2>
            <Card>
                <CardContent className="space-y-4 pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label>Описание</Label>
                            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div>
                            <Label>Год выпуска</Label>
                            <Input
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                type="number"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Бренд</Label>
                                <ScrollArea className="h-32 border rounded-md">
                                    <ul>
                                        {brands.map((b) => (
                                            <li
                                                key={b.id}
                                                className={`px-2 py-1 cursor-pointer ${selectedBrandId === b.id ? "bg-blue-100" : ""
                                                    }`}
                                                onClick={() => setSelectedBrandId(b.id)}
                                            >
                                                {b.name}
                                            </li>
                                        ))}
                                    </ul>
                                </ScrollArea>
                                <div className="flex gap-2 mt-2">
                                    <Input
                                        placeholder="Новый бренд"
                                        value={newBrandName}
                                        onChange={(e) => setNewBrandName(e.target.value)}
                                    />
                                    <Button onClick={handleAddBrand} type="button">
                                        Добавить
                                    </Button>
                                </div>
                                <Button
                                    variant="destructive"
                                    className="mt-2"
                                    onClick={handleDeleteBrand}
                                    type="button"
                                >
                                    Удалить выбранный бренд
                                </Button>
                            </div>

                            <div>
                                <Label>Модель</Label>
                                <ScrollArea className="h-32 border rounded-md">
                                    <ul>
                                        {models.map((m) => (
                                            <li
                                                key={m.id}
                                                className={`px-2 py-1 cursor-pointer ${selectedModelId === m.id ? "bg-blue-100" : ""
                                                    }`}
                                                onClick={() => setSelectedModelId(m.id)}
                                            >
                                                {m.name}
                                            </li>
                                        ))}
                                    </ul>
                                </ScrollArea>
                                <div className="flex gap-2 mt-2">
                                    <Input
                                        placeholder="Новая модель"
                                        value={newModelName}
                                        onChange={(e) => setNewModelName(e.target.value)}
                                    />
                                    <Button onClick={handleAddModel} type="button">
                                        Добавить
                                    </Button>
                                </div>
                                <Button
                                    variant="destructive"
                                    className="mt-2"
                                    onClick={handleDeleteModel}
                                    type="button"
                                >
                                    Удалить выбранную модель
                                </Button>
                            </div>
                        </div>

                        <div>
                            <Label>Изображение</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={imageInputRef}
                            />
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="preview"
                                    className="h-32 mt-2 rounded"
                                />
                            )}
                        </div>

                        <Button type="submit">Добавить</Button>
                    </form>
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <h3 className="text-xl font-semibold mt-6">Список автомобилей</h3>
                    <ScrollArea className="h-64 border rounded-md mt-2">
                        <ul>
                            {cars.map((car) => (
                                <li
                                    key={car.id}
                                    onClick={() => setSelectedCarId(car.id)}
                                    className={`px-3 py-2 border-b cursor-pointer hover:bg-gray-100 ${selectedCarId === car.id ? "bg-blue-100" : ""}`}
                                >
                                    <div className="font-medium">{car.brandName} {car.modelName}</div>
                                    <div className="text-sm text-gray-500">Год: {car.year}</div>
                                    <div className="text-sm text-gray-400">Добавлено: {car.dateAdd}</div>
                                </li>
                            ))}
                        </ul>
                    </ScrollArea>
                </div>

                {selectedCar && (
                    <div className="space-y-4 mt-6">
                        <h4 className="text-xl font-semibold">Информация о машине</h4>
                        <div><strong>Марка:</strong> {selectedCar.brandName}</div>
                        <div><strong>Модель:</strong> {selectedCar.modelName}</div>
                        <div><strong>Год:</strong> {selectedCar.year}</div>
                        <div><strong>Дата добавления:</strong> {selectedCar.dateAdd}</div>
                        <div><strong>Описание:</strong> {selectedCar.description}</div>
                        <img
                            src={`${import.meta.env.VITE_API_BASE_URL}/uploads/cars/${selectedCar.imageName}`}
                            alt="preview"
                            className="h-48 rounded border"
                        />
                        <Button
                            variant="destructive"
                            onClick={() => handleDeleteCar(selectedCar.id)}
                        >
                            Удалить
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
