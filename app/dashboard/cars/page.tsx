"use client";

import { useState } from "react";
import { mockCars } from "@/data/mockData";
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
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { CarStatus } from "@/types/car";

export default function CarsPage() {
    const [cars] = useState(mockCars);
    const [statusFilter, setStatusFilter] = useState<CarStatus | "all">("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCars = cars.filter((car) => {
        const matchesStatus = statusFilter === "all" || car.status === statusFilter;
        const matchesSearch =
            car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
            car.licensePlate.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const getStatusBadge = (status: CarStatus) => {
        const variants: Record<CarStatus, any> = {
            available: "success",
            rented: "warning",
            maintenance: "pending",
            unavailable: "destructive",
        };
        return variants[status];
    };

    const statsByStatus = {
        total: cars.length,
        available: cars.filter((c) => c.status === "available").length,
        rented: cars.filter((c) => c.status === "rented").length,
        maintenance: cars.filter((c) => c.status === "maintenance").length,
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Cars Management</h1>
                    <p className="text-muted-foreground">
                        Manage your fleet inventory, pricing, and availability
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Car
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{statsByStatus.total}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Available</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {statsByStatus.available}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Rented</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">
                            {statsByStatus.rented}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                            {statsByStatus.maintenance}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters and Search */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <CardTitle>Fleet Inventory</CardTitle>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search cars..."
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
                                        <SelectItem value="available">Available</SelectItem>
                                        <SelectItem value="rented">Rented</SelectItem>
                                        <SelectItem value="maintenance">Maintenance</SelectItem>
                                        <SelectItem value="unavailable">Unavailable</SelectItem>
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
                                    <TableHead>Vehicle</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>License Plate</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Pricing (Daily)</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredCars.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center text-muted-foreground">
                                            No cars found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredCars.map((car) => (
                                        <TableRow key={car.id}>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">
                                                        {car.brand} {car.model}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {car.year} • {car.color}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{car.category}</TableCell>
                                            <TableCell className="font-mono">{car.licensePlate}</TableCell>
                                            <TableCell>
                                                <Badge variant={getStatusBadge(car.status)}>
                                                    {car.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">
                                                        {formatCurrency(car.pricing.daily)}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {formatCurrency(car.pricing.weekly)}/week
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{car.location}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon">
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination Info */}
                    {filteredCars.length > 0 && (
                        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                            <div>
                                Showing <span className="font-medium">{filteredCars.length}</span> of{" "}
                                <span className="font-medium">{cars.length}</span> cars
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
