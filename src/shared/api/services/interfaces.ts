export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    avatar: string;
    hash: string;
    username: string;
}

export interface LoginResponse {
    accessToken: string;
}

export interface RegisterResponse {
    uuid: string;  
}