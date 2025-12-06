"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Plus, Search, UserCog, Star, Phone } from "lucide-react";
import { formatDate, getInitials } from "@/lib/utils";

export default function DriversPage() {
    // Mock drivers data
    const drivers = [
        {
            id: "1",
            name: "Michael Johnson",
            email: "michael.j@ryderentals.com",
            phone: "+1-555-0201",
            licenseNumber: "D8901234",
            licenseType: "commercial" as const,
            licenseExpiry: "2026-08-15",
            status: "active" as const,
            hireDate: "2022-03-10",
            rating: 4.8,
            totalTrips: 156,
            experience: 5,
        },
        {
            id: "2",
            name: "Sarah Williams",
            email: "sarah.w@ryderentals.com",
            phone: "+1-555-0202",
            licenseNumber: "D8905678",
            licenseType: "commercial" as const,
            licenseExpiry: "2025-12-20",
            status: "active" as const,
            hireDate: "2023-01-15",
            rating: 4.9,
            totalTrips: 89,
            experience: 3,
        },
        {
            id: "3",
            name: "Robert Brown",
            email: "robert.b@ryderentals.com",
            phone: "+1-555-0203",
            licenseNumber: "D8909012",
            licenseType: "class_b" as const,
            licenseExpiry: "2024-06-30",
            status: "on_leave" as const,
            hireDate: "2021-11-08",
            rating: 4.6,
            totalTrips: 234,
            experience: 7,
        },
    ];

    const [statusFilter, setStatusFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredDrivers = drivers.filter((driver) => {
        const matchesStatus = statusFilter === "all" || driver.status === statusFilter;
        const matchesSearch =
            driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            driver.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            driver.phone.includes(searchQuery);
        return matchesStatus && matchesSearch;
    });

    const getStatusBadge = (status: string) => {
        const variants: Record<string, any> = {
            active: "success",
            inactive: "secondary",
            on_leave: "warning",
            suspended: "destructive",
        };
        return variants[status];
    };

    const stats = {
        total: drivers.length,
        active: drivers.filter((d) => d.status === "active").length,
        onLeave: drivers.filter((d) => d.status === "on_leave").length,
        avgRating: (
            drivers.reduce((sum, d) => sum + d.rating, 0) / drivers.length
        ).toFixed(1),
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Driver Management
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your driver team and assignments
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Driver
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Total Drivers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Active</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {stats.active}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">On Leave</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">
                            {stats.onLeave}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <div className="text-2xl font-bold">{stats.avgRating}</div>
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Drivers Table */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <CardTitle>All Drivers</CardTitle>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search drivers..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                            <Select
                                value={statusFilter}
                                onValueChange={(value) => setStatusFilter(value)}
                            >
                                <SelectTrigger className="w-full sm:w-40">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="on_leave">On Leave</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                        <SelectItem value="suspended">Suspended</SelectItem>
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
                                    <TableHead>Driver</TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead>License</TableHead>
                                    <TableHead>Experience</TableHead>
                                    <TableHead>Rating</TableHead>
                                    <TableHead>Total Trips</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredDrivers.map((driver) => (
                                    <TableRow key={driver.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                                                    <UserCog className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">{driver.name}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        Since {formatDate(driver.hireDate)}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="text-sm">{driver.email}</div>
                                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                    <Phone className="h-3 w-3" />
                                                    {driver.phone}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="font-mono text-sm">
                                                    {driver.licenseNumber}
                                                </div>
                                                <div className="text-xs text-muted-foreground capitalize">
                                                    {driver.licenseType.replace("_", " ")}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{driver.experience} years</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                <span className="font-medium">{driver.rating}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{driver.totalTrips}</TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusBadge(driver.status)}>
                                                {driver.status.replace("_", " ")}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">
                                                View
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
