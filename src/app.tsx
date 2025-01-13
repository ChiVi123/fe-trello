import clonedDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BoardBarLayout from '~layouts/board-bar-layout';
import { IBoardEntity } from '~modules/board/entity';
import { getBoardDetailAPI, moveCardAnotherColumnAPI, updateBoardDetailAPI } from '~modules/board/repository';
import { ICardEntity } from '~modules/card/entity';
import { createCardAPI } from '~modules/card/repository';
import { IColumnEntity } from '~modules/column/entity';
import { createColumnAPI, deleteColumnAPI, updateColumnDetailAPI } from '~modules/column/repository';
import { generatePlaceholderCard } from '~utils/formatters';
import { mapOrder } from '~utils/sorts';
import DashboardPage from '~view/dashboard/page';

function App() {
    const [board, setBoard] = useState<IBoardEntity>();

    useEffect(() => {
        getBoardDetailAPI('678278ca7a7569d4837fabe5').then((data) => {
            data.columns = mapOrder(data.columns, data.columnOrderIds, '_id');
            data.columns.forEach((item) => {
                if (isEmpty(item.cards)) {
                    const placeholder = generatePlaceholderCard(item);
                    item.cards = [placeholder];
                    item.cardOrderIds = [placeholder._id];
                } else {
                    item.cards = mapOrder(item.cards, item.cardOrderIds, '_id');
                }
            });
            setBoard(data);
        });
    }, []);

    const handleAddColumn = async (title: string) => {
        if (!board) return;

        const createdColumn = await createColumnAPI({ title, boardId: board?._id });
        const clonedBoard = clonedDeep(board);
        const placeholder = generatePlaceholderCard(createdColumn);

        createdColumn.cards = [placeholder];
        createdColumn.cardOrderIds = [placeholder._id];
        clonedBoard.columnOrderIds.push(createdColumn._id);
        clonedBoard.columns.push(createdColumn);

        setBoard(clonedBoard);
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

        setBoard(clonedBoard);
    };
    const handleMoveColumn = async (newOrderedColumns: IColumnEntity[]) => {
        if (!board) return;
        const newColumnOrderIds = newOrderedColumns.map((item) => item._id);
        const clonedBoard = clonedDeep(board);
        clonedBoard.columnOrderIds = newColumnOrderIds;
        clonedBoard.columns = newOrderedColumns;
        setBoard(clonedBoard);

        await updateBoardDetailAPI(clonedBoard._id, { columnOrderIds: newColumnOrderIds });
    };
    const handleMoveCardInSameColumn = async (columnId: string, cards: ICardEntity[], cardOrderIds: string[]) => {
        if (!board) return;
        const clonedBoard = clonedDeep(board);
        const columnTarget = clonedBoard.columns.find((item) => item._id === columnId);
        if (!columnTarget) return;

        columnTarget.cardOrderIds = cardOrderIds;
        columnTarget.cards = cards;

        setBoard(clonedBoard);

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
        setBoard(clonedBoard);

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
        setBoard(clonedBoard);

        deleteColumnAPI(id).then((res) => {
            toast.success(res?.deleteResult, { position: 'bottom-left' });
        });
    };

    return (
        <BoardBarLayout board={board}>
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
