// import { cyan, deepOrange, orange, teal } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Theme {
        trello: {
            appBarHeight: string;
            boardBarHeight: string;
        };
    }
    // allow configuration using `createTheme()`
    interface ThemeOptions {
        trello?: {
            appBarHeight?: string;
            boardBarHeight?: string;
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
    },
    trello: {
        appBarHeight: '58px',
        boardBarHeight: '60px',
    },
});

export default theme;
