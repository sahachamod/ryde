// Driver Types
export type DriverStatus = "active" | "inactive" | "on_leave" | "suspended";
export type LicenseType = "class_a" | "class_b" | "class_c" | "commercial";

export interface Driver {
    id: string;
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    licenseNumber: string;
    licenseType: LicenseType;
    licenseExpiry: string;
    status: DriverStatus;
    hireDate: string;
    experience: number; // years
    rating: number; // 1-5
    totalTrips: number;
    avatar?: string;
    emergencyContact: {
        name: string;
        phone: string;
        relation: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface DriverFilters {
    status?: DriverStatus;
    licenseType?: LicenseType;
    search?: string;
    minRating?: number;
}

export interface DriverFormData {
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    licenseNumber: string;
    licenseType: LicenseType;
    licenseExpiry: string;
    hireDate: string;
    emergencyContact: {
        name: string;
        phone: string;
        relation: string;
    };
}
