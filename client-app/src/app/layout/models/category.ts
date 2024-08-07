import { Photo } from "./profile";

export interface Category {
    categoryId: number;
    categoryName: string;
    photos: Photo[]; // Use an array to represent a collection of photos
}