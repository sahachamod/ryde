// Car Owner Types
export type OwnerType = "individual" | "company" | "fleet";
export type OwnerStatus = "active" | "inactive" | "pending";

export interface CarOwner {
    id: string;
    name: string;
    type: OwnerType;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    taxId?: string;
    companyRegistration?: string;
    status: OwnerStatus;
    totalCars: number;
    totalRevenue: number;
    commissionRate: number; // percentage
    bankAccount: {
        accountName: string;
        accountNumber: string;
        bankName: string;
        routingNumber?: string;
    };
    documents: string[];
    joinedAt: string;
    lastPayment?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CarOwnerFilters {
    type?: OwnerType;
    status?: OwnerStatus;
    search?: string;
}

export interface CarOwnerFormData {
    name: string;
    type: OwnerType;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    taxId?: string;
    companyRegistration?: string;
    commissionRate: number;
    bankAccount: {
        accountName: string;
        accountNumber: string;
        bankName: string;
        routingNumber?: string;
    };
}
