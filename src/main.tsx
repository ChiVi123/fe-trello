import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { injectStoreToAxiosInterceptor } from '~core/http';
import { store } from '~core/store';
import App from './app';

const persistor = persistStore(store);

injectStoreToAxiosInterceptor(store);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ReduxProvider store={store}>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </ReduxProvider>
    </StrictMode>
);
