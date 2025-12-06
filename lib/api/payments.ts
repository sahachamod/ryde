import { api } from "./client";
import type { Payment, Invoice, PaymentFilters } from "@/types/payment";

export const paymentsApi = {
    // List payments
    list: async (filters?: PaymentFilters): Promise<Payment[]> => {
        return api.get<Payment[]>("/payments", { params: filters });
    },

    // Get payment by ID
    getById: async (id: string): Promise<Payment> => {
        return api.get<Payment>(`/payments/${id}`);
    },

    // Process payment
    processPayment: async (
        bookingId: string,
        amount: number,
        method: Payment["method"]
    ): Promise<Payment> => {
        return api.post<Payment>("/payments", { bookingId, amount, method });
    },

    // Refund payment
    refund: async (id: string, reason?: string): Promise<Payment> => {
        return api.post<Payment>(`/payments/${id}/refund`, { reason });
    },

    // List invoices
    listInvoices: async (): Promise<Invoice[]> => {
        return api.get<Invoice[]>("/invoices");
    },

    // Get invoice by ID
    getInvoiceById: async (id: string): Promise<Invoice> => {
        return api.get<Invoice>(`/invoices/${id}`);
    },

    // Download invoice PDF
    downloadInvoicePDF: async (id: string): Promise<Blob> => {
        return api.get<Blob>(`/invoices/${id}/pdf`, {
            responseType: "blob",
        });
    },
};
