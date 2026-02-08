import { User } from "@/types/auth";

const TOKEN_KEY = "alliance_auth_token";
const USER_KEY = "alliance_auth_user";

export function setToken(token: string) {
    if (typeof window !== "undefined") {
        localStorage.setItem(TOKEN_KEY, token);
    }
}

export function getToken(): string | null {
    if (typeof window !== "undefined") {
        return localStorage.getItem(TOKEN_KEY);
    }
    return null;
}

export function removeToken() {
    if (typeof window !== "undefined") {
        localStorage.removeItem(TOKEN_KEY);
    }
}

export function setUser(user: User) {
    if (typeof window !== "undefined") {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
}

export function getUser(): User | null {
    if (typeof window !== "undefined") {
        const userStr = localStorage.getItem(USER_KEY);
        if (!userStr) return null;
        try {
            return JSON.parse(userStr);
        } catch {
            return null;
        }
    }
    return null;
}

export function removeUser() {
    if (typeof window !== "undefined") {
        localStorage.removeItem(USER_KEY);
    }
}

export function isAuthenticated(): boolean {
    const token = getToken();
    return !!token;
}
