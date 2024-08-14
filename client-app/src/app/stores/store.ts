import { createContext, useContext } from "react";
import ImageStore from "./imagestore";
import UserStore from "./userStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import CommentStore from "./commentStore";

interface Store {
    imageStore: ImageStore;
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;
    commentStore: CommentStore;
}

export const store: Store = {
    imageStore: new ImageStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore(),
    commentStore: new CommentStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}