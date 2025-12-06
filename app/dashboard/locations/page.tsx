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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Search, MapPin, Phone, Mail, Clock, Edit, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function LocationsPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<any>(null);

    // Mock locations data
    const locations = [
        {
            id: "1",
            name: "Downtown Branch",
            type: "branch" as const,
            address: "123 Main Street",
            city: "Los Angeles",
            state: "CA",
            zipCode: "90001",
            phone: "+1-555-0401",
            email: "downtown@ryderentals.com",
            status: "active" as const,
            availableCars: 25,
            manager: "John Manager",
            facilities: ["Parking", "WiFi", "Lounge"],
            operatingHours: {
                monday: "9:00 AM - 6:00 PM",
                friday: "9:00 AM - 6:00 PM",
            },
            createdAt: "2023-01-15",
        },
        {
            id: "2",
            name: "Airport Pickup",
            type: "pickup_point" as const,
            address: "LAX Terminal 3",
            city: "Los Angeles",
            state: "CA",
            zipCode: "90045",
            phone: "+1-555-0402",
            email: "airport@ryderentals.com",
            status: "active" as const,
            availableCars: 15,
            facilities: ["24/7", "Express Service"],
            operatingHours: {
                monday: "24 Hours",
                friday: "24 Hours",
            },
            createdAt: "2023-02-10",
        },
        {
            id: "3",
            name: "Westside Service Center",
            type: "service_center" as const,
            address: "456 West Avenue",
            city: "Santa Monica",
            state: "CA",
            zipCode: "90401",
            phone: "+1-555-0403",
            email: "westside@ryderentals.com",
            status: "maintenance" as const,
            availableCars: 0,
            manager: "Sarah Service",
            facilities: ["Workshop", "Parking"],
            operatingHours: {
                monday: "8:00 AM - 5:00 PM",
                friday: "8:00 AM - 5:00 PM",
            },
            createdAt: "2023-03-20",
        },
    ];

    const [typeFilter, setTypeFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredLocations = locations.filter((location) => {
        const matchesType = typeFilter === "all" || location.type === typeFilter;
        const matchesSearch =
            location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            location.city.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
    });

    const getStatusBadge = (status: string) => {
        const variants: Record<string, any> = {
            active: "success",
            inactive: "secondary",
            maintenance: "warning",
        };
        return variants[status];
    };

    const getTypeBadge = (type: string) => {
        const variants: Record<string, any> = {
            branch: "default",
            pickup_point: "success",
            service_center: "warning",
        };
        return variants[type];
    };

    const stats = {
        total: locations.length,
        active: locations.filter((l) => l.status === "active").length,
        totalCars: locations.reduce((sum, l) => sum + l.availableCars, 0),
    };

    const handleEdit = (location: any) => {
        setSelectedLocation(location);
        setIsDialogOpen(true);
    };

    const handleAdd = () => {
        setSelectedLocation(null);
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Location Management
                    </h1>
                    <p className="text-muted-foreground">
                        Manage branches, pickup points, and service centers
                    </p>
                </div>
                <Button onClick={handleAdd}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Location
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Total Locations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Active Locations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {stats.active}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Available Cars</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                            {stats.totalCars}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Locations Table */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <CardTitle>All Locations</CardTitle>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search locations..."
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
                                        <SelectItem value="branch">Branch</SelectItem>
                                        <SelectItem value="pickup_point">Pickup Point</SelectItem>
                                        <SelectItem value="service_center">Service Center</SelectItem>
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
                                    <TableHead>Location</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead>Address</TableHead>
                                    <TableHead>Available Cars</TableHead>
                                    <TableHead>Operating Hours</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredLocations.map((location) => (
                                    <TableRow key={location.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                                    <MapPin className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">{location.name}</div>
                                                    {location.manager && (
                                                        <div className="text-sm text-muted-foreground">
                                                            Manager: {location.manager}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getTypeBadge(location.type)}>
                                                {location.type.replace("_", " ")}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1 text-sm">
                                                    <Phone className="h-3 w-3 text-muted-foreground" />
                                                    {location.phone}
                                                </div>
                                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                    <Mail className="h-3 w-3" />
                                                    {location.email}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                <div>{location.address}</div>
                                                <div className="text-muted-foreground">
                                                    {location.city}, {location.state} {location.zipCode}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium">{location.availableCars}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1 text-sm">
                                                <Clock className="h-3 w-3 text-muted-foreground" />
                                                <span>{location.operatingHours.monday}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusBadge(location.status)}>
                                                {location.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEdit(location)}
                                                >
                                                    <Edit className="h-3 w-3" />
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Trash2 className="h-3 w-3 text-destructive" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Add/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedLocation ? "Edit Location" : "Add New Location"}
                        </DialogTitle>
                        <DialogDescription>
                            {selectedLocation
                                ? "Update location details below"
                                : "Fill in the details to create a new location"}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Location Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Downtown Branch"
                                    defaultValue={selectedLocation?.name}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="type">Type</Label>
                                <Select defaultValue={selectedLocation?.type || "branch"}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="branch">Branch</SelectItem>
                                        <SelectItem value="pickup_point">Pickup Point</SelectItem>
                                        <SelectItem value="service_center">Service Center</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                placeholder="123 Main Street"
                                defaultValue={selectedLocation?.address}
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input id="city" defaultValue={selectedLocation?.city} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="state">State</Label>
                                <Input id="state" defaultValue={selectedLocation?.state} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="zip">ZIP Code</Label>
                                <Input id="zip" defaultValue={selectedLocation?.zipCode} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" defaultValue={selectedLocation?.phone} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    defaultValue={selectedLocation?.email}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => setIsDialogOpen(false)}>
                            {selectedLocation ? "Save Changes" : "Create Location"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
