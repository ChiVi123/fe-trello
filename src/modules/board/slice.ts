import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import isEmpty from 'lodash/isEmpty';
import { getBoardDetailAPI } from '~modules/board/async-thunk';
import { IBoardEntity } from '~modules/board/entity';
import { generatePlaceholderCard } from '~utils/formatters';
import { mapOrder } from '~utils/sorts';

interface IState {
    currentBoard: IBoardEntity | null;
}
const initialState: IState = { currentBoard: null };
const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: (creators) => ({
        updateCurrentBoard: creators.reducer((state, { payload }: PayloadAction<IBoardEntity>) => {
            state.currentBoard = payload;
        }),
    }),
    extraReducers: (builder) => {
        builder.addCase(getBoardDetailAPI.fulfilled, (state, { payload }) => {
            payload.columns = mapOrder(payload.columns, payload.columnOrderIds, '_id');
            payload.columns.forEach((item) => {
                if (isEmpty(item.cards)) {
                    const placeholder = generatePlaceholderCard(item);
                    item.cards = [placeholder];
                    item.cardOrderIds = [placeholder._id];
                } else {
                    item.cards = mapOrder(item.cards, item.cardOrderIds, '_id');
                }
            });

            state.currentBoard = payload;
        });
    },
    selectors: {
        selectCurrentBoard: (state) => state.currentBoard,
    },
});

export const { updateCurrentBoard } = boardSlice.actions;
export const { selectCurrentBoard } = boardSlice.selectors;
export const boardReducer = boardSlice.reducer;
