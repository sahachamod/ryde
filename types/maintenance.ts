export type MaintenanceStatus = "scheduled" | "in_progress" | "completed" | "cancelled";
export type MaintenanceType = "routine" | "repair" | "inspection" | "emergency";

export interface Maintenance {
    id: string;
    carId: string;
    car: {
        brand: string;
        model: string;
        year: number;
        licensePlate: string;
    };
    type: MaintenanceType;
    status: MaintenanceStatus;
    description: string;
    scheduledDate: string;
    completedDate?: string;
    cost: number;
    vendor?: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export interface MaintenanceFormData {
    carId: string;
    type: MaintenanceType;
    description: string;
    scheduledDate: string;
    cost: number;
    vendor?: string;
    notes?: string;
}

export interface MaintenanceFilters {
    status?: MaintenanceStatus;
    type?: MaintenanceType;
    carId?: string;
    startDate?: string;
    endDate?: string;
}
