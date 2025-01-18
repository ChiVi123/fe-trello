import Box from '@mui/material/Box';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import PageLoadingSpinner from '~components/page-loading-spinner';
import authBgPath from '~image/login-register-bg.jpg';
import { selectCurrentUser } from '~modules/user/slice';

function AuthLayout() {
    const user = useSelector(selectCurrentUser);
    if (user) return <Navigate to='/' replace />;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                alignItems: 'center',
                justifyContent: 'flex-start',
                background: `url("${authBgPath}")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.2)',
            }}
        >
            <Suspense fallback={<PageLoadingSpinner caption='Loading...' />}>
                <Outlet />
            </Suspense>
        </Box>
    );
}

export default AuthLayout;
