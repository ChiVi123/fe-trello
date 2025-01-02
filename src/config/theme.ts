import { createTheme } from '@mui/material/styles';

const APP_BAR_HEIGHT = '58px';
const BOARD_BAR_HEIGHT = '58px';
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;
const COLUMN_HEADER_HEIGHT = '50px';
const COLUMN_FOOTER_HEIGHT = '56px';

declare module '@mui/material/styles' {
    interface Theme {
        trello: {
            appBarHeight: string;
            boardBarHeight: string;
            boardContentHeight: string;
            columnHeaderHeight: string;
            columnFooterHeight: string;
        };
    }
    // allow configuration using `createTheme()`
    interface ThemeOptions {
        trello?: {
            appBarHeight?: string;
            boardBarHeight?: string;
            boardContentHeight?: string;
            columnHeaderHeight?: string;
            columnFooterHeight?: string;
        };
    }
}

const theme = createTheme({
    cssVariables: { colorSchemeSelector: 'class' },
    colorSchemes: { light: {}, dark: {} },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    '*::-webkit-scrollbar': {
                        width: '8px',
                        height: '8px',
                    },
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: '#dcdde1',
                        borderRadius: '8px',
                    },
                    '*::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: 'white',
                    },
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: { '&.MuiTypography-body1': { fontSize: '0.875rem' } },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: { textTransform: 'none', borderWidth: 0.5 },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: { fontSize: '0.875rem' },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    fontSize: '0.875rem',
                    '& fieldset': { borderWidth: '0.5px !important' },
                    '&:hover fieldset, &.Mui-focused fieldset': { borderWidth: '1px !important' },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    '& .MuiChip-label': { marginTop: '2px', lineHeight: 1 },
                },
            },
        },
    },
    trello: {
        appBarHeight: APP_BAR_HEIGHT,
        boardBarHeight: BOARD_BAR_HEIGHT,
        boardContentHeight: BOARD_CONTENT_HEIGHT,
        columnHeaderHeight: COLUMN_HEADER_HEIGHT,
        columnFooterHeight: COLUMN_FOOTER_HEIGHT,
    },
});

export default theme;
