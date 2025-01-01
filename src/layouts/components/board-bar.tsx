import Box from '@mui/material/Box';

function BoardBar() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                height: ({ trello }) => trello.boardBarHeight,
                bgcolor: 'primary.dark',
            }}
        >
            Board bar
        </Box>
    );
}

export default BoardBar;
