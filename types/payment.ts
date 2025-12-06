export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";
export type PaymentMethod = "card" | "cash" | "bank_transfer";

export interface Payment {
    id: string;
    bookingId: string;
    booking: {
        bookingNumber: string;
        customer: string;
    };
    amount: number;
    method: PaymentMethod;
    status: PaymentStatus;
    transactionId?: string;
    notes?: string;
    createdAt: string;
    processedAt?: string;
}

export interface Invoice {
    id: string;
    invoiceNumber: string;
    bookingId: string;
    customerId: string;
    customer: {
        name: string;
        email: string;
        phone: string;
        address?: string;
    };
    issueDate: string;
    dueDate: string;
    items: InvoiceItem[];
    subtotal: number;
    tax: number;
    discount: number;
    total: number;
    status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
    paidAt?: string;
    createdAt: string;
}

export interface InvoiceItem {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

export interface PaymentFilters {
    status?: PaymentStatus;
    method?: PaymentMethod;
    startDate?: string;
    endDate?: string;
    search?: string;
}
