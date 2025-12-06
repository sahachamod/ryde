export interface DashboardStats {
    totalCars: number;
    availableCars: number;
    rentedCars: number;
    maintenanceCars: number;
    totalBookings: number;
    activeBookings: number;
    completedBookings: number;
    totalRevenue: number;
    monthlyRevenue: number;
    totalCustomers: number;
    newCustomers: number;
    pendingPayments: number;
}

export interface RevenueData {
    date: string;
    revenue: number;
    bookings: number;
}

export interface CategoryStats {
    category: string;
    count: number;
    revenue: number;
}

export interface ChartData {
    name: string;
    value: number;
}

export type ReportType = "revenue" | "bookings" | "fleet" | "customers";
export type ReportFormat = "pdf" | "excel" | "csv";

export interface ReportFilters {
    type: ReportType;
    startDate: string;
    endDate: string;
    groupBy?: "day" | "week" | "month";
    categories?: string[];
}

export interface ReportData {
    type: ReportType;
    generatedAt: string;
    period: {
        start: string;
        end: string;
    };
    summary: Record<string, any>;
    data: Record<string, any>[];
}
