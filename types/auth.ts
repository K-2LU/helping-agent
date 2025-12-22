export interface SignUpPayload {
    name: string;
    phoneNumber: string;
    location: string;
    password: string;
}

export interface LoginPayload {
    phoneNumber: string;
    password: string;
}