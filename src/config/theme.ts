import { cyan, deepOrange, orange, teal } from '@mui/material/colors';
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
    cssVariables: {
        colorSchemeSelector: 'class',
    },
    colorSchemes: {
        light: { palette: { primary: teal, secondary: deepOrange } },
        dark: { palette: { primary: cyan, secondary: orange } },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: ({ theme }) => ({
                    fontSize: '0.875rem',
                    color: theme.palette.primary.main,
                }),
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: ({ theme }) => ({
                    fontSize: '0.875rem',
                    color: theme.palette.primary.main,
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.light,
                    },
                    '&:hover': {
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.light,
                        },
                    },
                    '& fieldset': {
                        borderWidth: '1px !important',
                    },
                }),
            },
        },
    },
    trello: {
        appBarHeight: '58px',
        boardBarHeight: '60px',
    },
});

export default theme;
