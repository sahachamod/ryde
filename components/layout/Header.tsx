"use client";

import { Bell, Search, User, LogOut, Settings as SettingsIcon, Moon, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useTheme } from "../theme-provider";
import { Badge } from "../ui/badge";

interface HeaderProps {
    onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        router.push("/login");
    };

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const notifications = [
        {
            id: 1,
            title: "New Booking Request",
            message: "John Doe requested a booking for Toyota Camry",
            time: "5 min ago",
            priority: "high",
        },
        {
            id: 2,
            title: "Payment Received",
            message: "Payment of $450 received from Alice Smith",
            time: "1 hour ago",
            priority: "normal",
        },
        {
            id: 3,
            title: "Vehicle Maintenance",
            message: "BMW X5 is due for maintenance check",
            time: "2 hours ago",
            priority: "high",
        },
        {
            id: 4,
            title: "New User Registration",
            message: "New driver account created",
            time: "5 hours ago",
            priority: "normal",
        },
    ];

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
            {/* Mobile Menu Button */}
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={onMenuClick}
            >
                <Menu className="h-5 w-5" />
            </Button>

            {/* Search Bar - Hidden on mobile */}
            <div className="flex-1 max-w-md hidden sm:block">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full pl-9 bg-muted/50 border border-gray-200 dark:border-gray-700 focus-visible:ring-1"
                    />
                </div>
            </div>

            {/* Mobile Search Button */}
            <Button variant="ghost" size="icon" className="sm:hidden">
                <Search className="h-5 w-5" />
            </Button>

            {/* Spacer for mobile */}
            <div className="flex-1 sm:hidden" />

            <div className="flex items-center gap-2 ml-auto">
                {/* Theme Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className="relative"
                >
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>

                {/* Notifications */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            <Badge
                                className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-green-500 hover:bg-green-600 text-white border-none"
                            >
                                {notifications.length}
                            </Badge>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80 bg-white text-black border-gray-200 shadow-lg z-50">
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="max-h-[300px] overflow-y-auto">
                            {notifications.map((notification) => (
                                <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 cursor-pointer">
                                    <div className="flex items-center justify-between w-full mb-1">
                                        <span className="font-medium text-sm">{notification.title}</span>
                                        <Badge
                                            variant={notification.priority === "high" ? "destructive" : "secondary"}
                                            className="text-[10px] px-1 py-0 h-5"
                                        >
                                            {notification.priority === "high" ? "High" : "Normal"}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                                        {notification.message}
                                    </p>
                                    <span className="text-[10px] text-muted-foreground self-end">
                                        {notification.time}
                                    </span>
                                </DropdownMenuItem>
                            ))}
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="justify-center text-primary cursor-pointer">
                            View all notifications
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <User className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium">Admin User</p>
                                <p className="text-xs text-muted-foreground">
                                    admin@ryderentals.com
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
                            <SettingsIcon className="mr-2 h-4 w-4" />
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push("/dashboard/notifications")}>
                            <Bell className="mr-2 h-4 w-4" />
                            Notifications
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
