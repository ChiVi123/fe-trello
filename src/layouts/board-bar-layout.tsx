import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ReactNode } from 'react';
import { IBoardEntity } from '~modules/board/entity';
import AppBar from './components/app-bar';
import BoardBar from './components/board-bar';

interface IProps {
    board: IBoardEntity | undefined;
    children: ReactNode;
}

function BoardBarLayout({ board, children }: IProps) {
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />
            <BoardBar board={board} />

            <Box
                sx={{
                    display: 'flex',
                    height: ({ trello }) => trello.boardContentHeight,
                    bgcolor: ({ palette }) => (palette.mode === 'dark' ? '#34495e' : '#1976d2'),
                    py: '10px',
                }}
            >
                {children}
            </Box>
        </Container>
    );
}

export default BoardBarLayout;
