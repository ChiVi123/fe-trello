import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Suspense } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import PageLoadingSpinner from '~components/page-loading-spinner';
import AppBar from './components/app-bar';

enum TABS {
    ACCOUNT = '/settings/account',
    SECURITY = '/settings/security',
}

function SettingsLayout() {
    const location = useLocation();

    return (
        <Container disableGutters maxWidth={false}>
            <AppBar />
            <Box sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={location.pathname}>
                    <Tab
                        component={Link}
                        to='/settings/account'
                        label='Account'
                        value={TABS.ACCOUNT}
                        icon={<PersonIcon />}
                        iconPosition='start'
                    />
                    <Tab
                        component={Link}
                        to='/settings/security'
                        label='Security'
                        value={TABS.SECURITY}
                        icon={<SecurityIcon />}
                        iconPosition='start'
                    />
                </Tabs>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 3,
                        maxWidth: '1200px',
                    }}
                >
                    <Suspense fallback={<PageLoadingSpinner caption='Loading...' />}>
                        <Outlet />
                    </Suspense>
                </Box>
            </Box>
        </Container>
    );
}

export default SettingsLayout;
