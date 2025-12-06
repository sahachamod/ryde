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
import { Plus, DollarSign, Percent } from "lucide-react";

export default function OffersPage() {
    // Mock offers data
    const offers = [
        {
            id: "1",
            title: "Weekend Special",
            code: "WEEKEND20",
            discountType: "percentage",
            discountValue: 20,
            status: "active",
            validFrom: "2024-11-01",
            validTo: "2024-12-31",
            usageCount: 45,
            usageLimit: 100,
        },
        {
            id: "2",
            title: "New Customer Discount",
            code: "NEWCUST50",
            discountType: "fixed",
            discountValue: 50,
            status: "active",
            validFrom: "2024-10-01",
            validTo: "2025-01-31",
            usageCount: 23,
            usageLimit: 50,
        },
        {
            id: "3",
            title: "Holiday Season",
            code: "HOLIDAY30",
            discountType: "percentage",
            discountValue: 30,
            status: "expired",
            validFrom: "2024-11-15",
            validTo: "2024-11-25",
            usageCount: 78,
            usageLimit: 200,
        },
    ];

    const getStatusBadge = (status: string) => {
        const variants: Record<string, any> = {
            active: "success",
            expired: "secondary",
            inactive: "destructive",
        };
        return variants[status] || "default";
    };

    const statsByStatus = {
        total: offers.length,
        active: offers.filter((o) => o.status === "active").length,
        totalUsage: offers.reduce((sum, o) => sum + o.usageCount, 0),
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Offers & Promotions
                    </h1>
                    <p className="text-muted-foreground">
                        Manage discount codes and promotional campaigns
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Offer
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Total Offers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{statsByStatus.total}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Active Offers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {statsByStatus.active}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Total Redemptions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-600">
                            {statsByStatus.totalUsage}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Offers Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Promotions</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Active and expired promotional offers
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Offer Title</TableHead>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Discount</TableHead>
                                    <TableHead>Valid Period</TableHead>
                                    <TableHead>Usage</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {offers.map((offer) => (
                                    <TableRow key={offer.id}>
                                        <TableCell className="font-medium">{offer.title}</TableCell>
                                        <TableCell>
                                            <code className="rounded bg-muted px-2 py-1 text-xs font-mono">
                                                {offer.code}
                                            </code>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                {offer.discountType === "percentage" ? (
                                                    <>
                                                        <Percent className="h-4 w-4 text-muted-foreground" />
                                                        <span>{offer.discountValue}%</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                                        <span>${offer.discountValue}</span>
                                                    </>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                {new Date(offer.validFrom).toLocaleDateString()} -{" "}
                                                {new Date(offer.validTo).toLocaleDateString()}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">
                                                    {offer.usageCount} / {offer.usageLimit}
                                                </div>
                                                <div className="mt-1 h-2 w-24 rounded-full bg-muted">
                                                    <div
                                                        className="h-full rounded-full bg-primary"
                                                        style={{
                                                            width: `${(offer.usageCount / offer.usageLimit) * 100}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusBadge(offer.status)}>
                                                {offer.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">
                                                Edit
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
