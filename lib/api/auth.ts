import { api } from "./client";
import type { User, LoginCredentials, LoginResponse } from "@/types/auth";

export const authApi = {
    // Login
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        return api.post<LoginResponse>("/auth/login", credentials);
    },

    // Logout
    logout: async (): Promise<void> => {
        return api.post<void>("/auth/logout");
    },

    // Get current user
    me: async (): Promise<User> => {
        return api.get<User>("/auth/me");
    },

    // Refresh token
    refreshToken: async (refreshToken: string): Promise<LoginResponse> => {
        return api.post<LoginResponse>("/auth/refresh", { refreshToken });
    },

    // List users (admin only)
    listUsers: async (): Promise<User[]> => {
        return api.get<User[]>("/auth/users");
    },

    // Create user (admin only)
    createUser: async (data: Partial<User>): Promise<User> => {
        return api.post<User>("/auth/users", data);
    },

    // Update user
    updateUser: async (id: string, data: Partial<User>): Promise<User> => {
        return api.put<User>(`/auth/users/${id}`, data);
    },

    // Delete user (admin only)
    deleteUser: async (id: string): Promise<void> => {
        return api.delete<void>(`/auth/users/${id}`);
    },
};
