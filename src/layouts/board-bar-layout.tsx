import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import PageLoadingSpinner from '~components/page-loading-spinner';
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
                <Suspense fallback={<PageLoadingSpinner caption='Loading...' />}>
                    <Outlet />
                </Suspense>
            </Box>
        </Container>
    );
}

export default BoardBarLayout;
