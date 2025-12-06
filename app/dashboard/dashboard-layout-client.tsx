"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Toaster } from "@/components/ui/toaster";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("Client Layout - LocalStorage Token:", token ? "Present" : "Missing");
        if (!token) {
            console.log("Client Layout - Redirecting to /login");
            router.push("/login");
        }
    }, [router]);

    return (
        <div className="relative flex min-h-screen bg-background">
            <Sidebar
                collapsed={sidebarCollapsed}
                onCollapsedChange={setSidebarCollapsed}
                mobileOpen={mobileMenuOpen}
                onMobileOpenChange={setMobileMenuOpen}
            />
            <div className={cn(
                "flex-1 transition-all duration-300",
                // Desktop: respect sidebar width
                sidebarCollapsed ? "md:pl-16" : "md:pl-64",
                // Mobile: no left padding (sidebar is overlay)
                "pl-0"
            )}>
                <Header onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
                <main className="p-4 sm:p-6 lg:p-8">
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
            <Toaster />
        </div>
    );
}

function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}
