'use client'
import React, { useMemo, useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CalendarCheck, Users, Car, Clock, MapPin, AlertCircle, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// --- Types ---
interface Booking {
    id: number;
    date: Date;
    customerName: string;
    vehicleName: string;
    vehicleId: number;
    driverName?: string;
    driverId?: number;
    status: "confirmed" | "pending" | "completed" | "cancelled";
    startTime: string;
    endTime: string;
    pickupLocation: string;
    phone: string;
}

interface Complaint {
    id: number;
    date: Date;
    customerId: number;
    customerName: string;
    vehicleId: number;
    vehicleName: string;
    bookingId?: number;
    subject: string;
    description: string;
    priority: "low" | "medium" | "high" | "critical";
    status: "open" | "investigating" | "resolved" | "closed";
    phone: string;
}

interface VehicleHandover {
    id: number;
    date: Date;
    bookingId: number;
    vehicleId: number;
    vehicleName: string;
    customerName: string;
    handoverType: "pickup" | "return";
    time: string;
    condition: "excellent" | "good" | "fair" | "needs_inspection" | "damaged";
    mileage: number;
    fuelLevel: number;
    notes?: string;
    phone: string;
}

interface VehicleIssue {
    id: number;
    date: Date;
    vehicleName: string;
    vehicleId: number;
    issueType: "maintenance" | "repair" | "inspection" | "cleaning";
    description: string;
    priority: "low" | "medium" | "high" | "critical";
    status: "reported" | "in_progress" | "resolved";
}

interface VehicleTransfer {
    id: number;
    date: Date;
    vehicleName: string;
    vehicleId: number;
    fromLocation: string;
    toLocation: string;
    transferTime: string;
    driverName: string;
    status: "scheduled" | "in_transit" | "completed";
}

interface Driver {
    id: number;
    name: string;
    phone: string;
    status: "available" | "assigned" | "off_duty";
}

// --- Helpers ---
const dateKey = (d: Date) => d.toISOString().slice(0, 10);

export default function CalendarPage() {
    // Get current date
    const currentDate = new Date();
    const [currentMonth, setCurrentMonth] = useState<Date>(currentDate); // Current month and year
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(currentDate); // Today's date

    // --- Mock Data ---
    const mockVehicles = [
        { id: 1, name: "Toyota Camry 2023", category: "Sedan" },
        { id: 2, name: "Honda CR-V 2024", category: "SUV" },
        { id: 3, name: "Tesla Model 3", category: "Electric" },
        { id: 4, name: "BMW X5 2024", category: "Luxury SUV" },
        { id: 5, name: "Mercedes-Benz E-Class", category: "Luxury Sedan" },
    ];

    const mockDrivers: Driver[] = [
        { id: 1, name: "Michael Johnson", phone: "+1 555-0101", status: "assigned" },
        { id: 2, name: "Sarah Williams", phone: "+1 555-0102", status: "assigned" },
        { id: 3, name: "Robert Brown", phone: "+1 555-0103", status: "available" },
    ];

    const mockBookings: Booking[] = [
        {
            id: 1,
            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15), // 15th of current month
            customerName: "John Smith",
            vehicleName: "Toyota Camry 2023",
            vehicleId: 1,
            driverName: "Michael Johnson",
            driverId: 1,
            status: "confirmed",
            startTime: "09:00",
            endTime: "17:00",
            pickupLocation: "Downtown Office",
            phone: "+1 234-567-8901",
        },
        {
            id: 2,
            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 22), // 22nd of current month
            customerName: "Alice Brown",
            vehicleName: "Honda CR-V 2024",
            vehicleId: 2,
            status: "confirmed",
            startTime: "10:00",
            endTime: "18:00",
            pickupLocation: "Airport",
            phone: "+1 234-567-8902",
        },
        {
            id: 3,
            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8), // 8th of current month
            customerName: "Bob Wilson",
            vehicleName: "Tesla Model 3",
            vehicleId: 3,
            driverName: "Sarah Williams",
            driverId: 2,
            status: "completed",
            startTime: "08:00",
            endTime: "16:00",
            pickupLocation: "Hotel Plaza",
            phone: "+1 234-567-8903",
        },
        {
            id: 4,
            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 29), // 29th of current month
            customerName: "Carol Davis",
            vehicleName: "BMW X5 2024",
            vehicleId: 4,
            status: "pending",
            startTime: "09:00",
            endTime: "17:00",
            pickupLocation: "City Center",
            phone: "+1 234-567-8904",
        },
        {
            id: 5,
            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 16), // 16th of current month
            customerName: "David Lee",
            vehicleName: "Mercedes-Benz E-Class",
            vehicleId: 5,
            driverName: "Robert Brown",
            driverId: 3,
            status: "confirmed",
            startTime: "10:00",
            endTime: "18:00",
            pickupLocation: "Train Station",
            phone: "+1 234-567-8905",
        },
    ];

    const mockComplaints: Complaint[] = [
        {
            id: 1,
            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9), // 9th of current month
            customerId: 3,
            customerName: "Bob Wilson",
            vehicleId: 3,
            vehicleName: "Tesla Model 3",
            bookingId: 3,
            subject: "Vehicle cleanliness issue",
            description: "The vehicle interior was not properly cleaned before pickup.",
            priority: "medium",
            status: "resolved",
            phone: "+1 234-567-8903",
        },
    ];

    const mockHandovers: VehicleHandover[] = [
        {
            id: 1,
            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15), // 15th of current month
            bookingId: 1,
            vehicleId: 1,
            vehicleName: "Toyota Camry 2023",
            customerName: "John Smith",
            handoverType: "pickup",
            time: "09:00",
            condition: "excellent",
            mileage: 15420,
            fuelLevel: 100,
            notes: "Vehicle in perfect condition.",
            phone: "+1 234-567-8901",
        },
        {
            id: 2,
            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 23), // 23rd of current month
            bookingId: 2,
            vehicleId: 2,
            vehicleName: "Honda CR-V 2024",
            customerName: "Alice Brown",
            handoverType: "return",
            time: "18:00",
            condition: "good",
            mileage: 16200,
            fuelLevel: 75,
            notes: "Minor scratch on rear bumper.",
            phone: "+1 234-567-8902",
        },
    ];

    const mockIssues: VehicleIssue[] = [
        {
            id: 1,
            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 17), // 17th of current month
            vehicleName: "Honda CR-V 2024",
            vehicleId: 2,
            issueType: "maintenance",
            description: "Scheduled oil change and tire rotation",
            priority: "medium",
            status: "resolved",
        },
    ];

    const mockTransfers: VehicleTransfer[] = [
        {
            id: 1,
            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 24), // 24th of current month
            vehicleName: "Honda CR-V 2024",
            vehicleId: 2,
            fromLocation: "Downtown Office",
            toLocation: "Airport Branch",
            transferTime: "06:00",
            driverName: "Michael Johnson",
            status: "completed",
        },
    ];

    // --- Computed Data ---
    const eventsByDate = useMemo(() => {
        const grouped: Record<string, {
            bookings: Booking[];
            complaints: Complaint[];
            handovers: VehicleHandover[];
            issues: VehicleIssue[];
            transfers: VehicleTransfer[];
        }> = {};

        const ensureKey = (d: Date) => {
            const k = dateKey(d);
            if (!grouped[k]) {
                grouped[k] = { bookings: [], complaints: [], handovers: [], issues: [], transfers: [] };
            }
            return k;
        };

        mockBookings.forEach((b) => grouped[ensureKey(b.date)].bookings.push(b));
        mockComplaints.forEach((c) => grouped[ensureKey(c.date)].complaints.push(c));
        mockHandovers.forEach((h) => grouped[ensureKey(h.date)].handovers.push(h));
        mockIssues.forEach((i) => grouped[ensureKey(i.date)].issues.push(i));
        mockTransfers.forEach((t) => grouped[ensureKey(t.date)].transfers.push(t));

        return grouped;
    }, [mockBookings, mockComplaints, mockHandovers, mockIssues, mockTransfers]);

    const selectedEvents = useMemo(() => {
        if (!selectedDate) return null;
        return eventsByDate[dateKey(selectedDate)] || {
            bookings: [],
            complaints: [],
            handovers: [],
            issues: [],
            transfers: [],
        };
    }, [selectedDate, eventsByDate]);

    const { availableDrivers, availableVehicles } = useMemo(() => {
        if (!selectedDate) return { availableDrivers: [], availableVehicles: [] };

        const key = dateKey(selectedDate);
        const dayEvents = eventsByDate[key];

        const busyDriverIds = new Set<number>();
        const busyVehicleIds = new Set<number>();

        if (dayEvents) {
            dayEvents.bookings.forEach(b => {
                if (b.status === 'confirmed' || b.status === 'pending' || b.status === 'completed') {
                    if (b.driverId) busyDriverIds.add(b.driverId);
                    busyVehicleIds.add(b.vehicleId);
                }
            });
            dayEvents.transfers.forEach(t => {
                if (t.status !== 'completed') {
                    busyVehicleIds.add(t.vehicleId);
                }
            });
        }

        const drivers = mockDrivers.filter(d => !busyDriverIds.has(d.id));
        const vehicles = mockVehicles.filter(v => !busyVehicleIds.has(v.id));

        return { availableDrivers: drivers, availableVehicles: vehicles };
    }, [selectedDate, eventsByDate, mockDrivers, mockVehicles]);

    const getStatusColor = (status: string) => {
        const map: Record<string, string> = {
            confirmed: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
            pending: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800",
            completed: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
            cancelled: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
            low: "bg-white text-gray-700 border-gray-200 dark:bg-slate-800 dark:text-gray-300 dark:border-slate-700",
            medium: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800",
            high: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
            critical: "bg-red-600 text-white border-red-700 dark:bg-red-700 dark:border-red-600",
            reported: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800",
            in_progress: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
            resolved: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
        };
        return map[status] || "bg-white text-gray-700 border-gray-200 dark:bg-slate-800 dark:text-gray-300 dark:border-slate-700";
    };

    // Custom modifiers for Calendar
    const modifiers = {
        hasBooking: (date: Date) => {
            const events = eventsByDate[dateKey(date)];
            return events && events.bookings.length > 0;
        },
        hasComplaint: (date: Date) => {
            const events = eventsByDate[dateKey(date)];
            return events && events.complaints.length > 0;
        },
        hasIssue: (date: Date) => {
            const events = eventsByDate[dateKey(date)];
            return events && events.issues.length > 0;
        },
        hasHandover: (date: Date) => {
            const events = eventsByDate[dateKey(date)];
            return events && events.handovers.length > 0;
        }
    };

    const modifiersClassNames = {
        hasBooking: "font-bold text-blue-600 dark:text-blue-400",
        hasComplaint: "font-bold text-red-600 underline decoration-red-600 dark:text-red-400 dark:decoration-red-400",
        hasIssue: "font-bold text-orange-600 dark:text-orange-400",
        hasHandover: "font-bold text-emerald-600 dark:text-emerald-400"
    };

    // Navigation functions
    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentMonth(prev => {
            const newMonth = new Date(prev);
            if (direction === 'prev') {
                newMonth.setMonth(newMonth.getMonth() - 1);
            } else {
                newMonth.setMonth(newMonth.getMonth() + 1);
            }
            return newMonth;
        });
    };

    const getMonthYearString = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-6 md:p-12 font-sans">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Operations Calendar</h1>
                        <p className="text-muted-foreground mt-2 text-lg">
                            Manage bookings, vehicle handovers, and fleet status efficiently.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge variant="outline" className="h-9 gap-2 px-3 text-sm bg-background border shadow-sm">
                            <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                            Booking
                        </Badge>
                        <Badge variant="outline" className="h-9 gap-2 px-3 text-sm bg-background border shadow-sm">
                            <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                            Alert
                        </Badge>
                        <Badge variant="outline" className="h-9 gap-2 px-3 text-sm bg-background border shadow-sm">
                            <div className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                            Issue
                        </Badge>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-12 items-start">
                    {/* Calendar Section */}
                    <div className="lg:col-span-4 space-y-6">
                        <Card className="shadow-lg border bg-card overflow-hidden ring-1 ring-inset">
                            <CardHeader className="bg-card pb-4 border-b">
                                <CardTitle className="flex items-center justify-between text-base font-semibold">
                                    <div className="flex items-center gap-2">
                                        <CalendarCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        {getMonthYearString(currentMonth)}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => navigateMonth('prev')}
                                            className="p-1.5 hover:bg-muted rounded-md transition-colors"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => navigateMonth('next')}
                                            className="p-1.5 hover:bg-muted rounded-md transition-colors"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    month={currentMonth}
                                    onMonthChange={setCurrentMonth}
                                    weekStartsOn={1}
                                    className="w-full p-4"
                                    modifiers={modifiers}
                                    modifiersClassNames={modifiersClassNames}
                                    classNames={{
                                        day_selected: "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90 shadow-md",
                                        day_today: "bg-muted text-foreground font-bold",
                                        head_cell: "text-muted-foreground font-medium text-xs pt-2 pb-2 uppercase tracking-wider",
                                        cell: "h-12 w-12 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
                                        day: "h-12 w-12 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-lg transition-all",
                                    }}
                                />
                            </CardContent>
                        </Card>

                        {/* Summary Card for Selected Date */}
                        {
                            selectedEvents && (
                                <Card className="shadow-md border bg-card ring-1 ring-inset">
                                    <CardHeader className="pb-3 pt-5 border-b">
                                        <CardTitle className="text-sm font-semibold flex items-center justify-between">
                                            <span>{selectedDate?.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</span>
                                            <Badge variant="outline" className="bg-muted text-xs font-medium border">
                                                Daily Summary
                                            </Badge>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-2 gap-4 p-5">
                                        <div className="bg-card p-4 rounded-xl border shadow-sm flex flex-col items-center justify-center gap-1.5 transition-all hover:border-muted-foreground/20 hover:shadow-md">
                                            <span className="text-3xl font-bold">{selectedEvents.bookings.length}</span>
                                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Bookings</span>
                                        </div>
                                        <div className="bg-card p-4 rounded-xl border shadow-sm flex flex-col items-center justify-center gap-1.5 transition-all hover:border-muted-foreground/20 hover:shadow-md">
                                            <span className="text-3xl font-bold">{selectedEvents.handovers.length}</span>
                                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Handovers</span>
                                        </div>
                                        <div className="bg-card p-4 rounded-xl border shadow-sm flex flex-col items-center justify-center gap-1.5 transition-all hover:border-muted-foreground/20 hover:shadow-md">
                                            <span className={cn("text-3xl font-bold", selectedEvents.complaints.length > 0 ? "text-red-600 dark:text-red-400" : "")}>
                                                {selectedEvents.complaints.length}
                                            </span>
                                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Alerts</span>
                                        </div>
                                        <div className="bg-card p-4 rounded-xl border shadow-sm flex flex-col items-center justify-center gap-1.5 transition-all hover:border-muted-foreground/20 hover:shadow-md">
                                            <span className={cn("text-3xl font-bold", selectedEvents.issues.length > 0 ? "text-orange-600 dark:text-orange-400" : "")}>
                                                {selectedEvents.issues.length}
                                            </span>
                                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Issues</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        }
                    </div>

                    {/* Details Section */}
                    <div className="lg:col-span-8 space-y-8">
                        <Tabs defaultValue="overview" className="w-full">
                            <div className="flex items-center justify-between mb-8">
                                <TabsList className="bg-card border p-1.5 shadow-sm rounded-xl h-auto">
                                    <TabsTrigger value="overview" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-none px-6 py-2.5 rounded-lg transition-all font-medium">Overview</TabsTrigger>
                                    <TabsTrigger value="fleet" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-none px-6 py-2.5 rounded-lg transition-all font-medium">Fleet Status</TabsTrigger>
                                    <TabsTrigger value="issues" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-none px-6 py-2.5 rounded-lg transition-all font-medium">
                                        Issues & Alerts
                                        {(selectedEvents?.complaints.length || 0) + (selectedEvents?.issues.length || 0) > 0 && (
                                            <span className="ml-2 flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
                                        )}
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="overview" className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                {selectedEvents && (selectedEvents.bookings.length > 0 || selectedEvents.handovers.length > 0) ? (
                                    <>
                                        {selectedEvents.bookings.length > 0 && (
                                            <Card className="border-0 shadow-none bg-transparent">
                                                <div className="mb-4 flex items-center gap-3">
                                                    <div className="p-2 bg-card rounded-lg shadow-sm border">
                                                        <CalendarCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                    </div>
                                                    <h3 className="text-lg font-bold">Scheduled Bookings</h3>
                                                </div>
                                                <div className="grid gap-4">
                                                    {selectedEvents.bookings.map((booking) => (
                                                        <div key={booking.id} className="group flex flex-col md:flex-row md:items-center justify-between p-5 rounded-xl border bg-card shadow-sm hover:shadow-md transition-all duration-200">
                                                            <div className="flex items-start gap-5">
                                                                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400 font-bold text-base border border-blue-200 dark:border-blue-800">
                                                                    {booking.customerName.charAt(0)}
                                                                </div>
                                                                <div className="space-y-1.5">
                                                                    <div className="flex items-center gap-3">
                                                                        <span className="font-bold text-lg">{booking.customerName}</span>
                                                                        <Badge variant="secondary" className={cn("h-6 px-2.5 text-[10px] uppercase tracking-wider font-bold", getStatusColor(booking.status))}>
                                                                            {booking.status}
                                                                        </Badge>
                                                                    </div>
                                                                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                                                        <span className="flex items-center gap-1.5"><Car className="h-4 w-4" /> {booking.vehicleName}</span>
                                                                        <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {booking.startTime} - {booking.endTime}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                                                        <MapPin className="h-4 w-4" /> {booking.pickupLocation}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mt-4 md:mt-0 md:text-right flex md:flex-col items-center md:items-end justify-between gap-2">
                                                                {booking.driverName ? (
                                                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-muted border rounded-full text-xs font-semibold">
                                                                        <Users className="h-3 w-3 text-muted-foreground" />
                                                                        {booking.driverName}
                                                                    </div>
                                                                ) : (
                                                                    <div className="text-xs text-amber-600 dark:text-amber-400 font-medium px-3 py-1.5 bg-amber-100 dark:bg-amber-900/20 rounded-full border border-amber-200 dark:border-amber-800">
                                                                        No Driver Assigned
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Card>
                                        )}

                                        {selectedEvents.handovers.length > 0 && (
                                            <Card className="border-0 shadow-none bg-transparent">
                                                <div className="mb-4 flex items-center gap-3">
                                                    <div className="p-2 bg-card rounded-lg shadow-sm border">
                                                        <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                                    </div>
                                                    <h3 className="text-lg font-bold">Vehicle Handovers</h3>
                                                </div>
                                                <div className="grid gap-4">
                                                    {selectedEvents.handovers.map((handover) => (
                                                        <div key={handover.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-xl border bg-card shadow-sm hover:shadow-md transition-all duration-200">
                                                            <div className="flex gap-5">
                                                                <div className={cn("h-12 w-12 rounded-full flex items-center justify-center shrink-0 border", handover.handoverType === 'pickup' ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" : "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800")}>
                                                                    {handover.handoverType === 'pickup' ? <Car className="h-6 w-6" /> : <CheckCircle2 className="h-6 w-6" />}
                                                                </div>
                                                                <div>
                                                                    <div className="font-bold text-lg">{handover.handoverType === 'pickup' ? 'Vehicle Pickup' : 'Vehicle Return'}</div>
                                                                    <div className="text-sm font-medium">{handover.vehicleName}</div>
                                                                    <div className="text-xs text-muted-foreground mt-1">Customer: <span className="font-medium">{handover.customerName}</span></div>
                                                                    <div className="flex gap-2 mt-3">
                                                                        <Badge variant="outline" className="text-[10px] bg-muted border font-semibold">{handover.condition} condition</Badge>
                                                                        <Badge variant="outline" className="text-[10px] bg-muted border font-semibold">Fuel: {handover.fuelLevel}%</Badge>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mt-4 sm:mt-0 text-sm font-bold bg-muted border px-4 py-2 rounded-lg">{handover.time}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Card>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border rounded-2xl bg-background/50">
                                        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-5 border">
                                            <CalendarCheck className="h-8 w-8 text-muted-foreground" />
                                        </div>
                                        <h3 className="text-xl font-bold">No scheduled events</h3>
                                        <p className="text-muted-foreground max-w-sm mt-2">
                                            There are no bookings or handovers scheduled for this date.
                                        </p>
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="fleet" className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <Card className="shadow-sm border bg-card">
                                        <CardHeader className="pb-4 border-b">
                                            <CardTitle className="text-base flex items-center gap-2">
                                                <Car className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                Available Vehicles
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="pt-4">
                                            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                                {availableVehicles.length > 0 ? availableVehicles.map(vehicle => (
                                                    <div key={vehicle.id} className="flex items-center justify-between p-4 bg-muted rounded-xl border hover:border-muted-foreground/20 transition-colors">
                                                        <div>
                                                            <div className="font-semibold text-sm">{vehicle.name}</div>
                                                            <div className="text-xs text-muted-foreground mt-0.5">{vehicle.category}</div>
                                                        </div>
                                                        <Badge className="bg-card text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 shadow-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/20">Available</Badge>
                                                    </div>
                                                )) : (
                                                    <div className="text-sm text-muted-foreground text-center py-12 bg-muted rounded-xl border border-dashed">No vehicles available</div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="shadow-sm border bg-card">
                                        <CardHeader className="pb-4 border-b">
                                            <CardTitle className="text-base flex items-center gap-2">
                                                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                Available Drivers
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="pt-4">
                                            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                                {availableDrivers.length > 0 ? availableDrivers.map(driver => (
                                                    <div key={driver.id} className="flex items-center justify-between p-4 bg-muted rounded-xl border hover:border-muted-foreground/20 transition-colors">
                                                        <div className="flex items-center gap-3">
                                                            <Avatar className="h-9 w-9 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                                                                <AvatarFallback className="text-xs font-bold">{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <div className="font-semibold text-sm">{driver.name}</div>
                                                                <div className="text-xs text-muted-foreground mt-0.5">{driver.phone}</div>
                                                            </div>
                                                        </div>
                                                        <Badge className="bg-card text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 shadow-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/20">Available</Badge>
                                                    </div>
                                                )) : (
                                                    <div className="text-sm text-muted-foreground text-center py-12 bg-muted rounded-xl border border-dashed">No drivers available</div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>

                            <TabsContent value="issues" className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                <Card className="shadow-sm border bg-card">
                                    <CardHeader className="border-b bg-card pb-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle className="text-xl flex items-center gap-2.5">
                                                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
                                                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                                                    </div>
                                                    Active Reports
                                                </CardTitle>
                                                <CardDescription className="mt-2 text-muted-foreground">
                                                    Review and resolve active complaints and vehicle issues.
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        {selectedEvents && (selectedEvents.complaints.length > 0 || selectedEvents.issues.length > 0) ? (
                                            <div className="space-y-8">
                                                {selectedEvents.complaints.length > 0 && (
                                                    <div>
                                                        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                                                            Customer Complaints
                                                            <Badge variant="secondary" className="rounded-full h-5 min-w-[1.25rem] px-1 flex items-center justify-center bg-muted">{selectedEvents.complaints.length}</Badge>
                                                        </h3>
                                                        <div className="space-y-4">
                                                            {selectedEvents.complaints.map(complaint => (
                                                                <div key={complaint.id} className="p-5 border-l-4 border-l-red-500 bg-card shadow-sm border-y border-r rounded-r-xl hover:shadow-md transition-shadow">
                                                                    <div className="flex justify-between items-start mb-3">
                                                                        <div className="font-bold">{complaint.subject}</div>
                                                                        <Badge className={cn("capitalize shadow-none", getStatusColor(complaint.priority))}>{complaint.priority}</Badge>
                                                                    </div>
                                                                    <p className="text-sm mb-4 leading-relaxed bg-muted p-3 rounded-lg border">{complaint.description}</p>
                                                                    <div className="flex items-center gap-5 text-xs text-muted-foreground">
                                                                        <span className="flex items-center gap-1.5 font-medium"><Users className="h-3.5 w-3.5" /> {complaint.customerName}</span>
                                                                        <span className="flex items-center gap-1.5 font-medium"><Car className="h-3.5 w-3.5" /> {complaint.vehicleName}</span>
                                                                        <span className="ml-auto font-mono text-muted-foreground/50">ID: #{complaint.id}</span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                {selectedEvents.issues.length > 0 && (
                                                    <div>
                                                        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                                                            Vehicle Issues
                                                            <Badge variant="secondary" className="rounded-full h-5 min-w-[1.25rem] px-1 flex items-center justify-center bg-muted">{selectedEvents.issues.length}</Badge>
                                                        </h3>
                                                        <div className="space-y-4">
                                                            {selectedEvents.issues.map(issue => (
                                                                <div key={issue.id} className="p-5 border-l-4 border-l-orange-500 bg-card shadow-sm border-y border-r rounded-r-xl hover:shadow-md transition-shadow">
                                                                    <div className="flex justify-between items-start mb-3">
                                                                        <div className="font-bold">{issue.vehicleName}</div>
                                                                        <Badge className={cn("capitalize shadow-none", getStatusColor(issue.priority))}>{issue.priority}</Badge>
                                                                    </div>
                                                                    <div className="flex items-center gap-2 mb-3">
                                                                        <Badge variant="outline" className="text-xs bg-muted border font-medium">{issue.issueType}</Badge>
                                                                    </div>
                                                                    <p className="text-sm mb-1">{issue.description}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="text-center py-16 bg-muted/50 rounded-2xl border-2 border-dashed border-border">
                                                <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-emerald-400 opacity-50" />
                                                <p className="text-lg font-bold">All Clear</p>
                                                <p className="text-sm text-muted-foreground">No complaints or issues reported for this day.</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}