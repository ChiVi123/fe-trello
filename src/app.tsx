import 'react-toastify/dist/ReactToastify.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { ConfirmProvider } from 'material-ui-confirm';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { confirmOptions } from '~config/material-ui-confirm';
import theme from '~config/theme';
import { browserRouter } from '~routes';

function App() {
    return (
        <ThemeProvider theme={theme} noSsr>
            <CssBaseline />
            <ConfirmProvider defaultOptions={confirmOptions}>
                <RouterProvider router={browserRouter} future={{ v7_startTransition: true }} />
            </ConfirmProvider>
            <ToastContainer position='bottom-left' theme='colored' />
        </ThemeProvider>
    );
}

export default App;
