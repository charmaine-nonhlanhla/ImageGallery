import { User } from "./user";

export interface Profile {
    username: string;
    fullName: string;
    image?: string;
    bio?: string;
}

export class Profile implements Profile {
    constructor(user: User) {
        this.username = user.username;
        this.fullName = user.fullName;
        this.image = user.image
    }
}