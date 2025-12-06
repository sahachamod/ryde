"use client";

import { useState } from "react";
import { mockBookings } from "@/data/mockData";
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
import { Plus, Search, Eye, Calendar } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { BookingStatus } from "@/types/booking";

export default function BookingsPage() {
    const [bookings] = useState(mockBookings);
    const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredBookings = bookings.filter((booking) => {
        const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
        const matchesSearch =
            booking.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            `${booking.car.brand} ${booking.car.model}`
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const getStatusBadge = (status: BookingStatus) => {
        const variants: Record<BookingStatus, any> = {
            pending: "pending",
            confirmed: "default",
            active: "success",
            completed: "secondary",
            cancelled: "destructive",
        };
        return variants[status];
    };

    const statsByStatus = {
        total: bookings.length,
        pending: bookings.filter((b) => b.status === "pending").length,
        confirmed: bookings.filter((b) => b.status === "confirmed").length,
        active: bookings.filter((b) => b.status === "active").length,
        completed: bookings.filter((b) => b.status === "completed").length,
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Bookings Management
                    </h1>
                    <p className="text-muted-foreground">
                        Track and manage all rental bookings
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Booking
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-5">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Total</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{statsByStatus.total}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                            {statsByStatus.pending}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-600">
                            {statsByStatus.confirmed}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Active</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {statsByStatus.active}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Completed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-600">
                            {statsByStatus.completed}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bookings Table */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <CardTitle>All Bookings</CardTitle>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search bookings..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                            <Select
                                value={statusFilter}
                                onValueChange={(value) => setStatusFilter(value as any)}
                            >
                                <SelectTrigger className="w-full sm:w-40">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="confirmed">Confirmed</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
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
                                    <TableHead>Booking #</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Vehicle</TableHead>
                                    <TableHead>Rental Period</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredBookings.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="text-center text-muted-foreground"
                                        >
                                            No bookings found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredBookings.map((booking) => (
                                        <TableRow key={booking.id}>
                                            <TableCell className="font-mono">
                                                {booking.bookingNumber}
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">
                                                        {booking.customer.name}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {booking.customer.email}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">
                                                        {booking.car.brand} {booking.car.model}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {booking.car.licensePlate}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                                    <div>
                                                        <div className="text-sm">
                                                            {formatDate(booking.startDate)}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">
                                                            to {formatDate(booking.endDate)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">
                                                        {formatCurrency(booking.totalAmount)}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {booking.totalDays}{" "}
                                                        {booking.totalDays === 1 ? "day" : "days"}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={getStatusBadge(booking.status)}>
                                                    {booking.status}
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
                    {filteredBookings.length > 0 && (
                        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                            <div>
                                Showing{" "}
                                <span className="font-medium">{filteredBookings.length}</span>{" "}
                                of <span className="font-medium">{bookings.length}</span>{" "}
                                bookings
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
