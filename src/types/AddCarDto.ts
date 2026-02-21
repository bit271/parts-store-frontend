export interface AddCarDto {
    description: string;
    year: number;
    brandId: number;
    modelId: number;
    image?: File;
}
