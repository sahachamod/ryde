import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardLayoutClient from "./dashboard-layout-client";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    console.log("Server Layout - Token:", token?.value ? "Present" : "Missing");

    if (!token) {
        console.log("Server Layout - Redirecting to /login");
        redirect("/login");
    }

    return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
