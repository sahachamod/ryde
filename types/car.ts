export type CarStatus = "available" | "rented" | "maintenance" | "unavailable";
export type FuelType = "petrol" | "diesel" | "electric" | "hybrid";
export type TransmissionType = "automatic" | "manual";

export interface Car {
    id: string;
    brand: string;
    model: string;
    year: number;
    category: string;
    status: CarStatus;
    licensePlate: string;
    vin: string;
    color: string;
    fuelType: FuelType;
    transmission: TransmissionType;
    seats: number;
    mileage: number;
    images: string[];
    pricing: CarPricing;
    features: string[];
    location: string;
    createdAt: string;
    updatedAt: string;
}

export interface CarPricing {
    daily: number;
    weekly: number;
    monthly: number;
    deposit: number;
}

export interface CarFormData {
    brand: string;
    model: string;
    year: number;
    category: string;
    licensePlate: string;
    vin: string;
    color: string;
    fuelType: FuelType;
    transmission: TransmissionType;
    seats: number;
    mileage: number;
    features: string[];
    location: string;
    pricing: CarPricing;
}

export interface CarFilters {
    status?: CarStatus;
    category?: string;
    fuelType?: FuelType;
    transmission?: TransmissionType;
    search?: string;
}
