"use client";

import { useState } from "react";
import { mockCustomers } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search, Eye, CheckCircle, XCircle, User } from "lucide-react";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";
import type { CustomerStatus, VerificationStatus } from "@/types/customer";

export default function CustomersPage() {
    const [customers] = useState(mockCustomers);
    const [verificationFilter, setVerificationFilter] = useState<
        VerificationStatus | "all"
    >("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCustomers = customers.filter((customer) => {
        const matchesVerification =
            verificationFilter === "all" ||
            customer.verificationStatus === verificationFilter;
        const matchesSearch =
            customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.phone.includes(searchQuery);
        return matchesVerification && matchesSearch;
    });

    const getVerificationBadge = (status: VerificationStatus) => {
        const variants: Record<VerificationStatus, any> = {
            pending: "pending",
            verified: "success",
            rejected: "destructive",
        };
        return variants[status];
    };

    const getStatusBadge = (status: CustomerStatus) => {
        const variants: Record<CustomerStatus, any> = {
            active: "success",
            inactive: "secondary",
            blocked: "destructive",
        };
        return variants[status];
    };

    const statsByVerification = {
        total: customers.length,
        verified: customers.filter((c) => c.verificationStatus === "verified")
            .length,
        pending: customers.filter((c) => c.verificationStatus === "pending").length,
        rejected: customers.filter((c) => c.verificationStatus === "rejected")
            .length,
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Customers Management
                    </h1>
                    <p className="text-muted-foreground">
                        Manage customer profiles and verification status
                    </p>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">
                            Total Customers
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{statsByVerification.total}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Verified</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {statsByVerification.verified}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">
                            Pending Verification
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                            {statsByVerification.pending}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">
                            {statsByVerification.rejected}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Customers Table */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <CardTitle>All Customers</CardTitle>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search customers..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                            <Select
                                value={verificationFilter}
                                onValueChange={(value) => setVerificationFilter(value as any)}
                            >
                                <SelectTrigger className="w-full sm:w-48">
                                    <SelectValue placeholder="Filter by verification" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="all">All Verification</SelectItem>
                                        <SelectItem value="verified">Verified</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="rejected">Rejected</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Bookings</TableHead>
                                    <TableHead>Total Spent</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Verification</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredCustomers.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={8}
                                            className="text-center text-muted-foreground"
                                        >
                                            No customers found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredCustomers.map((customer) => (
                                        <TableRow key={customer.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                                                        {customer.avatar ? (
                                                            <User className="h-5 w-5" />
                                                        ) : (
                                                            getInitials(customer.name)
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{customer.name}</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            Joined {formatDate(customer.joinedAt)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="text-sm">{customer.email}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {customer.phone}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    {customer.city && customer.state
                                                        ? `${customer.city}, ${customer.state}`
                                                        : "N/A"}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">
                                                    {customer.totalBookings}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">
                                                    {formatCurrency(customer.totalSpent)}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={getStatusBadge(customer.status)}>
                                                    {customer.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={getVerificationBadge(
                                                        customer.verificationStatus
                                                    )}
                                                >
                                                    {customer.verificationStatus === "verified" && (
                                                        <CheckCircle className="mr-1 h-3 w-3" />
                                                    )}
                                                    {customer.verificationStatus === "rejected" && (
                                                        <XCircle className="mr-1 h-3 w-3" />
                                                    )}
                                                    {customer.verificationStatus}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination Info */}
                    {filteredCustomers.length > 0 && (
                        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                            <div>
                                Showing{" "}
                                <span className="font-medium">{filteredCustomers.length}</span>{" "}
                                of <span className="font-medium">{customers.length}</span>{" "}
                                customers
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" disabled>
                                    Previous
                                </Button>
                                <Button variant="outline" size="sm" disabled>
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
