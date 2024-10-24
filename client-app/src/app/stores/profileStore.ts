import { makeAutoObservable, runInAction } from "mobx";
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
  }

  setActiveTab = (activeTab: number) => {
    this.activeTab = activeTab;
  };

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
      runInAction(() => (this.loadingProfile = false));
    }
  };
}
