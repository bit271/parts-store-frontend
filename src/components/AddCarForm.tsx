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
    const [searchQuery, setSearchQuery] = useState("")
    const [brandSearch, setBrandSearch] = useState("")
    const [modelSearch, setModelSearch] = useState("")

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

    const filteredCars = cars.filter((car) =>
        `${car.brandName} ${car.modelName} ${car.year}`.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const filteredBrands = brands.filter((b) =>
        b.name.toLowerCase().includes(brandSearch.toLowerCase())
    )

    const filteredModels = models.filter((m) =>
        m.name.toLowerCase().includes(modelSearch.toLowerCase())
    )

    return (
        <div className="grid gap-6 max-w-screen-xl mx-auto p-4">
            <h2 className="text-2xl font-semibold">Добавление авто</h2>
            <Card>
                <CardContent className="space-y-6 pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <Label>Поиск бренда</Label>
                                <Input value={brandSearch} onChange={(e) => setBrandSearch(e.target.value)} placeholder="Поиск..." />
                                <Label className="mt-2">Бренд</Label>
                                <ScrollArea className="h-48 border rounded-md">
                                    <ul>
                                        {filteredBrands.map((b) => (
                                            <li
                                                key={b.id}
                                                className={`px-2 py-1 cursor-pointer ${selectedBrandId === b.id ? "bg-blue-100" : ""}`}
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
                                <Label>Поиск модели</Label>
                                <Input value={modelSearch} onChange={(e) => setModelSearch(e.target.value)} placeholder="Поиск..." />
                                <Label className="mt-2">Модель</Label>
                                <ScrollArea className="h-48 border rounded-md">
                                    <ul>
                                        {filteredModels.map((m) => (
                                            <li
                                                key={m.id}
                                                className={`px-2 py-1 cursor-pointer ${selectedModelId === m.id ? "bg-blue-100" : ""}`}
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

                            <div className="space-y-4">
                                <div>
                                    <Label>Год выпуска</Label>
                                    <Input
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        type="number"
                                    />
                                </div>
                                <div>
                                    <Label>Описание</Label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full border rounded-md p-2 resize-y min-h-[100px]"
                                        placeholder="Введите описание..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <Label>Изображение</Label>
                            <div className="mt-1 flex items-center gap-4">
                                <label
                                    htmlFor="image-upload"
                                    className="cursor-pointer rounded-md border border-dashed border-gray-400 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 transition"
                                >
                                    Выбрать файл
                                </label>
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    ref={imageInputRef}
                                    className="hidden"
                                />
                                {imageFile && (
                                    <span className="text-sm text-gray-700 truncate max-w-xs" title={imageFile.name}>
                                        {imageFile.name}
                                    </span>
                                )}
                            </div>
                            {imagePreview && (
                                <div className="mt-4 w-full max-w-3xl h-auto border rounded-xl overflow-hidden shadow-md">
                                    <img
                                        src={imagePreview}
                                        alt="preview"
                                        className="w-full h-auto object-contain bg-white"
                                    />
                                </div>
                            )}
                        </div>
                        <Button type="submit">Добавить</Button>
                    </form>
                </CardContent>
            </Card>

            <div>
                <h3 className="text-xl font-semibold mt-6">Список автомобилей</h3>
                <Input
                    className="my-2"
                    placeholder="Поиск по названию, бренду или году..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <ScrollArea className="h-64 border rounded-md">
                    <ul>
                        {filteredCars.map((car) => (
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
                            className="max-h-72 w-auto rounded border"
                        />
                        <Button variant="destructive" onClick={() => handleDeleteCar(selectedCar.id)}>
                            Удалить
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
