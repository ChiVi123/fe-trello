import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICardEntity } from './entity';

interface IState {
    currentCard: ICardEntity | null;
}

const initialState: IState = { currentCard: null };
const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: (creators) => ({
        clearCurrentCard: creators.reducer((state) => {
            state.currentCard = null;
        }),
        updateCurrentCard: creators.reducer((state, { payload }: PayloadAction<ICardEntity>) => {
            state.currentCard = payload;
        }),
    }),
    selectors: {
        selectCurrentCard: (state) => state.currentCard,
    },
});

export const { clearCurrentCard, updateCurrentCard } = cardSlice.actions;
export const { selectCurrentCard } = cardSlice.selectors;
export const cardReducer = cardSlice.reducer;
