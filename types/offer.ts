export type OfferStatus = "active" | "inactive" | "expired";
export type DiscountType = "percentage" | "fixed";

export interface Offer {
    id: string;
    title: string;
    description: string;
    code: string;
    discountType: DiscountType;
    discountValue: number;
    minBookingAmount?: number;
    maxDiscount?: number;
    startDate: string;
    endDate: string;
    status: OfferStatus;
    usageLimit?: number;
    usageCount: number;
    applicableCategories?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface OfferFormData {
    title: string;
    description: string;
    code: string;
    discountType: DiscountType;
    discountValue: number;
    minBookingAmount?: number;
    maxDiscount?: number;
    startDate: string;
    endDate: string;
    usageLimit?: number;
    applicableCategories?: string[];
}

export interface OfferFilters {
    status?: OfferStatus;
    discountType?: DiscountType;
    search?: string;
}
