import 'react-toastify/dist/ReactToastify.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { ConfirmProvider } from 'material-ui-confirm';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { confirmOptions } from '~config/material-ui-confirm';
import theme from '~config/theme';
import { injectStoreToAxiosInterceptor } from '~core/http';
import { store } from '~core/store';
import App from './app';

const persistor = persistStore(store);

injectStoreToAxiosInterceptor(store);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme} noSsr>
            <CssBaseline />
            <ConfirmProvider defaultOptions={confirmOptions}>
                <ReduxProvider store={store}>
                    <PersistGate persistor={persistor}>
                        <App />
                    </PersistGate>
                </ReduxProvider>
            </ConfirmProvider>
            <ToastContainer theme='colored' />
        </ThemeProvider>
    </StrictMode>
);
