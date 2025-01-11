import { useEffect, useState } from 'react';
import BoardBarLayout from '~layouts/board-bar-layout';
import { IBoardEntity } from '~modules/board/entity';
import { getBoardDetailAPI } from '~modules/board/repository';
import DashboardPage from '~view/dashboard/page';

function App() {
    const [board, setBoard] = useState<IBoardEntity>();
    useEffect(() => {
        getBoardDetailAPI('678278ca7a7569d4837fabe5').then((data) => {
            setBoard(data);
        });
    }, []);

    return (
        <BoardBarLayout board={board}>
            <DashboardPage columnOrderIds={board?.columnOrderIds} columns={board?.columns} />
        </BoardBarLayout>
    );
}

export default App;
