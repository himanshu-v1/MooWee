import { createSlice } from '@reduxjs/toolkit';
import { ICard } from '@/types/typeCard';
// import { initialCard } from '@/ui/card/typeCard';
// import { cards } from '@/test/data/card';
import { RootState } from '@/lib/store';

// const initialState: ICard[] = [...cards];
const initialState: ICard[] = [];

export const cardTvSlice = createSlice({
  name: 'cardTvSlice',
  initialState,
  reducers: {
    setTvCards(state, action) {
      return [...action.payload];
    }
  }
});

export const { setTvCards } = cardTvSlice.actions;
export const getState = ( state: RootState ) => state.tvCards;
export default cardTvSlice.reducer;