import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ReactNode } from 'react';
import AppBar from './components/app-bar';
import BoardBar from './components/board-bar';

function BoardBarLayout({ children }: { children: ReactNode }) {
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />
            <BoardBar />

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
