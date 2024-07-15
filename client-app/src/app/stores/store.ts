import { createContext, useContext } from "react";
import ImageStore from "./imagestore";
import UserStore from "./userStore";
import CommonStore from "./commonStore";

interface Store {
    imageStore: ImageStore;
    userStore: UserStore;
    commonStore: CommonStore;
}

export const store: Store = {
    imageStore: new ImageStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}