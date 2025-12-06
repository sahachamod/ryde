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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Mail, Phone, MapPin, DollarSign, Percent, Save } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">
                    Manage company information, users, and system configuration
                </p>
            </div>

            <Tabs defaultValue="company" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="company">Company</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="branches">Branches</TabsTrigger>
                    <TabsTrigger value="system">System</TabsTrigger>
                </TabsList>

                {/* Company Settings */}
                <TabsContent value="company" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Company Information</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Update your company details
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="company-name">Company Name</Label>
                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="company-name"
                                            defaultValue="Ryde Rent A Car"
                                            className="pl-9"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            defaultValue="contact@ryderentals.com"
                                            className="pl-9"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="phone"
                                            defaultValue="+1-555-RYDE-CAR"
                                            className="pl-9"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="address"
                                            defaultValue="123 Main Street, Los Angeles, CA 90001"
                                            className="pl-9"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <h3 className="mb-4 font-medium">Financial Settings</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="currency">Currency</Label>
                                        <Input id="currency" defaultValue="USD ($)" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                                        <div className="relative">
                                            <Percent className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                id="tax-rate"
                                                type="number"
                                                defaultValue="8.5"
                                                className="pl-9"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Changes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Users Management */}
                <TabsContent value="users" className="space-y-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>User Management</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    Manage admin and staff users
                                </p>
                            </div>
                            <Button>Add User</Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">Admin User</TableCell>
                                        <TableCell>admin@ryderentals.com</TableCell>
                                        <TableCell>
                                            <Badge>Admin</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="success">Active</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">
                                                Edit
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Staff Member</TableCell>
                                        <TableCell>staff@ryderentals.com</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">Staff</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="success">Active</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">
                                                Edit
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Branches */}
                <TabsContent value="branches" className="space-y-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Branch Locations</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    Manage rental locations and branches
                                </p>
                            </div>
                            <Button>Add Branch</Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {["Main Branch", "Airport Branch", "Downtown Branch"].map(
                                    (branch, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between rounded-lg border p-4"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                                    <MapPin className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{branch}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Los Angeles, CA • 15 vehicles
                                                    </p>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                Manage
                                            </Button>
                                        </div>
                                    )
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* System Settings */}
                <TabsContent value="system" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>System Configuration</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Configure integrations and system settings
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="mb-4 font-medium">Payment Gateway</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Provider</Label>
                                        <Input defaultValue="Stripe" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>API Key</Label>
                                        <Input type="password" defaultValue="sk_test_..." />
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-6">
                                <h3 className="mb-4 font-medium">Storage Configuration</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>S3 Bucket</Label>
                                        <Input defaultValue="ryde-car-rental" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Region</Label>
                                        <Input defaultValue="us-east-1" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Configuration
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
