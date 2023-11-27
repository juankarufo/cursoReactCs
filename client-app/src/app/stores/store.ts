import { createContext, useContext } from "react";
import ActivityScore from "./activityStore";
import CommonStore from "./commonStore";

interface Store {
    activityStore: ActivityScore;
    commonStore: CommonStore;
}

export const store: Store = {
    activityStore: new ActivityScore(),
    commonStore: new CommonStore()
}
export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}