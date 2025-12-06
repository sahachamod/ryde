export type BookingStatus = "pending" | "confirmed" | "active" | "completed" | "cancelled";

export interface Booking {
    id: string;
    bookingNumber: string;
    carId: string;
    car: {
        brand: string;
        model: string;
        year: number;
        licensePlate: string;
        image: string;
    };
    customerId: string;
    customer: {
        name: string;
        email: string;
        phone: string;
        avatar?: string;
    };
    startDate: string;
    endDate: string;
    pickupLocation: string;
    dropoffLocation: string;
    status: BookingStatus;
    totalDays: number;
    dailyRate: number;
    totalAmount: number;
    deposit: number;
    paymentStatus: "pending" | "paid" | "partial" | "refunded";
    notes?: string;
    createdAt: string;
    updatedAt: string;
    confirmedAt?: string;
    completedAt?: string;
    cancelledAt?: string;
}

export interface BookingFormData {
    carId: string;
    customerId: string;
    startDate: string;
    endDate: string;
    pickupLocation: string;
    dropoffLocation: string;
    notes?: string;
}

export interface BookingFilters {
    status?: BookingStatus;
    startDate?: string;
    endDate?: string;
    customerId?: string;
    carId?: string;
    search?: string;
}

export interface BookingStats {
    total: number;
    pending: number;
    confirmed: number;
    active: number;
    completed: number;
    cancelled: number;
}
