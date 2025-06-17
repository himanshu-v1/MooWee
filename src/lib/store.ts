import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./feature/card/cardSlice";

export const makeStore = () => {
    return configureStore({
      reducer: { 
        cards: cardReducer,
       },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];