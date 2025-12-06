// Terms and Conditions Types
export type TermsStatus = "draft" | "published" | "archived";
export type TermsType = "rental" | "driver" | "privacy" | "cancellation" | "general";

export interface TermsAndConditions {
    id: string;
    title: string;
    type: TermsType;
    version: string;
    content: string;
    effectiveDate: string;
    expiryDate?: string;
    status: TermsStatus;
    isRequired: boolean;
    acceptanceCount: number;
    createdBy: string;
    lastModifiedBy?: string;
    createdAt: string;
    updatedAt: string;
}

export interface TermsFilters {
    type?: TermsType;
    status?: TermsStatus;
    search?: string;
}

export interface TermsFormData {
    title: string;
    type: TermsType;
    version: string;
    content: string;
    effectiveDate: string;
    expiryDate?: string;
    isRequired: boolean;
}

export interface TermsSection {
    id: string;
    heading: string;
    content: string;
    order: number;
}
