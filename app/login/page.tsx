"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Car, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Mock authentication
            const mockToken = "mock-jwt-token-" + Date.now();
            const mockUser = {
                id: "1",
                name: "Admin User",
                email: formData.email,
                role: "admin" as const,
            };

            // Store in localStorage
            localStorage.setItem("token", mockToken);
            localStorage.setItem("user", JSON.stringify(mockUser));

            // Set cookie for middleware
            document.cookie = `token=${mockToken}; path=/; max-age=86400; SameSite=Strict`;

            toast({
                title: "Login Successful",
                description: "Welcome back to Ryde Rent A Car!",
            });

            // Redirect to dashboard
            router.push("/dashboard");
        } catch (error) {
            toast({
                title: "Login Failed",
                description: "Invalid credentials. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4 relative overflow-hidden">
            {/* Animated Background Gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] h-[70%] w-[70%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse"></div>
                <div className="absolute top-[40%] -right-[10%] h-[60%] w-[60%] rounded-full bg-purple-600/20 blur-[120px] animate-pulse delay-1000"></div>
                <div className="absolute -bottom-[20%] left-[20%] h-[50%] w-[50%] rounded-full bg-indigo-600/20 blur-[120px] animate-pulse delay-2000"></div>
            </div>

            <Card className="w-full max-w-md relative z-10 border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in-95 duration-500">
                <CardHeader className="space-y-2 text-center pb-8 pt-10">
                    <div className="mx-auto mb-8 flex items-center justify-center animate-in slide-in-from-bottom-4 duration-700 delay-200">
                        <Image
                            src="/logo.svg"
                            alt="Ryde Rent A Car"
                            width={180}
                            height={60}
                            className="object-contain drop-shadow-lg"
                            priority
                        />
                    </div>
                    <CardTitle className="text-3xl font-bold text-white tracking-tight animate-in slide-in-from-bottom-4 duration-700 delay-300">
                        Ryde Rent A Car
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-base animate-in slide-in-from-bottom-4 duration-700 delay-400">
                        Sign in to access the admin dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent className="pb-10 px-8">
                    <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-bottom-4 duration-700 delay-500">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@ryderentals.com"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                className="h-11 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all"
                                required
                                autoComplete="email"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-300">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    className="h-11 pr-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all"
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
