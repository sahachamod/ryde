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
import { Bell, Mail, MessageSquare, Send, CheckCircle } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

export default function NotificationsPage() {
    // Mock notifications data
    const notifications = [
        {
            id: "1",
            type: "email",
            recipient: "john.smith@email.com",
            subject: "Booking Confirmation",
            message: "Your booking has been confirmed for Toyota Camry",
            status: "delivered",
            sentAt: "2024-11-28T10:00:00Z",
        },
        {
            id: "2",
            type: "sms",
            recipient: "+1-555-0123",
            subject: "Reminder",
            message: "Your rental pickup is tomorrow at 9:00 AM",
            status: "sent",
            sentAt: "2024-11-27T15:30:00Z",
        },
        {
            id: "3",
            type: "in_app",
            recipient: "Sarah Johnson",
            subject: "Payment Received",
            message: "We have received your payment of $130",
            status: "delivered",
            sentAt: "2024-11-25T16:00:00Z",
        },
    ];

    const getStatusBadge = (status: string) => {
        const variants: Record<string, any> = {
            delivered: "success",
            sent: "default",
            failed: "destructive",
            pending: "pending",
        };
        return variants[status] || "default";
    };

    const getTypeIcon = (type: string) => {
        const icons: Record<string, any> = {
            email: Mail,
            sms: MessageSquare,
            in_app: Bell,
        };
        return icons[type] || Bell;
    };

    const stats = {
        total: notifications.length,
        delivered: notifications.filter((n) => n.status === "delivered").length,
        sent: notifications.filter((n) => n.status === "sent").length,
        failed: notifications.filter((n) => n.status === "failed").length,
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Notifications Center
                    </h1>
                    <p className="text-muted-foreground">
                        Manage and send notifications to customers
                    </p>
                </div>
                <Button>
                    <Send className="mr-2 h-4 w-4" />
                    Send Notification
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">
                            Total Sent
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Delivered</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {stats.delivered}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Sent</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                            {stats.sent}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Failed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">
                            {stats.failed}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Notifications Content */}
            <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all">All Notifications</TabsTrigger>
                    <TabsTrigger value="email">Email</TabsTrigger>
                    <TabsTrigger value="sms">SMS</TabsTrigger>
                    <TabsTrigger value="in_app">In-App</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification History</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Recent notification activity
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Recipient</TableHead>
                                            <TableHead>Subject</TableHead>
                                            <TableHead>Message</TableHead>
                                            <TableHead>Sent At</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {notifications.map((notification) => {
                                            const Icon = getTypeIcon(notification.type);
                                            return (
                                                <TableRow key={notification.id}>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Icon className="h-4 w-4 text-muted-foreground" />
                                                            <span className="capitalize">
                                                                {notification.type.replace("_", " ")}
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {notification.recipient}
                                                    </TableCell>
                                                    <TableCell>{notification.subject}</TableCell>
                                                    <TableCell className="max-w-xs truncate">
                                                        {notification.message}
                                                    </TableCell>
                                                    <TableCell>
                                                        {formatDateTime(notification.sentAt)}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant={getStatusBadge(notification.status)}>
                                                            {notification.status === "delivered" && (
                                                                <CheckCircle className="mr-1 h-3 w-3" />
                                                            )}
                                                            {notification.status}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="email">
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-center text-muted-foreground">
                                Email notifications will appear here
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="sms">
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-center text-muted-foreground">
                                SMS notifications will appear here
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="in_app">
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-center text-muted-foreground">
                                In-app notifications will appear here
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
