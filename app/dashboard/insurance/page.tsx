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
import { Plus, Search, Shield, Calendar, FileText } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function InsurancePage() {
    // Mock insurance data
    const insurancePolicies = [
        {
            id: "1",
            policyNumber: "INS-2024-1001",
            carId: "1",
            car: {
                brand: "Toyota",
                model: "Camry",
                year: 2023,
                licensePlate: "ABC-1234",
            },
            provider: "State Farm",
            type: "comprehensive" as const,
            coverageLevel: "premium" as const,
            coverageAmount: 50000,
            premium: 1200,
            deductible: 500,
            startDate: "2024-01-01",
            endDate: "2024-12-31",
            status: "active" as const,
            claims: 0,
        },
        {
            id: "2",
            policyNumber: "INS-2024-1002",
            carId: "2",
            car: {
                brand: "Honda",
                model: "CR-V",
                year: 2024,
                licensePlate: "XYZ-5678",
            },
            provider: "Geico",
            type: "comprehensive" as const,
            coverageLevel: "standard" as const,
            coverageAmount: 40000,
            premium: 980,
            deductible: 750,
            startDate: "2024-02-15",
            endDate: "2025-02-14",
            status: "active" as const,
            claims: 1,
        },
        {
            id: "3",
            policyNumber: "INS-2023-0987",
            carId: "4",
            car: {
                brand: "Ford",
                model: "Focus",
                year: 2022,
                licensePlate: "DEF-9012",
            },
            provider: "Allstate",
            type: "third_party" as const,
            coverageLevel: "basic" as const,
            coverageAmount: 25000,
            premium: 650,
            deductible: 1000,
            startDate: "2023-11-01",
            endDate: "2024-10-31",
            status: "expired" as const,
            claims: 0,
        },
    ];

    const [statusFilter, setStatusFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPolicies = insurancePolicies.filter((policy) => {
        const matchesStatus = statusFilter === "all" || policy.status === statusFilter;
        const matchesSearch =
            policy.policyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            policy.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
            `${policy.car.brand} ${policy.car.model}`
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const getStatusBadge = (status: string) => {
        const variants: Record<string, any> = {
            active: "success",
            expired: "destructive",
            pending: "pending",
            cancelled: "secondary",
        };
        return variants[status];
    };

    const getCoverageBadge = (level: string) => {
        const variants: Record<string, any> = {
            basic: "secondary",
            standard: "default",
            premium: "success",
        };
        return variants[level];
    };

    const stats = {
        total: insurancePolicies.length,
        active: insurancePolicies.filter((p) => p.status === "active").length,
        expired: insurancePolicies.filter((p) => p.status === "expired").length,
        totalCoverage: insurancePolicies.reduce((sum, p) => sum + p.coverageAmount, 0),
        totalPremiums: insurancePolicies.reduce((sum, p) => sum + p.premium, 0),
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Insurance Management
                    </h1>
                    <p className="text-muted-foreground">
                        Track vehicle insurance policies and coverage
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Policy
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-5">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Total Policies</CardTitle>
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
                        <CardTitle className="text-sm font-medium">Expired</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">
                            {stats.expired}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Total Coverage</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatCurrency(stats.totalCoverage)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Annual Premiums</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatCurrency(stats.totalPremiums)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Insurance Table */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <CardTitle>Insurance Policies</CardTitle>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search policies..."
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
                                        <SelectItem value="expired">Expired</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
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
                                    <TableHead>Policy Number</TableHead>
                                    <TableHead>Vehicle</TableHead>
                                    <TableHead>Provider</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Coverage</TableHead>
                                    <TableHead>Premium</TableHead>
                                    <TableHead>Validity</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredPolicies.map((policy) => (
                                    <TableRow key={policy.id}>
                                        <TableCell className="font-mono">
                                            {policy.policyNumber}
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">
                                                    {policy.car.brand} {policy.car.model}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    {policy.car.licensePlate}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{policy.provider}</TableCell>
                                        <TableCell className="capitalize">
                                            {policy.type.replace("_", " ")}
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">
                                                    {formatCurrency(policy.coverageAmount)}
                                                </div>
                                                <Badge variant={getCoverageBadge(policy.coverageLevel)} className="mt-1">
                                                    {policy.coverageLevel}
                                                </Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell>{formatCurrency(policy.premium)}/year</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1 text-sm">
                                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                                <span>{formatDate(policy.endDate)}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusBadge(policy.status)}>
                                                {policy.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">
                                                <FileText className="mr-1 h-3 w-3" />
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
