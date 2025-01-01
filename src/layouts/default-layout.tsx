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
                    alignItems: 'center',
                    height: ({ trello }) => `calc(100vh - ${trello.appBarHeight})`,
                    bgcolor: 'primary.main',
                }}
            >
                {children}
            </Box>
        </Container>
    );
}

export default DefaultLayout;
