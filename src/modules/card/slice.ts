import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICardEntity } from './entity';

interface IState {
    currentCard: ICardEntity | null;
    isShowModalActiveCard: boolean;
}

const initialState: IState = { currentCard: null, isShowModalActiveCard: false };
const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: (creators) => ({
        clearAllStateCard: creators.reducer((state) => {
            state.currentCard = null;
            state.isShowModalActiveCard = false;
        }),
        updateCurrentCard: creators.reducer((state, { payload }: PayloadAction<ICardEntity>) => {
            state.currentCard = payload;
        }),
        showModalActiveCard: creators.reducer((state) => {
            state.isShowModalActiveCard = true;
        }),
    }),
    selectors: {
        selectCurrentCard: (state) => state.currentCard,
        selectIsShowModalActiveCard: (state) => state.isShowModalActiveCard,
    },
});

export const { clearAllStateCard, updateCurrentCard, showModalActiveCard } = cardSlice.actions;
export const { selectCurrentCard, selectIsShowModalActiveCard } = cardSlice.selectors;
export const cardReducer = cardSlice.reducer;
