"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

export default function ReportsPage() {
    // Mock data for charts
    const revenueByMonth = [
        { month: "Jan", revenue: 12400 },
        { month: "Feb", revenue: 15600 },
        { month: "Mar", revenue: 13800 },
        { month: "Apr", revenue: 18200 },
        { month: "May", revenue: 16500 },
        { month: "Jun", revenue: 19800 },
    ];

    const categoryData = [
        { name: "Sedan", value: 35, color: "#3b82f6" },
        { name: "SUV", value: 28, color: "#10b981" },
        { name: "Electric", value: 18, color: "#f59e0b" },
        { name: "Luxury", value: 12, color: "#8b5cf6" },
        { name: "Van", value: 7, color: "#ec4899" },
    ];

    const metrics = [
        {
            title: "Total Revenue (YTD)",
            value: "$96,300",
            change: "+12.5%",
            trend: "up",
        },
        {
            title: "Average Booking Value",
            value: "$617",
            change: "+4.3%",
            trend: "up",
        },
        {
            title: "Fleet Utilization",
            value: "78%",
            change: "-2.1%",
            trend: "down",
        },
        {
            title: "Customer Retention",
            value: "84%",
            change: "+6.7%",
            trend: "up",
        },
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
                    <p className="text-muted-foreground">
                        Business insights and performance metrics
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        Generate Report
                    </Button>
                    <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Export Data
                    </Button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-4">
                {metrics.map((metric, index) => (
                    <Card key={index}>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">
                                {metric.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{metric.value}</div>
                            <div className="mt-1 flex items-center text-xs">
                                {metric.trend === "up" ? (
                                    <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                                ) : (
                                    <TrendingDown className="mr-1 h-3 w-3 text-red-600" />
                                )}
                                <span
                                    className={
                                        metric.trend === "up" ? "text-green-600" : "text-red-600"
                                    }
                                >
                                    {metric.change} from last period
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Revenue by Month */}
                <Card>
                    <CardHeader>
                        <CardTitle>Revenue by Month</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Monthly revenue for the last 6 months
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={revenueByMonth}>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                    <XAxis dataKey="month" className="text-xs" />
                                    <YAxis
                                        tickFormatter={(value) => `$${value / 1000}k`}
                                        className="text-xs"
                                    />
                                    <Tooltip
                                        formatter={(value: any) => [formatCurrency(value), "Revenue"]}
                                    />
                                    <Bar
                                        dataKey="revenue"
                                        fill="hsl(var(--primary))"
                                        radius={[8, 8, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Fleet Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Fleet Distribution</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Cars by category distribution
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="flex h-[300px] items-center justify-center">
                            <div className="h-full w-1/2">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={90}
                                            paddingAngle={2}
                                            dataKey="value"
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: any) => [`${value}%`, "Share"]} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex w-1/2 flex-col justify-center gap-2">
                                {categoryData.map((category, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div
                                            className="h-3 w-3 rounded-full"
                                            style={{ backgroundColor: category.color }}
                                        />
                                        <span className="text-sm">{category.name}</span>
                                        <span className="ml-auto text-sm font-medium">
                                            {category.value}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Reports */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Reports</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Pre-configured reports ready to generate
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                title: "Monthly Revenue Report",
                                description: "Detailed revenue breakdown by month",
                                badge: "PDF",
                            },
                            {
                                title: "Fleet Utilization Report",
                                description: "Vehicle usage and availability metrics",
                                badge: "Excel",
                            },
                            {
                                title: "Customer Analytics",
                                description: "Customer behavior and retention analysis",
                                badge: "PDF",
                            },
                            {
                                title: "Booking Trends",
                                description: "Booking patterns and forecasts",
                                badge: "Excel",
                            },
                            {
                                title: "Payment Summary",
                                description: "Payment transactions and status overview",
                                badge: "PDF",
                            },
                            {
                                title: "Maintenance Report",
                                description: "Vehicle maintenance history and costs",
                                badge: "Excel",
                            },
                        ].map((report, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-medium">{report.title}</h4>
                                        <Badge variant="outline" className="text-xs">
                                            {report.badge}
                                        </Badge>
                                    </div>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {report.description}
                                    </p>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
