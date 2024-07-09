import { createContext, useContext } from "react";
import ImageStore from "./imagestore";

interface Store {
    imageStore: ImageStore
}

export const store: Store = {
    imageStore: new ImageStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}