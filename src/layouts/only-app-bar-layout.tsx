import Container from '@mui/material/Container';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import PageLoadingSpinner from '~components/page-loading-spinner';
import AppBar from './components/app-bar';

function OnlyAppBarLayout() {
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />

            <Suspense fallback={<PageLoadingSpinner caption='Loading...' />}>
                <Outlet />
            </Suspense>
        </Container>
    );
}

export default OnlyAppBarLayout;
