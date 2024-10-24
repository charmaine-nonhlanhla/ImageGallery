import { User } from "./user";

export interface Photo {
  id: string;
  url: string;
  isMain: boolean;
  photoDescription: string;
  photoTitle: string;
  categoryId: number;
  username: string;
  uploadDate: Date;
}

export class Photo implements Photo {
  constructor(user: User) {
    this.username = user.userName;
  }
}
