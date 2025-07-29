import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface Props {
    image: File | null
    onImageChange: (file: File | null) => void
}

export default function ImageUploader({ image, onImageChange }: Props) {
    const [preview, setPreview] = useState<string | null>(null)

    useEffect(() => {
        if (image) {
            const objectUrl = URL.createObjectURL(image)
            setPreview(objectUrl)
            return () => URL.revokeObjectURL(objectUrl)
        } else {
            setPreview(null)
        }
    }, [image])

    return (
        <div>
            <Label>Фото машины</Label>
            <Input
                type="file"
                accept="image/*"
                onChange={(e) => onImageChange(e.target.files?.[0] || null)}
            />
            {preview && (
                <img src={preview} alt="Предпросмотр" className="mt-2 max-h-40 rounded-lg" />
            )}
        </div>
    )
}
