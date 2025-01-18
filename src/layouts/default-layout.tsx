import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import PageLoadingSpinner from '~components/page-loading-spinner';
import AppBar from './components/app-bar';

function DefaultLayout() {
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />

            <Box
                sx={{
                    display: 'flex',
                    height: ({ trello }) => `calc(100vh - ${trello.appBarHeight})`,
                    bgcolor: ({ palette }) => (palette.mode === 'dark' ? '#34495e' : '#1976d2'),
                }}
            >
                <Suspense fallback={<PageLoadingSpinner caption='Loading...' />}>
                    <Outlet />
                </Suspense>
            </Box>
        </Container>
    );
}

export default DefaultLayout;
