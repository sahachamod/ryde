// Insurance Types
export type InsuranceStatus = "active" | "expired" | "pending" | "cancelled";
export type InsuranceType = "comprehensive" | "third_party" | "collision" | "liability";
export type CoverageLevel = "basic" | "standard" | "premium";

export interface Insurance {
    id: string;
    policyNumber: string;
    carId: string;
    car?: {
        brand: string;
        model: string;
        year: number;
        licensePlate: string;
    };
    provider: string;
    type: InsuranceType;
    coverageLevel: CoverageLevel;
    coverageAmount: number;
    premium: number;
    deductible: number;
    startDate: string;
    endDate: string;
    status: InsuranceStatus;
    claims: number;
    documents: string[];
    createdAt: string;
    updatedAt: string;
}

export interface InsuranceFilters {
    status?: InsuranceStatus;
    type?: InsuranceType;
    provider?: string;
    search?: string;
}

export interface InsuranceFormData {
    policyNumber: string;
    carId: string;
    provider: string;
    type: InsuranceType;
    coverageLevel: CoverageLevel;
    coverageAmount: number;
    premium: number;
    deductible: number;
    startDate: string;
    endDate: string;
}
