"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Car,
    CalendarCheck,
    DollarSign,
    Users,
    TrendingUp,
    TrendingDown,
    Star,
    Trophy,
    Building2,
    ThumbsUp
} from "lucide-react";
import { mockDashboardStats, mockRevenueData, mockBookings } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
    const stats = mockDashboardStats;
    const revenueData = mockRevenueData;
    const recentBookings = mockBookings;

    // Calendar state
    const [date, setDate] = useState<Date | undefined>(new Date());

    // Driver availability dates
    const driverAvailability = [
        {
            driverId: 1,
            driverName: "Michael Johnson",
            availableDates: [
                new Date(2025, 10, 28),
                new Date(2025, 10, 29),
                new Date(2025, 11, 1),
                new Date(2025, 11, 2),
                new Date(2025, 11, 5),
            ],
        },
        {
            driverId: 2,
            driverName: "Sarah Williams",
            availableDates: [
                new Date(2025, 10, 28),
                new Date(2025, 10, 30),
                new Date(2025, 11, 3),
                new Date(2025, 11, 4),
            ],
        },
        {
            driverId: 3,
            driverName: "Robert Brown",
            availableDates: [
                new Date(2025, 11, 1),
                new Date(2025, 11, 2),
                new Date(2025, 11, 6),
                new Date(2025, 11, 7),
            ],
        },
    ];

    // Get all available dates from all drivers
    const allAvailableDates = driverAvailability.flatMap(d => d.availableDates);

    // Get drivers available on selected date
    const getAvailableDrivers = (selectedDate: Date | undefined) => {
        if (!selectedDate) return [];
        return driverAvailability.filter(driver =>
            driver.availableDates.some(
                d => d.toDateString() === selectedDate.toDateString()
            )
        );
    };

    // Top Drivers Data
    const topDrivers = [
        { id: 1, name: "Michael Johnson", trips: 156, rating: 4.9, revenue: 45680, avatar: "MJ" },
        { id: 2, name: "Sarah Williams", trips: 142, rating: 4.8, revenue: 42100, avatar: "SW" },
        { id: 3, name: "Robert Brown", trips: 128, rating: 4.7, revenue: 38900, avatar: "RB" },
        { id: 4, name: "Emily Davis", trips: 115, rating: 4.8, revenue: 35200, avatar: "ED" },
        { id: 5, name: "James Wilson", trips: 98, rating: 4.6, revenue: 29800, avatar: "JW" },
    ];

    // Top Vehicle Owners Data
    const topOwners = [
        { id: 1, name: "Elite Auto Group", vehicles: 15, revenue: 125000, type: "company" },
        { id: 2, name: "Premium Fleet Services", vehicles: 28, revenue: 98000, type: "fleet" },
        { id: 3, name: "John Anderson", vehicles: 3, revenue: 45000, type: "individual" },
        { id: 4, name: "City Car Rentals LLC", vehicles: 12, revenue: 67000, type: "company" },
        { id: 5, name: "Sarah Miller", vehicles: 2, revenue: 28000, type: "individual" },
    ];

    // Most Rented Vehicles Data
    const topVehicles = [
        { id: 1, brand: "Toyota", model: "Camry", rentals: 89, rating: 4.7, revenue: 38900 },
        { id: 2, brand: "Honda", model: "CR-V", rentals: 76, rating: 4.8, revenue: 42300 },
        { id: 3, brand: "Tesla", model: "Model 3", rentals: 68, rating: 4.9, revenue: 52000 },
        { id: 4, brand: "BMW", model: "X5", rentals: 54, rating: 4.6, revenue: 48600 },
        { id: 5, brand: "Mercedes", model: "C-Class", rentals: 47, rating: 4.7, revenue: 43200 },
    ];

    // Company Income Data (Multiple metrics)
    const incomeData = [
        { month: "Jan", rental: 45000, services: 12000, penalties: 2000 },
        { month: "Feb", rental: 52000, services: 14000, penalties: 1800 },
        { month: "Mar", rental: 48000, services: 13500, penalties: 2200 },
        { month: "Apr", rental: 61000, services: 16000, penalties: 1500 },
        { month: "May", rental: 58000, services: 15500, penalties: 1900 },
        { month: "Jun", rental: 65000, services: 17000, penalties: 1600 },
    ];

    // Revenue Distribution
    const revenueDistribution = [
        { name: "Car Rentals", value: 65, color: "#3b82f6" },
        { name: "Services", value: 22, color: "#10b981" },
        { name: "Insurance", value: 8, color: "#f59e0b" },
        { name: "Penalties", value: 5, color: "#ef4444" },
    ];

    // User Reviews/Experiences
    const userReviews = [
        {
            id: 1,
            name: "Alice Cooper",
            rating: 5,
            comment: "Excellent service! The car was clean and in perfect condition.",
            date: "2024-11-25",
            car: "Toyota Camry"
        },
        {
            id: 2,
            name: "Bob Martinez",
            rating: 4,
            comment: "Great experience overall. Easy booking process and friendly staff.",
            date: "2024-11-24",
            car: "Honda CR-V"
        },
        {
            id: 3,
            name: "Carol White",
            rating: 5,
            comment: "Best car rental service in town! Will definitely book again.",
            date: "2024-11-23",
            car: "Tesla Model 3"
        },
    ];

    const statsCards = [
        {
            title: "Total Cars",
            value: stats.totalCars,
            subtitle: `${stats.availableCars} available`,
            icon: Car,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
            trend: "+2 this month",
            trendUp: true,
        },
        {
            title: "Active Bookings",
            value: stats.activeBookings,
            subtitle: `${stats.completedBookings} completed`,
            icon: CalendarCheck,
            color: "text-green-600",
            bgColor: "bg-green-100",
            trend: "+15% vs last month",
            trendUp: true,
        },
        {
            title: "Monthly Revenue",
            value: formatCurrency(stats.monthlyRevenue),
            subtitle: `${formatCurrency(stats.totalRevenue)} total`,
            icon: DollarSign,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
            trend: "+8.2% vs last month",
            trendUp: true,
        },
        {
            title: "Total Customers",
            value: stats.totalCustomers,
            subtitle: `${stats.newCustomers} new this month`,
            icon: Users,
            color: "text-orange-600",
            bgColor: "bg-orange-100",
            trend: "+12 this month",
            trendUp: true,
        },
    ];

    const getStatusBadge = (status: string) => {
        const variants: Record<string, any> = {
            pending: "pending",
            confirmed: "default",
            active: "success",
            completed: "secondary",
            cancelled: "destructive",
        };
        return variants[status] || "default";
    };

    const getTrophyColor = (index: number) => {
        const colors = [
            "text-yellow-500",
            "text-gray-400",
            "text-amber-600",
            "text-blue-500",
            "text-purple-500",
        ];
        return colors[index] || "text-gray-400";
    };

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {statsCards.map((stat, index) => (
                    <Card key={index} className="overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <div className={`rounded-full p-2 ${stat.bgColor}`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                            <div className="mt-2 flex items-center text-xs">
                                {stat.trendUp ? (
                                    <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                                ) : (
                                    <TrendingDown className="mr-1 h-3 w-3 text-red-600" />
                                )}
                                <span className={stat.trendUp ? "text-green-600" : "text-red-600"}>
                                    {stat.trend}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Bookings */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Latest booking activities
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentBookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg border p-4 transition-colors hover:bg-accent gap-4"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                                        <Car className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            {booking.car.brand} {booking.car.model}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {booking.customer.name} • {booking.bookingNumber}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="font-medium">{formatCurrency(booking.totalAmount)}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {booking.totalDays} {booking.totalDays === 1 ? "day" : "days"}
                                        </p>
                                    </div>
                                    <Badge variant={getStatusBadge(booking.status)}>
                                        {booking.status}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Charts Row 1: Company Income & Revenue Distribution */}
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                {/* Company Income Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Company Income Breakdown</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Revenue streams over the last 6 months
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={incomeData}>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                    <XAxis dataKey="month" className="text-xs" />
                                    <YAxis tickFormatter={(value) => `$${value / 1000}k`} className="text-xs" />
                                    <Tooltip formatter={(value: any) => [`$${value}`, ""]} />
                                    <Legend />
                                    <Area
                                        type="monotone"
                                        dataKey="rental"
                                        stackId="1"
                                        stroke="#3b82f6"
                                        fill="#3b82f6"
                                        fillOpacity={0.6}
                                        name="Rentals"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="services"
                                        stackId="1"
                                        stroke="#10b981"
                                        fill="#10b981"
                                        fillOpacity={0.6}
                                        name="Services"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="penalties"
                                        stackId="1"
                                        stroke="#ef4444"
                                        fill="#ef4444"
                                        fillOpacity={0.6}
                                        name="Penalties"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Revenue Distribution Pie Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Revenue Distribution</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Breakdown by category
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={revenueDistribution}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, value }) => `${name}: ${value}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {revenueDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value: any) => [`${value}%`, ""]} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Revenue Trend Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Daily revenue for the last 30 days
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={(value) => {
                                        const date = new Date(value);
                                        return `${date.getMonth() + 1}/${date.getDate()}`;
                                    }}
                                    className="text-xs"
                                />
                                <YAxis
                                    tickFormatter={(value) => `$${value}`}
                                    className="text-xs"
                                />
                                <Tooltip
                                    formatter={(value: any) => [`$${value}`, "Revenue"]}
                                    labelFormatter={(label) => `Date: ${label}`}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Top Performers Row */}
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
                {/* Top Drivers */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Trophy className="h-5 w-5 text-yellow-500" />
                            Top Drivers
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Best performing drivers this month
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topDrivers.map((driver, index) => (
                                <div
                                    key={driver.id}
                                    className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <Trophy className={`h-5 w-5 ${getTrophyColor(index)}`} />
                                        <Avatar className="h-10 w-10">
                                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                                {driver.avatar}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium text-sm">{driver.name}</p>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <span>{driver.trips} trips</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                    {driver.rating}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-sm">{formatCurrency(driver.revenue)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Top Vehicle Owners */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-blue-500" />
                            Top Vehicle Owners
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Highest revenue owners
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topOwners.map((owner, index) => (
                                <div
                                    key={owner.id}
                                    className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <Trophy className={`h-5 w-5 ${getTrophyColor(index)}`} />
                                        <div>
                                            <p className="font-medium text-sm">{owner.name}</p>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <span>{owner.vehicles} vehicles</span>
                                                <span>•</span>
                                                <Badge variant="secondary" className="text-xs px-1 py-0">
                                                    {owner.type}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-sm">{formatCurrency(owner.revenue)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Most Rented Vehicles */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Car className="h-5 w-5 text-green-500" />
                            Most Rented Vehicles
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Top performing cars
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topVehicles.map((vehicle, index) => (
                                <div
                                    key={vehicle.id}
                                    className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <Trophy className={`h-5 w-5 ${getTrophyColor(index)}`} />
                                        <div>
                                            <p className="font-medium text-sm">
                                                {vehicle.brand} {vehicle.model}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <span>{vehicle.rentals} rentals</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                    {vehicle.rating}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-sm">{formatCurrency(vehicle.revenue)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* User Reviews/Experiences */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ThumbsUp className="h-5 w-5 text-purple-500" />
                        Recent Customer Reviews
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Latest feedback from happy customers
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                        {userReviews.map((review) => (
                            <div
                                key={review.id}
                                className="rounded-lg border p-4 hover:bg-accent transition-colors"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <p className="font-medium">{review.name}</p>
                                        <p className="text-xs text-muted-foreground">{review.date}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: review.rating }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                    "{review.comment}"
                                </p>
                                <Badge variant="secondary" className="text-xs">
                                    {review.car}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Driver Availability Calendar */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CalendarCheck className="h-5 w-5 text-blue-500" />
                        Driver Availability Calendar
                    </CardTitle>
                    <CardDescription>
                        View driver availability and schedule assignments
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border shadow-sm"
                                modifiers={{
                                    available: allAvailableDates,
                                }}
                                modifiersStyles={{
                                    available: {
                                        backgroundColor: 'hsl(var(--primary) / 0.1)',
                                        fontWeight: 'bold',
                                        color: 'hsl(var(--primary))',
                                    },
                                }}
                            />
                            <div className="mt-4 space-y-2">
                                <p className="text-sm font-medium">Legend:</p>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="h-3 w-3 rounded-sm bg-primary/10 border border-primary"></div>
                                    <span className="text-muted-foreground">Drivers Available</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-semibold mb-3">
                                    {date ? `Available on ${date.toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}` : 'Select a date'}
                                </h4>

                                {date && getAvailableDrivers(date).length > 0 ? (
                                    <div className="space-y-3">
                                        {getAvailableDrivers(date).map((driver) => (
                                            <div
                                                key={driver.driverId}
                                                className="flex items-center gap-4 rounded-lg border p-3 hover:bg-accent transition-colors"
                                            >
                                                <Avatar className="h-10 w-10">
                                                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                                        {driver.driverName.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <p className="font-medium text-sm">{driver.driverName}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {driver.availableDates.length} days available this month
                                                    </p>
                                                </div>
                                                <Badge variant="success" className="text-xs">
                                                    Available
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-8 text-center">
                                        <div className="rounded-full bg-muted p-3 mb-3">
                                            <Users className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                        <p className="text-sm font-medium">No drivers available</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {date ? 'Select another date to view availability' : 'Select a date to see available drivers'}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="border-t pt-4">
                                <h4 className="text-sm font-semibold mb-3">All Drivers</h4>
                                <div className="space-y-2">
                                    {driverAvailability.map((driver) => (
                                        <div
                                            key={driver.driverId}
                                            className="flex items-center justify-between text-sm p-2 rounded hover:bg-accent"
                                        >
                                            <span className="font-medium">{driver.driverName}</span>
                                            <span className="text-muted-foreground">
                                                {driver.availableDates.length} days
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
