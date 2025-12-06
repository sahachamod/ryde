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
import { Plus, Wrench, Calendar, DollarSign } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function MaintenancePage() {
    // Mock maintenance data
    const maintenanceRecords = [
        {
            id: "1",
            carBrand: "Toyota",
            carModel: "Camry",
            licensePlate: "ABC-1234",
            type: "routine",
            description: "Oil change and tire rotation",
            scheduledDate: "2024-12-01",
            status: "scheduled",
            cost: 150,
            vendor: "Quick Service Auto",
        },
        {
            id: "2",
            carBrand: "Honda",
            carModel: "CR-V",
            licensePlate: "XYZ-5678",
            type: "repair",
            description: "Brake pad replacement",
            scheduledDate: "2024-11-28",
            completedDate: "2024-11-28",
            status: "completed",
            cost: 450,
            vendor: "AutoCare Specialists",
        },
        {
            id: "3",
            carBrand: "Tesla",
            carModel: "Model 3",
            licensePlate: "TES-8901",
            type: "inspection",
            description: "Annual safety inspection",
            scheduledDate: "2024-12-05",
            status: "in_progress",
            cost: 200,
            vendor: "Tesla Service Center",
        },
    ];

    const getStatusBadge = (status: string) => {
        const variants: Record<string, any> = {
            scheduled: "pending",
            in_progress: "default",
            completed: "success",
            cancelled: "destructive",
        };
        return variants[status] || "default";
    };

    const getTypeBadge = (type: string) => {
        const variants: Record<string, any> = {
            routine: "secondary",
            repair: "warning",
            inspection: "default",
            emergency: "destructive",
        };
        return variants[type] || "default";
    };

    const statsByStatus = {
        total: maintenanceRecords.length,
        scheduled: maintenanceRecords.filter((m) => m.status === "scheduled").length,
        inProgress: maintenanceRecords.filter((m) => m.status === "in_progress")
            .length,
        completed: maintenanceRecords.filter((m) => m.status === "completed").length,
        totalCost: maintenanceRecords.reduce((sum, m) => sum + m.cost, 0),
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Maintenance Management
                    </h1>
                    <p className="text-muted-foreground">
                        Track vehicle maintenance and service schedules
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule Maintenance
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-5">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Total Records</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{statsByStatus.total}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                            {statsByStatus.scheduled}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">
                            {statsByStatus.inProgress}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Completed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {statsByStatus.completed}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatCurrency(statsByStatus.totalCost)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Maintenance Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Maintenance Records</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        View and manage all maintenance activities
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Vehicle</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Scheduled Date</TableHead>
                                    <TableHead>Vendor</TableHead>
                                    <TableHead>Cost</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {maintenanceRecords.map((record) => (
                                    <TableRow key={record.id}>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">
                                                    {record.carBrand} {record.carModel}
                                                </div>
                                                <div className="text-sm text-muted-foreground font-mono">
                                                    {record.licensePlate}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getTypeBadge(record.type)}>
                                                <Wrench className="mr-1 h-3 w-3" />
                                                {record.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{record.description}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <span>{formatDate(record.scheduledDate)}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm">{record.vendor}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-medium">{record.cost}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusBadge(record.status)}>
                                                {record.status.replace("_", " ")}
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
