import { createContext, useContext } from "react";
import ImageStore from "./imagestore";
import UserStore from "./userStore";

interface Store {
    imageStore: ImageStore;
    userStore: UserStore;
}

export const store: Store = {
    imageStore: new ImageStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}