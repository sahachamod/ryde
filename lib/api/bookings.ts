import { api } from "./client";
import type { Booking, BookingFormData, BookingFilters, BookingStats } from "@/types/booking";

export const bookingsApi = {
    // List bookings
    list: async (filters?: BookingFilters): Promise<Booking[]> => {
        return api.get<Booking[]>("/bookings", { params: filters });
    },

    // Get booking by ID
    getById: async (id: string): Promise<Booking> => {
        return api.get<Booking>(`/bookings/${id}`);
    },

    // Create booking
    create: async (data: BookingFormData): Promise<Booking> => {
        return api.post<Booking>("/bookings", data);
    },

    // Update booking
    update: async (id: string, data: Partial<BookingFormData>): Promise<Booking> => {
        return api.put<Booking>(`/bookings/${id}`, data);
    },

    // Update status
    updateStatus: async (id: string, status: Booking["status"]): Promise<Booking> => {
        return api.patch<Booking>(`/bookings/${id}/status`, { status });
    },

    // Extend booking
    extend: async (id: string, newEndDate: string): Promise<Booking> => {
        return api.post<Booking>(`/bookings/${id}/extend`, { newEndDate });
    },

    // Cancel booking
    cancel: async (id: string, reason?: string): Promise<Booking> => {
        return api.post<Booking>(`/bookings/${id}/cancel`, { reason });
    },

    // Get stats
    getStats: async (): Promise<BookingStats> => {
        return api.get<BookingStats>("/bookings/stats");
    },
};
