import { createContext, useContext } from "react";
import ActivityScore from "./activityStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";

interface Store {
    activityStore: ActivityScore;
    commonStore: CommonStore;
    userStore: UserStore;
}

export const store: Store = {
    activityStore: new ActivityScore(),
    commonStore: new CommonStore(),
    userStore: new UserStore()
}
export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}