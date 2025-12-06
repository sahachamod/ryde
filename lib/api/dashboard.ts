import { api } from "./client";
import type { DashboardStats, RevenueData, ReportFilters, ReportData } from "@/types/dashboard";

export const dashboardApi = {
    // Get dashboard statistics
    getStats: async (): Promise<DashboardStats> => {
        return api.get<DashboardStats>("/dashboard/stats");
    },

    // Get revenue data
    getRevenueData: async (days?: number): Promise<RevenueData[]> => {
        return api.get<RevenueData[]>("/dashboard/revenue", {
            params: { days: days || 30 },
        });
    },

    // Generate report
    generateReport: async (filters: ReportFilters): Promise<ReportData> => {
        return api.post<ReportData>("/reports/generate", filters);
    },

    // Export report
    exportReport: async (reportId: string, format: "pdf" | "excel" | "csv"): Promise<Blob> => {
        return api.get<Blob>(`/reports/${reportId}/export`, {
            params: { format },
            responseType: "blob",
        });
    },
};
