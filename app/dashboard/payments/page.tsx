"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Download, DollarSign, CreditCard } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function PaymentsPage() {
    // Mock payments data
    const payments = [
        {
            id: "1",
            bookingNumber: "BK-2024-001",
            customer: "John Smith",
            amount: 595,
            method: "card",
            status: "completed",
            transactionId: "TX-001234567",
            date: "2024-11-28T10:00:00Z",
        },
        {
            id: "2",
            bookingNumber: "BK-2024-002",
            customer: "Sarah Johnson",
            amount: 130,
            method: "cash",
            status: "pending",
            transactionId: "TX-001234568",
            date: "2024-11-25T16:00:00Z",
        },
        {
            id: "3",
            bookingNumber: "BK-2024-003",
            customer: "Mike Davis",
            amount: 850,
            method: "bank_transfer",
            status: "completed",
            transactionId: "TX-001234569",
            date: "2024-11-20T14:00:00Z",
        },
    ];

    const getStatusBadge = (status: string) => {
        const variants: Record<string, any> = {
            completed: "success",
            pending: "pending",
            failed: "destructive",
            refunded: "secondary",
        };
        return variants[status] || "default";
    };

    const getMethodLabel = (method: string) => {
        const labels: Record<string, string> = {
            card: "Credit Card",
            cash: "Cash",
            bank_transfer: "Bank Transfer",
        };
        return labels[method] || method;
    };

    const stats = {
        total: payments.reduce((sum, p) => sum + p.amount, 0),
        completed: payments.filter((p) => p.status === "completed").length,
        pending: payments.filter((p) => p.status === "pending").length,
        totalTransactions: payments.length,
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Payments & Invoices
                    </h1>
                    <p className="text-muted-foreground">
                        Manage payment transactions and generate invoices
                    </p>
                </div>
                <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Export Report
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatCurrency(stats.total)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">
                            Completed Payments
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {stats.completed}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">
                            Pending Payments
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">
                            {stats.pending}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">
                            Total Transactions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalTransactions}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Payments Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        View all payment transactions and invoices
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Transaction ID</TableHead>
                                    <TableHead>Booking</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Method</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payments.map((payment) => (
                                    <TableRow key={payment.id}>
                                        <TableCell className="font-mono text-sm">
                                            {payment.transactionId}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {payment.bookingNumber}
                                        </TableCell>
                                        <TableCell>{payment.customer}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1 font-medium">
                                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                                {formatCurrency(payment.amount)}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                                                {getMethodLabel(payment.method)}
                                            </div>
                                        </TableCell>
                                        <TableCell>{formatDate(payment.date)}</TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusBadge(payment.status)}>
                                                {payment.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">
                                                View Invoice
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
