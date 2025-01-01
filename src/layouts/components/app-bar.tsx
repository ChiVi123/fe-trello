import Box from '@mui/material/Box';
import SelectThemeMode from '~components/select-theme-mode';

function AppBar() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                height: ({ trello }) => trello.appBarHeight,
                bgcolor: 'primary.light',
            }}
        >
            <SelectThemeMode />
        </Box>
    );
}

export default AppBar;
