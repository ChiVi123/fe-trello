import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ReactNode } from 'react';
import AppBar from './components/app-bar';

function DefaultLayout({ children }: { children: ReactNode }) {
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
                {children}
            </Box>
        </Container>
    );
}

export default DefaultLayout;
