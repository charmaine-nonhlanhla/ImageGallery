export interface User {
    userId: string;
    userName: string;
    fullName: string;
    token: string;
    image?: string;
}

export interface UserFormValues {
    token?: string;
    email?: string;
    password?: string;
    fullName?: string;
    username?: string;
}