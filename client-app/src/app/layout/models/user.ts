export interface User {
    username: string;
    fullName: string;
    token: string;
    image?: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    fullName?: string;
    username?: string;
}