import { createContext, useContext } from "react";
import ImageStore from "./imagestore";
import UserStore from "./userStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";

interface Store {
    imageStore: ImageStore;
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
}

export const store: Store = {
    imageStore: new ImageStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}