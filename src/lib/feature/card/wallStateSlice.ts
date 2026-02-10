import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";

const initialState = {
    wall: 'movie' as string | null,
};

export const wallStateSlice = createSlice({
    name: 'wallState',
    initialState: initialState,
    reducers: {
        setWallState(state, action) {
            state.wall = action.payload;
        }
    }
});

export const { setWallState } = wallStateSlice.actions;
export const getWallState = (state: RootState) => state.wallState;
export default wallStateSlice.reducer;