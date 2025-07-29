import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getModels, addModel, deleteModel } from "@/api/api"

interface Model {
    id: number
    name: string
}

interface Props {
    selectedId: number | null
    onChange: (id: number | null) => void
}

export default function ModelSelect({ selectedId, onChange }: Props) {
    const [models, setModels] = useState<Model[]>([])
    const [newModel, setNewModel] = useState("")
    const [loading, setLoading] = useState(false)

    const fetchModels = async () => {
        try {
            const res = await getModels()
            setModels(res.data)
        } catch {
            alert("Ошибка при загрузке моделей")
        }
    }

    useEffect(() => {
        fetchModels()
    }, [])

    const handleAdd = async () => {
        if (!newModel.trim()) return
        setLoading(true)
        try {
            const res = await addModel(newModel.trim())
            setModels([...models, res.data])
            setNewModel("")
            onChange(res.data.id)
        } catch {
            alert("Ошибка при добавлении модели")
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Удалить модель?")) return
        try {
            await deleteModel(id)
            setModels(models.filter(m => m.id !== id))
            if (selectedId === id) onChange(null)
        } catch {
            alert("Ошибка при удалении модели")
        }
    }

    return (
        <div>
            <Label>Модель</Label>
            <select
                className="block w-full p-2 border rounded"
                value={selectedId ?? ""}
                onChange={e => onChange(e.target.value ? +e.target.value : null)}
            >
                <option value="">Выберите модель</option>
                {models.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                ))}
            </select>

            <div className="flex gap-2 mt-2">
                <Input
                    placeholder="Новая модель"
                    value={newModel}
                    onChange={e => setNewModel(e.target.value)}
                    disabled={loading}
                />
                <Button onClick={handleAdd} disabled={loading}>
                    Добавить
                </Button>
            </div>

            <div className="mt-2 space-x-2">
                {models.map(m => (
                    <button
                        key={m.id}
                        onClick={() => handleDelete(m.id)}
                        className="text-sm text-red-600 hover:underline"
                        type="button"
                        disabled={loading}
                    >
                        Удалить {m.name}
                    </button>
                ))}
            </div>
        </div>
    )
}
