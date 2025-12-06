export type CustomerStatus = "active" | "inactive" | "blocked";
export type VerificationStatus = "pending" | "verified" | "rejected";

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    dateOfBirth?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    avatar?: string;
    status: CustomerStatus;
    verificationStatus: VerificationStatus;
    licenseNumber?: string;
    licenseExpiry?: string;
    documents: CustomerDocument[];
    totalBookings: number;
    totalSpent: number;
    joinedAt: string;
    lastBooking?: string;
}

export interface CustomerDocument {
    id: string;
    type: "license" | "id_card" | "passport";
    fileUrl: string;
    status: VerificationStatus;
    uploadedAt: string;
    verifiedAt?: string;
    notes?: string;
}

export interface CustomerFilters {
    status?: CustomerStatus;
    verificationStatus?: VerificationStatus;
    search?: string;
}
