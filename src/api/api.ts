import axios from "axios"

const api = axios.create({
    baseURL: "/api/admin", // подставь свой базовый путь, если отличается
    headers: {
        "Content-Type": "application/json",
    },
})

// BRANDS
export const getBrands = () => api.get("/brands")
export const addBrand = (name: string) => api.post("/brands", { name })
export const deleteBrand = (id: number) => api.delete(`/brands/${id}`)

// MODELS
export const getModels = () => api.get("/models")
export const addModel = (name: string) => api.post("/models", { name })
export const deleteModel = (id: number) => api.delete(`/models/${id}`)

// CARS
export const getCars = () => api.get("/cars")
export const addCar = (formData: FormData) =>
    api.post("/cars", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    })
export const deleteCar = (id: number) => api.delete(`/cars/${id}`)
