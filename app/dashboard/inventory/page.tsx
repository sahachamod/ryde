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
import { Plus, Search, Package, AlertTriangle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function InventoryPage() {
    // Mock inventory data
    const inventory = [
        {
            id: "1",
            name: "Engine Oil 5W-30",
            category: "parts" as const,
            sku: "EO-5W30-001",
            quantity: 45,
            minQuantity: 20,
            maxQuantity: 100,
            unitPrice: 28.99,
            totalValue: 1304.55,
            supplier: "AutoParts Inc",
            location: "Warehouse A",
            status: "in_stock" as const,
        },
        {
            id: "2",
            name: "Brake Pads Set",
            category: "parts" as const,
            sku: "BP-STD-002",
            quantity: 8,
            minQuantity: 10,
            maxQuantity: 50,
            unitPrice: 89.99,
            totalValue: 719.92,
            supplier: "BrakeMaster",
            location: "Warehouse A",
            status: "low_stock" as const,
        },
        {
            id: "3",
            name: "Car Shampoo",
            category: "cleaning" as const,
            sku: "CS-PRO-003",
            quantity: 0,
            minQuantity: 15,
            maxQuantity: 60,
            unitPrice: 12.99,
            totalValue: 0,
            supplier: "CleanCar Supplies",
            location: "Warehouse B",
            status: "out_of_stock" as const,
        },
    ];

    const [statusFilter, setStatusFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredInventory = inventory.filter((item) => {
        const matchesStatus = statusFilter === "all" || item.status === statusFilter;
        const matchesSearch =
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.sku.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const getStatusBadge = (status: string) => {
        const variants: Record<string, any> = {
            in_stock: "success",
            low_stock: "warning",
            out_of_stock: "destructive",
            ordered: "default",
        };
        return variants[status];
    };

    const stats = {
        totalItems: inventory.length,
        inStock: inventory.filter((i) => i.status === "in_stock").length,
        lowStock: inventory.filter((i) => i.status === "low_stock").length,
        outOfStock: inventory.filter((i) => i.status === "out_of_stock").length,
        totalValue: inventory.reduce((sum, i) => sum + i.totalValue, 0),
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Inventory Management
                    </h1>
                    <p className="text-muted-foreground">
                        Track parts, accessories, and supplies
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-5">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalItems}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">In Stock</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {stats.inStock}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">
                            {stats.lowStock}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">
                            {stats.outOfStock}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatCurrency(stats.totalValue)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Inventory Table */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <CardTitle>Inventory Items</CardTitle>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search inventory..."
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
                                        <SelectItem value="in_stock">In Stock</SelectItem>
                                        <SelectItem value="low_stock">Low Stock</SelectItem>
                                        <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                                        <SelectItem value="ordered">Ordered</SelectItem>
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
                                    <TableHead>Item Name</TableHead>
                                    <TableHead>SKU</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Unit Price</TableHead>
                                    <TableHead>Total Value</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredInventory.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Package className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-medium">{item.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-mono text-sm">
                                            {item.sku}
                                        </TableCell>
                                        <TableCell className="capitalize">{item.category}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{item.quantity}</span>
                                                {item.quantity <= item.minQuantity && (
                                                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                                        <TableCell className="font-medium">
                                            {formatCurrency(item.totalValue)}
                                        </TableCell>
                                        <TableCell>{item.location}</TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusBadge(item.status)}>
                                                {item.status.replace("_", " ")}
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
