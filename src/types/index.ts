// src/types/index.ts

export interface User {
    id: string;
    email: string;
    name: string;
    picture: string;
}

export interface AuthToken {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}