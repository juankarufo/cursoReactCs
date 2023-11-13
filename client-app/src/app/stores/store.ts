import { createContext, useContext } from "react";
import ActivityScore from "./activityStore";

interface Store {
    activityStore: ActivityScore
}

export const store: Store = {
    activityStore: new ActivityScore()
}
export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}