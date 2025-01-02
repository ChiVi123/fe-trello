import Box from '@mui/material/Box';
import Card from './card';

function ListCards() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                maxHeight: ({ trello, spacing }) => `calc(
                    ${trello.boardContentHeight} -
                    ${spacing(5)} -
                    ${trello.columnHeaderHeight} -
                    ${trello.columnFooterHeight}
                )`,
                px: '5px',
                mx: '5px',
                overflowX: 'hidden',
                overflowY: 'auto',
                '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da' },
                '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#bfc2cf' },
            }}
        >
            <Card />
            <Card temporaryHiddenMedia />
            <Card temporaryHiddenMedia />
            <Card temporaryHiddenMedia />
            <Card temporaryHiddenMedia />
            <Card temporaryHiddenMedia />
        </Box>
    );
}

export default ListCards;
