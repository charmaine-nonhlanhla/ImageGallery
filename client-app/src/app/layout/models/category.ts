import { Photo } from "./profile";

export interface Category {
  categoryId: number;
  categoryName: string;
  photos: Photo[];
}
