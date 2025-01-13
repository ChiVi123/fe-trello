import 'react-toastify/dist/ReactToastify.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { ConfirmProvider } from 'material-ui-confirm';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import theme from '~config/theme';
import App from './app';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme} noSsr>
            <CssBaseline />
            <ConfirmProvider
                defaultOptions={{
                    allowClose: false,
                    dialogProps: { maxWidth: 'xs' },
                    confirmationButtonProps: { color: 'error', variant: 'contained' },
                    buttonOrder: ['confirm', 'cancel'],
                }}
            >
                <App />
            </ConfirmProvider>
            <ToastContainer theme='colored' />
        </ThemeProvider>
    </StrictMode>
);
