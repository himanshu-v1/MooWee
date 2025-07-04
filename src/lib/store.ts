import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./feature/card/cardSlice";
import cardTvReducer from "./feature/card/cardTvSlice";

export const makeStore = () => {
    return configureStore({
      reducer: { 
        cards: cardReducer,
        tvCards: cardTvReducer,
       },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];