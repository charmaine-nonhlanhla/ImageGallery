import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Profile } from "../layout/models/profile";
import agent from "../api/agent";
import { store } from "./store";
import { Photo } from "../layout/models/photo";


export default class ProfileStore {
    profile: Profile | null = null;
    loadingProfile = false;
    uploading = false;
    loading = false;
    photos: Photo[] = [];
    filteredPhotos: Photo[] = [];
    followings: Profile[] = [];
    loadingFollowings: boolean = false;
    activeTab = 0;

    constructor() {
        makeAutoObservable(this);

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
            return store.userStore.user.userName === this.profile.username;
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

      updateFollowing = async (username: string, following: boolean) => {
        this.loading = true;
        try {
            await agent.Profiles.updateFollowing(username);
            runInAction(() => {
               if (this.profile && this.profile.username !== store.userStore.user?.userName && this.profile.username === username) {
                    following ? this.profile.followersCount++ : this.profile.followersCount--;
                    this.profile.following = !this.profile.following;
               }
               if (this.profile && this.profile.username === store.userStore.user?.userName) {
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
