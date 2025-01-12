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
        const createdColumn = await createColumnAPI({ title, boardId: board?._id });
        console.log('createdColumn::', createdColumn);

        // update board
    };

    const handleAddCard = async (data: { title: string; columnId: string }) => {
        const createdCard = await createCardAPI({ ...data, boardId: board?._id });
        console.log('createdCard::', createdCard);

        // update board
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
