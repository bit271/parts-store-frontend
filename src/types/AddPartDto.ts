export interface AddPartDto {
    carId: number;
    categoryId: number;
    name: string;
    availableCount: number;
    price: number;
    catalogNum: string;
    description: string;
    image?: File;
}