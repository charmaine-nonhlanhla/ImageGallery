import { makeAutoObservable, reaction, runInAction } from "mobx";
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
    selectedCategory: Category | null = null;
    photos: Photo[] = [];
    selectedPhoto: Photo | null | undefined = null;
    filteredPhotos: Photo[] = [];
    followings: Profile[] = [];
    loadingFollowings: boolean = false;
    activeTab = 0;

    constructor() {
        makeAutoObservable(this);
        this.loadCategories();
        this.loadPhotos();

        reaction (
            () => this.activeTab,
            activeTab => {
                if (activeTab === 3 || activeTab === 4) {
                    const predicate = activeTab === 3 ? 'followers' : 'following';
                    this.loadFollowings(predicate);
                }
                else {
                    this.followings = [];
                }
            }
        )
    }

    setActiveTab = (activeTab: number) => {
        this.activeTab = activeTab;
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

    // updateProfile = async (profile: Partial<Profile>) => {
    //     this.loading = true;
    //     try {
    //         await agent.Profiles.updateProfile(profile);
    //         runInAction(() => {
    //             if (profile.fullName && profile.fullName !== store.userStore.user?.fullName) {
    //                 store.userStore.setFullName(profile.fullName);
    //         }
    //         this.profile = {...this.profile, ...profile as Profile};
    //         this.loading = false;
    //         });
            
    //     } catch (error) {
    //         console.log(error);
    //         runInAction(() => this.loading = false);
    //     }
    // }

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

    deletePhoto = async (photo: Photo) => {
        this.loading = true;
        try {
            await agent.Profiles.deletePhoto(photo.id);
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos= this.profile.photos?.filter(p => p.id !== photo.id);
                    this.loading = false; 
                }
            });
        } catch (error) {
            runInAction(() => this.loading = false);
            console.log(error)
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

    setCategory = (category: Category | null) => {
        this.selectedCategory = category;
        this.filteredPhotos = this.filterPhotos();
    }

    filterPhotos = () => {
        if (!this.selectedCategory) return this.photos;
        return this.photos.filter(photo => photo.categoryId === this.selectedCategory?.categoryId);
    }

    loadPhotos = async () => {
        this.loading = true;
        try {
            const photos = await agent.Photos.list(); 
            runInAction(() => {
                this.photos = photos;
                this.filteredPhotos = this.filterPhotos();
                this.loading = false;
            });
        } catch (error) {
            console.log("Error loading photos:", error);
            runInAction(() => this.loading = false);
        }
    }

    loadUserPhotos = async () => {
        this.loading = true;
        try {
          if (store.userStore.user?.username) { 
            const username = store.userStore.user.username;
            const profile = await agent.Profiles.get(username);
            runInAction(() => {
              this.profile = profile;
              this.photos = profile.photos || [];
              this.filteredPhotos = this.filterPhotos();
              this.loading = false;
            });
          }
        } catch (error) {
          console.log("Error loading user photos:", error);
          runInAction(() => this.loading = false);
        }
      } 
      
      clearSelectedPhoto = () => {
        this.selectedPhoto = undefined; 
      }

      updateFollowing = async (username: string, following: boolean) => {
        this.loading = true;
        try {
            await agent.Profiles.updateFollowing(username);
            runInAction(() => {
               if (this.profile && this.profile.username !== store.userStore.user?.username && this.profile.username === username) {
                    following ? this.profile.followersCount++ : this.profile.followersCount--;
                    this.profile.following = !this.profile.following;
               }
               if (this.profile && this.profile.username === store.userStore.user?.username) {
                following ? this.profile.followingCount++ : this.profile.followingCount--;
               }
               this.followings.forEach(profile => {
                if (profile.username === username) {
                    profile.following ? profile.followersCount-- : profile.followersCount++;
                    profile.following = !profile.following;
                }
               })
               this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
      }

      loadFollowings = async (predicate: string) => {
        this.loadingFollowings = true;
        try {
            const username = this.profile?.username;
            if (!username) return; 
    
            const followings = await agent.Profiles.listFollowings(username, predicate);
            runInAction(() => {
                
                this.followings = followings;
                this.loadingFollowings = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingFollowings = false);
        }
    }
}
