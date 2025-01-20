import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import PageLoadingSpinner from '~components/page-loading-spinner';
import AppBar from './components/app-bar';
import SidebarCreateBoardModal from './components/sidebar-create-board-modal';

const SidebarItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: '12px 16px',
    borderRadius: '8px',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300],
    },
    '&.active': {
        color: theme.palette.mode === 'dark' ? '#90caf9' : '#0c66e4',
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#e9f2ff',
    },
}));

function DefaultLayout() {
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />

            <Box sx={{ px: 2, my: 4 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 3 }}>
                        <Stack direction='column' spacing={1}>
                            <SidebarItem className='active'>
                                <SpaceDashboardIcon fontSize='small' />
                                Boards
                            </SidebarItem>
                            <SidebarItem>
                                <ListAltIcon fontSize='small' />
                                Templates
                            </SidebarItem>
                            <SidebarItem>
                                <HomeIcon fontSize='small' />
                                Home
                            </SidebarItem>
                        </Stack>
                        <Divider sx={{ my: 1 }} />
                        <Stack direction='column' spacing={1}>
                            <SidebarCreateBoardModal />
                        </Stack>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 9 }}>
                        <Suspense fallback={<PageLoadingSpinner caption='Loading...' />}>
                            <Outlet />
                        </Suspense>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default DefaultLayout;
