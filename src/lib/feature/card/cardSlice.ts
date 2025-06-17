import { createSlice } from '@reduxjs/toolkit';
import ICard from '@/ui/card/typeCard';
// import { initialCard } from '@/ui/card/typeCard';
// import { cards } from '@/test/data/card';
import { RootState } from '@/lib/store';

// const initialState: ICard[] = [...cards];
const initialState: ICard[] = [];

export const cardSlice = createSlice({
  name: 'cardSlice',
  initialState,
  reducers: {
    setCards(state, action) {
      return [...action.payload];
    },
    // getCards(state) {
    //     return state;
    // }
  }
});

export const { setCards } = cardSlice.actions;
export const getState = ( state: RootState ) => state.cards;
export default cardSlice.reducer;