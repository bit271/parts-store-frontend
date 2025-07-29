import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getBrands, addBrand, deleteBrand } from "@/api/api"

interface Brand {
    id: number
    name: string
}

interface Props {
    selectedId: number | null
    onChange: (id: number | null) => void
}

export default function BrandSelect({ selectedId, onChange }: Props) {
    const [brands, setBrands] = useState<Brand[]>([])
    const [newBrand, setNewBrand] = useState("")
    const [loading, setLoading] = useState(false)

    const fetchBrands = async () => {
        try {
            const res = await getBrands()
            console.log("brands API response:", res.data)
            setBrands(res.data) // ожидается массив
        } catch (e) {
            alert("Ошибка при загрузке брендов")
            console.error(e)
        }
    }


    useEffect(() => {
        fetchBrands()
    }, [])

    const handleAdd = async () => {
        if (!newBrand.trim()) return
        setLoading(true)
        try {
            const res = await addBrand(newBrand.trim())
            setBrands([...brands, res.data])
            setNewBrand("")
            onChange(res.data.id)
        } catch {
            alert("Ошибка при добавлении бренда")
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Удалить бренд?")) return
        try {
            await deleteBrand(id)
            setBrands(brands.filter(b => b.id !== id))
            if (selectedId === id) onChange(null)
        } catch {
            alert("Ошибка при удалении бренда")
        }
    }

    return (
        <div>
            <Label>Бренд</Label>
            <select
                className="block w-full p-2 border rounded"
                value={selectedId ?? ""}
                onChange={e => onChange(e.target.value ? +e.target.value : null)}
            >
                <option value="">Выберите бренд</option>
                {brands.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                ))}
            </select>

            <div className="flex gap-2 mt-2">
                <Input
                    placeholder="Новый бренд"
                    value={newBrand}
                    onChange={e => setNewBrand(e.target.value)}
                    disabled={loading}
                />
                <Button onClick={handleAdd} disabled={loading}>
                    Добавить
                </Button>
            </div>

            <div className="mt-2 space-x-2">
                {brands.map(b => (
                    <button
                        key={b.id}
                        onClick={() => handleDelete(b.id)}
                        className="text-sm text-red-600 hover:underline"
                        type="button"
                        disabled={loading}
                    >
                        Удалить {b.name}
                    </button>
                ))}
            </div>
        </div>
    )
}
