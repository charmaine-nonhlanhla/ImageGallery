import { makeAutoObservable, runInAction } from "mobx";
import { Photo, Profile } from "../layout/models/profile";
import agent from "../api/agent";
import { store } from "./store";
import { Category } from "../layout/models/category";

export default class ProfileStore {
    profile: Profile | null = null;
    loadingProfile = false;
    uploading = false;
    loading = false;
    categories: Category[] = [];
    

    constructor() {
        makeAutoObservable(this);
        this.loadCategories();
    }

    get isCurrentUser() {
        if (store.userStore.user && this.profile) {
            return store.userStore.user.username === this.profile.username;
        }
        return false;
    }

    loadProfile = async (username: string) => {
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.get(username);
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingProfile = false);
        }
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
            })
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
            runInAction
            (() => {
                if (this.profile && this.profile.photos) {
                    this.profile.photos.find(p => p.isMain)!.isMain = false;
                    this.profile.photos.find(p => p.id === photo.id)!.isMain = true;
                    this.profile.image = photo.url;
                    this.loading = false;
                }
            })
        } catch (error) {
            runInAction(() => this.loading = false);
            console.log(error);        
        }
    }

    loadCategories = async () => {
        try {
            const categories = await agent.Categories.list();
            runInAction(() => {
                this.categories = categories;
            });
        } catch (error) {
            console.log('Error loading categories:', error);
        }
    }
}
