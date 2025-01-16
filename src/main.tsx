import 'react-toastify/dist/ReactToastify.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { ConfirmProvider } from 'material-ui-confirm';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { confirmOptions } from '~config/material-ui-confirm';
import { store } from '~config/store';
import theme from '~config/theme';
import App from './app';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme} noSsr>
            <CssBaseline />
            <ConfirmProvider defaultOptions={confirmOptions}>
                <ReduxProvider store={store}>
                    <App />
                </ReduxProvider>
            </ConfirmProvider>
            <ToastContainer theme='colored' />
        </ThemeProvider>
    </StrictMode>
);
