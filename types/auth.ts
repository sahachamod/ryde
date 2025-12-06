export interface User {
    id: string;
    email: string;
    name: string;
    role: "admin" | "staff";
    avatar?: string;
    createdAt: string;
    lastLogin?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: User;
    token: string;
    refreshToken: string;
    expiresIn: number;
}
