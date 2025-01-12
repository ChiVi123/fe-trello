import clonedDeep from 'lodash/cloneDeep';
import { useEffect, useState } from 'react';
import BoardBarLayout from '~layouts/board-bar-layout';
import { IBoardEntity } from '~modules/board/entity';
import { getBoardDetailAPI } from '~modules/board/repository';
import { createCardAPI } from '~modules/card/repository';
import { createColumnAPI } from '~modules/column/repository';
import DashboardPage from '~view/dashboard/page';

function App() {
    const [board, setBoard] = useState<IBoardEntity>();

    useEffect(() => {
        getBoardDetailAPI('678278ca7a7569d4837fabe5').then((data) => {
            setBoard(data);
        });
    }, []);

    const handleAddColumn = async (title: string) => {
        if (!board) return;

        const createdColumn = await createColumnAPI({ title, boardId: board?._id });
        const clonedBoard = clonedDeep(board);

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

    return (
        <BoardBarLayout board={board}>
            <DashboardPage
                columnOrderIds={board?.columnOrderIds}
                columns={board?.columns}
                onAddColumn={handleAddColumn}
                onAddCard={handleAddCard}
            />
        </BoardBarLayout>
    );
}

export default App;
