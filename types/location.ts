// Location Types
export type LocationStatus = "active" | "inactive" | "maintenance";
export type LocationType = "branch" | "pickup_point" | "service_center";

export interface Location {
    id: string;
    name: string;
    type: LocationType;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
    email: string;
    coordinates?: {
        latitude: number;
        longitude: number;
    };
    operatingHours: {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
    };
    status: LocationStatus;
    availableCars: number;
    manager?: string;
    facilities: string[];
    createdAt: string;
    updatedAt: string;
}

export interface LocationFilters {
    type?: LocationType;
    status?: LocationStatus;
    city?: string;
    search?: string;
}

export interface LocationFormData {
    name: string;
    type: LocationType;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
    email: string;
    coordinates?: {
        latitude: number;
        longitude: number;
    };
    operatingHours: {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
    };
    facilities: string[];
}
