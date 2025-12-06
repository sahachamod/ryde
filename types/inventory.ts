// Inventory Types
export type InventoryStatus = "in_stock" | "low_stock" | "out_of_stock" | "ordered";
export type InventoryCategory = "parts" | "accessories" | "cleaning" | "fuel" | "other";

export interface InventoryItem {
    id: string;
    name: string;
    category: InventoryCategory;
    sku: string;
    quantity: number;
    minQuantity: number;
    maxQuantity: number;
    unitPrice: number;
    totalValue: number;
    supplier?: string;
    location: string;
    status: InventoryStatus;
    lastRestocked?: string;
    createdAt: string;
    updatedAt: string;
}

export interface InventoryFilters {
    category?: InventoryCategory;
    status?: InventoryStatus;
    search?: string;
    minQuantity?: number;
    maxQuantity?: number;
}

export interface InventoryFormData {
    name: string;
    category: InventoryCategory;
    sku: string;
    quantity: number;
    minQuantity: number;
    maxQuantity: number;
    unitPrice: number;
    supplier?: string;
    location: string;
}
