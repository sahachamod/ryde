import { api } from "./client";
import type { Customer, CustomerFilters } from "@/types/customer";

export const customersApi = {
    // List customers
    list: async (filters?: CustomerFilters): Promise<Customer[]> => {
        return api.get<Customer[]>("/customers", { params: filters });
    },

    // Get customer by ID
    getById: async (id: string): Promise<Customer> => {
        return api.get<Customer>(`/customers/${id}`);
    },

    // Update customer
    update: async (id: string, data: Partial<Customer>): Promise<Customer> => {
        return api.put<Customer>(`/customers/${id}`, data);
    },

    // Upload documents
    uploadDocuments: async (id: string, files: File[], type: string): Promise<Customer> => {
        const formData = new FormData();
        files.forEach((file) => formData.append("documents", file));
        formData.append("type", type);
        return api.post<Customer>(`/customers/${id}/documents`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },

    // Verify customer
    verify: async (id: string, documentId: string, status: string): Promise<Customer> => {
        return api.patch<Customer>(`/customers/${id}/verify`, { documentId, status });
    },

    // Get booking history
    getBookingHistory: async (id: string): Promise<any[]> => {
        return api.get<any[]>(`/customers/${id}/bookings`);
    },

    // Block/Unblock customer
    updateStatus: async (id: string, status: Customer["status"]): Promise<Customer> => {
        return api.patch<Customer>(`/customers/${id}/status`, { status });
    },
};
