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
import { Plus, Search, Building2, Car, DollarSign, Percent } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function CarOwnersPage() {
    // Mock car owners data
    const carOwners = [
        {
            id: "1",
            name: "Elite Auto Group",
            type: "company" as const,
            email: "contact@eliteauto.com",
            phone: "+1-555-0301",
            city: "Los Angeles",
            state: "CA",
            status: "active" as const,
            totalCars: 15,
            totalRevenue: 45680,
            commissionRate: 20,
            joinedAt: "2022-06-15",
            lastPayment: "2024-11-01",
        },
        {
            id: "2",
            name: "John Anderson",
            type: "individual" as const,
            email: "john.a@example.com",
            phone: "+1-555-0302",
            city: "San Francisco",
            state: "CA",
            status: "active" as const,
            totalCars: 3,
            totalRevenue: 12340,
            commissionRate: 25,
            joinedAt: "2023-03-20",
            lastPayment: "2024-10-28",
        },
        {
            id: "3",
            name: "Premium Fleet Services",
            type: "fleet" as const,
            email: "fleet@premiumfs.com",
            phone: "+1-555-0303",
            city: "Seattle",
            state: "WA",
            status: "active" as const,
            totalCars: 28,
            totalRevenue: 89750,
            commissionRate: 18,
            joinedAt: "2021-11-10",
            lastPayment: "2024-11-05",
        },
        {
            id: "4",
            name: "Sarah Miller",
            type: "individual" as const,
            email: "sarah.m@example.com",
            phone: "+1-555-0304",
            city: "Portland",
            state: "OR",
            status: "pending" as const,
            totalCars: 1,
            totalRevenue: 0,
            commissionRate: 25,
            joinedAt: "2024-11-20",
            lastPayment: undefined,
        },
    ];

    const [typeFilter, setTypeFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredOwners = carOwners.filter((owner) => {
        const matchesType = typeFilter === "all" || owner.type === typeFilter;
        const matchesSearch =
            owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            owner.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
    });

    const getStatusBadge = (status: string) => {
        const variants: Record<string, any> = {
            active: "success",
            inactive: "secondary",
            pending: "pending",
        };
        return variants[status];
    };

    const getTypeBadge = (type: string) => {
        const variants: Record<string, any> = {
            individual: "default",
            company: "success",
            fleet: "warning",
        };
        return variants[type];
    };

    const stats = {
        total: carOwners.length,
        active: carOwners.filter((o) => o.status === "active").length,
        totalCars: carOwners.reduce((sum, o) => sum + o.totalCars, 0),
        totalRevenue: carOwners.reduce((sum, o) => sum + o.totalRevenue, 0),
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Car Owners Management
                    </h1>
                    <p className="text-muted-foreground">
                        Manage vehicle owners and commission tracking
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Owner
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Total Owners</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Active Owners</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {stats.active}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                            {stats.totalCars}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatCurrency(stats.totalRevenue)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Owners Table */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <CardTitle>All Car Owners</CardTitle>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search owners..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                            <Select
                                value={typeFilter}
                                onValueChange={(value) => setTypeFilter(value)}
                            >
                                <SelectTrigger className="w-full sm:w-40">
                                    <SelectValue placeholder="Filter by type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="all">All Types</SelectItem>
                                        <SelectItem value="individual">Individual</SelectItem>
                                        <SelectItem value="company">Company</SelectItem>
                                        <SelectItem value="fleet">Fleet</SelectItem>
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
                                    <TableHead>Owner</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Cars</TableHead>
                                    <TableHead>Revenue</TableHead>
                                    <TableHead>Commission</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredOwners.map((owner) => (
                                    <TableRow key={owner.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                                    <Building2 className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">{owner.name}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        Since {formatDate(owner.joinedAt)}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getTypeBadge(owner.type)}>
                                                {owner.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="text-sm">{owner.email}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {owner.phone}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {owner.city}, {owner.state}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Car className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-medium">{owner.totalCars}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-medium">
                                                    {formatCurrency(owner.totalRevenue)}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Percent className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-medium">{owner.commissionRate}%</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusBadge(owner.status)}>
                                                {owner.status}
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
