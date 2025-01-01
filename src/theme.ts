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
    trello: {
        appBarHeight: '48px',
        boardBarHeight: '58px',
    },
});

export default theme;
