"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Car,
    Calendar,
    CalendarCheck,
    CreditCard,
    Users,
    Tag,
    Wrench,
    FileText,
    Bell,
    Settings,
    ChevronLeft,
    ChevronRight,
    Package,
    UserCog,
    Shield,
    Building2,
    MapPin,
    ScrollText
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const menuItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Cars",
        href: "/dashboard/cars",
        icon: Car,
    },
    {
        title: "Bookings",
        href: "/dashboard/bookings",
        icon: CalendarCheck,
    },
    {
        title: "Calendar",
        href: "/dashboard/calendar",
        icon: Calendar,
    },
    {
        title: "Payments",
        href: "/dashboard/payments",
        icon: CreditCard,
    },
    {
        title: "Customers",
        href: "/dashboard/customers",
        icon: Users,
    },
    {
        title: "Inventory",
        href: "/dashboard/inventory",
        icon: Package,
    },
    {
        title: "Drivers",
        href: "/dashboard/drivers",
        icon: UserCog,
    },
    {
        title: "Insurance",
        href: "/dashboard/insurance",
        icon: Shield,
    },
    {
        title: "Car Owners",
        href: "/dashboard/car-owners",
        icon: Building2,
    },
    {
        title: "Locations",
        href: "/dashboard/locations",
        icon: MapPin,
    },
    {
        title: "Offers",
        href: "/dashboard/offers",
        icon: Tag,
    },
    {
        title: "Maintenance",
        href: "/dashboard/maintenance",
        icon: Wrench,
    },
    {
        title: "Reports",
        href: "/dashboard/reports",
        icon: FileText,
    },
    {
        title: "Terms & Conditions",
        href: "/dashboard/terms",
        icon: ScrollText,
    },
    {
        title: "Notifications",
        href: "/dashboard/notifications",
        icon: Bell,
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

interface SidebarProps {
    collapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    mobileOpen?: boolean;
    onMobileOpenChange?: (open: boolean) => void;
}

export function Sidebar({
    collapsed: externalCollapsed,
    onCollapsedChange,
    mobileOpen = false,
    onMobileOpenChange
}: SidebarProps = {}) {
    const pathname = usePathname();
    const [internalCollapsed, setInternalCollapsed] = useState(false);

    const collapsed = externalCollapsed ?? internalCollapsed;
    const setCollapsed = onCollapsedChange ?? setInternalCollapsed;

    const handleLinkClick = () => {
        // Close mobile menu when a link is clicked
        if (onMobileOpenChange) {
            onMobileOpenChange(false);
        }
    };

    return (
        <>
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
                    onClick={() => onMobileOpenChange?.(false)}
                />
            )}

            <aside
                className={cn(
                    "fixed left-0 top-0 z-50 h-screen border-r bg-card transition-all duration-300",
                    // Desktop behavior
                    "hidden md:block",
                    collapsed ? "md:w-16" : "md:w-64",
                    // Mobile behavior - slide in from left
                    mobileOpen && "block",
                    "md:translate-x-0",
                    mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
                    "w-64" // Fixed width on mobile
                )}
            >
                {/* Logo */}
                <div className="flex h-16 items-center justify-between border-b px-4 bg-background/50">
                    {!collapsed && (
                        <Link href="/dashboard" className="flex items-center space-x-2 group" onClick={handleLinkClick}>
                            <div className="relative h-8 w-36">
                                <Image
                                    src="/logo.svg"
                                    alt="Ryde Rent A Car"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </Link>
                    )}
                    {collapsed && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg mx-auto">
                            <Car className="h-5 w-5" />
                        </div>
                    )}
                </div>

                {/* Toggle Button - Hidden on mobile */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute -right-4 top-20 hidden md:flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-900 text-white shadow-md hover:bg-gray-800 z-50"
                >
                    {collapsed ? (
                        <ChevronRight className="h-5 w-5" />
                    ) : (
                        <ChevronLeft className="h-5 w-5" />
                    )}
                </button>

                {/* Navigation */}
                <nav className="space-y-1 p-3 overflow-y-auto max-h-[calc(100vh-4rem)]">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={handleLinkClick}
                                className={cn(
                                    "flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-sm",
                                    collapsed && "justify-center md:justify-center"
                                )}
                                title={collapsed ? item.title : undefined}
                            >
                                <item.icon className={cn(
                                    "h-5 w-5 shrink-0 transition-transform",
                                    isActive && "scale-110"
                                )} />
                                {!collapsed && <span>{item.title}</span>}
                                {!collapsed && isActive && (
                                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
