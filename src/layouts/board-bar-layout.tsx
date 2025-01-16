import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from './components/app-bar';
import BoardBar from './components/board-bar';

function BoardBarLayout() {
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
                <Suspense
                    fallback={
                        <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='100%'>
                            <CircularProgress />
                        </Box>
                    }
                >
                    <Outlet />
                </Suspense>
            </Box>
        </Container>
    );
}

export default BoardBarLayout;
