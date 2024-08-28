import { Photo } from "./photo";
import { User } from "./user";

export interface Profile {
    username?: string;
    fullName?: string;
    image?: string;
    bio?: string;
    following: boolean;
    followersCount: number;
    followingCount: number;
    photos?: Photo[];
}

export class Profile implements Profile {
    constructor(user: User) {
        this.username = user.userName;
        this.fullName = user.fullName;
        this.image = user.image;
    }
}

export { Photo };
