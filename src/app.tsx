import clonedDeep from 'lodash/cloneDeep';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useAppDispatch } from '~config/store';
import BoardBarLayout from '~layouts/board-bar-layout';
import { getBoardDetailAPI } from '~modules/board/async-thunk';
import { moveCardAnotherColumnAPI, updateBoardDetailAPI } from '~modules/board/repository';
import { selectCurrentBoard, updateCurrentBoard } from '~modules/board/slice';
import { ICardEntity } from '~modules/card/entity';
import { createCardAPI } from '~modules/card/repository';
import { IColumnEntity } from '~modules/column/entity';
import { createColumnAPI, deleteColumnAPI, updateColumnDetailAPI } from '~modules/column/repository';
import { generatePlaceholderCard } from '~utils/formatters';
import DashboardPage from '~view/dashboard/page';

function App() {
    const dispatch = useAppDispatch();
    const board = useSelector(selectCurrentBoard);

    useEffect(() => {
        dispatch(getBoardDetailAPI('678278ca7a7569d4837fabe5'));
    }, [dispatch]);

    const handleAddColumn = async (title: string) => {
        if (!board) return;

        const createdColumn = await createColumnAPI({ title, boardId: board?._id });
        const clonedBoard = clonedDeep(board);
        const placeholder = generatePlaceholderCard(createdColumn);

        createdColumn.cards = [placeholder];
        createdColumn.cardOrderIds = [placeholder._id];
        clonedBoard.columnOrderIds.push(createdColumn._id);
        clonedBoard.columns.push(createdColumn);

        dispatch(updateCurrentBoard(clonedBoard));
    };
    const handleAddCard = async (data: { title: string; columnId: string }) => {
        if (!board) return;

        const createdCard = await createCardAPI({ ...data, boardId: board?._id });
        const clonedBoard = clonedDeep(board);

        const columnTarget = clonedBoard.columns.find((item) => item._id === data.columnId);
        if (!columnTarget) return;

        if (columnTarget.cards.some((item) => item.FE_PlaceholderCard)) {
            columnTarget.cardOrderIds = [createdCard._id];
            columnTarget.cards = [createdCard];
        } else {
            columnTarget.cardOrderIds.push(createdCard._id);
            columnTarget.cards.push(createdCard);
        }

        dispatch(updateCurrentBoard(clonedBoard));
    };
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
    const handleDeleteColumn = (id: string) => {
        if (!board) return;
        const clonedBoard = clonedDeep(board);
        clonedBoard.columns = clonedBoard.columns.filter((item) => item._id !== id);
        clonedBoard.columnOrderIds = clonedBoard.columnOrderIds.filter((_id) => _id !== id);
        dispatch(updateCurrentBoard(clonedBoard));

        deleteColumnAPI(id).then((res) => {
            toast.success(res?.deleteResult, { position: 'bottom-left' });
        });
    };

    return (
        <BoardBarLayout>
            <DashboardPage
                columns={board?.columns}
                onAddColumn={handleAddColumn}
                onMoveColumn={handleMoveColumn}
                onAddCard={handleAddCard}
                onMoveCardInSameColumn={handleMoveCardInSameColumn}
                onMoveCardAnotherColumn={handleMoveCardAnotherColumn}
                onDeleteColumn={handleDeleteColumn}
            />
        </BoardBarLayout>
    );
}

export default App;
