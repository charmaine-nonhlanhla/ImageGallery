import { makeAutoObservable, runInAction } from "mobx";
import { Profile } from "../layout/models/profile";
import agent from "../api/agent";
import { Category } from "../layout/models/category";
import { store } from "./store";
import { Photo } from "../layout/models/photo";
import { Pagination, PagingParams } from "../layout/models/pagination";

export default class PhotoStore {
    profile: Profile | null = null;
    photos: Photo[] = [];
    selectedPhoto: Photo | undefined = undefined;
    loading = false;
    uploading = false;  
    loadingPhotos = false;
    categories: Category[] = [];
    selectedCategory: Category | null = null;
    filteredPhotos: Photo[] = [];
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();

    constructor() {
        makeAutoObservable(this);
        this.loadCategories();
        this.loadPhotos();
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        return params;
    }

    loadPhotos = async () => {
        this.loading = true;
        try {
            const result = await agent.Photos.list(this.axiosParams);
            runInAction(() => {
                this.photos = result.data;
                this.filteredPhotos = this.filterPhotos();
                this.loading = false;
            });
            this.setPagination(result.pagination);
        } catch (error) {
            console.log("Error loading photos:", error);
            runInAction(() => this.loading = false);
        }
    }

    loadUserPhotos = async (username: string) => {
        this.loadingPhotos = true;
        try {
            const result = await agent.Photos.listByUser(username, this.axiosParams);
    
            runInAction(() => {
                this.photos = result.data; 
                this.filteredPhotos = this.filterPhotos();
                this.loadingPhotos = false;
            });
            this.setPagination(result.pagination); 
        } catch (error) {
            console.log("Error loading user photos:", error);
            runInAction(() => this.loadingPhotos = false);
        }
    }

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }

    selectPhoto = (id: string) => {
        this.selectedPhoto = this.photos.find(photo => photo.id === id);
        console.log('Selected Photo:', this.selectedPhoto);
    }

    cancelSelectedPhoto = () => {
        this.selectedPhoto = undefined;
    }
    

    filterPhotos = () => {
        if (!this.selectedCategory) return this.photos;
        return this.photos.filter(photo => photo.categoryId === this.selectedCategory?.categoryId);
    }

    uploadPhoto = async (file: Blob, photoTitle?: string, categoryId?: number, photoDescription?: string) => {
        this.uploading = true;
        try {
            const response = await agent.Profiles.uploadPhoto(file, photoTitle, categoryId, photoDescription);
            const photo = response.data;
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos?.push(photo);
                    if (photo.isMain && store.userStore.user) {
                        store.userStore.setImage(photo.url);
                        this.profile.image = photo.url;
                    }
                }
                this.uploading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.uploading = false);
        }
    }

    setMainPhoto = async (photo: Photo) => {
        this.loading = true;
        try {
            await agent.Profiles.setMainPhoto(photo.id);
            store.userStore.setImage(photo.url);
            window.location.reload();
            runInAction(() => {
                if (this.profile && this.profile.photos) {
                    this.profile.photos.find(p => p.isMain)!.isMain = false;
                    this.profile.photos.find(p => p.id === photo.id)!.isMain = true;
                    this.profile.image = photo.url;
                    this.loading = false;
                }
            });

        } catch (error) {
            runInAction(() => this.loading = false);
            console.log(error);
        }
    }

    deletePhoto = async (photo: Photo) => {
        this.loading = true;
        try {
            await agent.Profiles.deletePhoto(photo.id);
            window.location.reload();
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos = this.profile.photos?.filter(p => p.id !== photo.id);
                    this.loading = false;
                }
            });
        } catch (error) {
            runInAction(() => this.loading = false);
            console.log(error);
        }
    }

    loadCategories = async () => {
        try {
            const categories = await agent.Categories.list();
            console.log('Categories fetched:', categories);
            runInAction(() => {
                this.categories = categories;
            });
        } catch (error) {
            console.log("Error loading categories:", error);
        }
    }

    setCategory = (category: Category | null) => {
        this.selectedCategory = category;
        this.filteredPhotos = this.filterPhotos();
    }

    clearSelectedPhoto = () => {
        this.selectedPhoto = undefined;
    }
}
