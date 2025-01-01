import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import theme from '~config/theme';
import App from './app';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme} noSsr>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </StrictMode>
);
