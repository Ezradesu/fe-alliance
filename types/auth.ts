export interface LoginRequest {
    email: string;
    password?: string; // Optional in swagger for some reason, but we'll treat as required in form
}

export interface User {
    id: string;
    email: string;
    role?: string;
    level?: "4e" | "5e" | null;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
    user: User;
}
