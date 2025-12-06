import { api } from "./client";
import type { Car, CarFormData, CarFilters } from "@/types/car";

export const carsApi = {
    // List cars
    list: async (filters?: CarFilters): Promise<Car[]> => {
        return api.get<Car[]>("/cars", { params: filters });
    },

    // Get car by ID
    getById: async (id: string): Promise<Car> => {
        return api.get<Car>(`/cars/${id}`);
    },

    // Create car
    create: async (data: CarFormData): Promise<Car> => {
        return api.post<Car>("/cars", data);
    },

    // Update car
    update: async (id: string, data: Partial<CarFormData>): Promise<Car> => {
        return api.put<Car>(`/cars/${id}`, data);
    },

    // Delete car
    delete: async (id: string): Promise<void> => {
        return api.delete<void>(`/cars/${id}`);
    },

    // Upload images
    uploadImages: async (id: string, files: File[]): Promise<{ images: string[] }> => {
        const formData = new FormData();
        files.forEach((file) => formData.append("images", file));
        return api.post<{ images: string[] }>(`/cars/${id}/images`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },

    // Check availability
    checkAvailability: async (
        id: string,
        startDate: string,
        endDate: string
    ): Promise<{ available: boolean }> => {
        return api.get<{ available: boolean }>(`/cars/${id}/availability`, {
            params: { startDate, endDate },
        });
    },

    // Update pricing
    updatePricing: async (id: string, pricing: Car["pricing"]): Promise<Car> => {
        return api.put<Car>(`/cars/${id}/pricing`, pricing);
    },
};
