import clonedDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { useEffect, useState } from 'react';
import BoardBarLayout from '~layouts/board-bar-layout';
import { IBoardEntity } from '~modules/board/entity';
import { getBoardDetailAPI, updateBoardDetailAPI } from '~modules/board/repository';
import { createCardAPI } from '~modules/card/repository';
import { IColumnEntity } from '~modules/column/entity';
import { createColumnAPI } from '~modules/column/repository';
import { generatePlaceholderCard } from '~utils/formatters';
import DashboardPage from '~view/dashboard/page';

function App() {
    const [board, setBoard] = useState<IBoardEntity>();

    useEffect(() => {
        getBoardDetailAPI('678278ca7a7569d4837fabe5').then((data) => {
            data.columns.forEach((item) => {
                if (isEmpty(item.cards)) {
                    const placeholder = generatePlaceholderCard(item);
                    item.cards = [placeholder];
                    item.cardOrderIds = [placeholder._id];
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

        columnTarget.cardOrderIds.push(createdCard._id);
        columnTarget.cards.push(createdCard);

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

    return (
        <BoardBarLayout board={board}>
            <DashboardPage
                columnOrderIds={board?.columnOrderIds}
                columns={board?.columns}
                onAddColumn={handleAddColumn}
                onMoveColumn={handleMoveColumn}
                onAddCard={handleAddCard}
            />
        </BoardBarLayout>
    );
}

export default App;
