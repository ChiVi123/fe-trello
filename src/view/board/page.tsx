import clonedDeep from 'lodash/cloneDeep';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '~core/store';
import { getBoardDetailAPI } from '~modules/board/async-thunk';
import { moveCardAnotherColumnAPI, updateBoardDetailAPI } from '~modules/board/repository';
import { selectCurrentBoard, updateCurrentBoard } from '~modules/board/slice';
import { ICardEntity } from '~modules/card/entity';
import { IColumnEntity } from '~modules/column/entity';
import { updateColumnDetailAPI } from '~modules/column/repository';
import BoardContent from './components/board-content';

function BoardPage() {
    const dispatch = useAppDispatch();
    const board = useSelector(selectCurrentBoard);

    useEffect(() => {
        const promise = dispatch(getBoardDetailAPI('678278ca7a7569d4837fabe5'));
        return () => {
            promise.abort();
        };
    }, [dispatch]);

    const handleMoveColumn = async (newOrderedColumns: IColumnEntity[]) => {
        if (!board) return;
        const newColumnOrderIds = newOrderedColumns.map((item) => item._id);
        const clonedBoard = clonedDeep(board);
        clonedBoard.columnOrderIds = newColumnOrderIds;
        clonedBoard.columns = newOrderedColumns;
        dispatch(updateCurrentBoard(clonedBoard));

        await updateBoardDetailAPI(clonedBoard._id, { columnOrderIds: newColumnOrderIds });
    };
    const handleMoveCardInSameColumn = async (columnId: string, cards: ICardEntity[], cardOrderIds: string[]) => {
        if (!board) return;

        const clonedBoard = clonedDeep(board);
        const columnTarget = clonedBoard.columns.find((item) => item._id === columnId);
        if (!columnTarget) return;

        columnTarget.cardOrderIds = cardOrderIds;
        columnTarget.cards = cards;

        dispatch(updateCurrentBoard(clonedBoard));
        updateColumnDetailAPI(columnId, { cardOrderIds });
    };
    const handleMoveCardAnotherColumn = async (
        currentCardId: string,
        prevColumnId: string,
        nextColumnId: string,
        orderedColumns: IColumnEntity[]
    ) => {
        if (!board) return;

        const newColumnOrderIds = orderedColumns.map((item) => item._id);
        const clonedBoard = clonedDeep(board);
        clonedBoard.columnOrderIds = newColumnOrderIds;
        clonedBoard.columns = orderedColumns;

        dispatch(updateCurrentBoard(clonedBoard));

        let prevCardOrderIds = orderedColumns.find((item) => item._id === prevColumnId)!.cardOrderIds;
        if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = [];

        moveCardAnotherColumnAPI({
            currentCardId,
            prevColumnId,
            prevCardOrderIds,
            nextColumnId,
            nextCardOrderIds: orderedColumns.find((item) => item._id === nextColumnId)?.cardOrderIds,
        });
    };

    return (
        <BoardContent
            columns={board?.columns}
            onMoveColumn={handleMoveColumn}
            onMoveCardInSameColumn={handleMoveCardInSameColumn}
            onMoveCardAnotherColumn={handleMoveCardAnotherColumn}
        />
    );
}

export default BoardPage;
