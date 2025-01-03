import Box from '@mui/material/Box';
import { ICardEntity } from '~modules/card/entity';
import Card from './card';

interface IProps {
    data: ICardEntity[];
}

function ListCards({ data }: IProps) {
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
            {data.map((item) => (
                <Card key={item._id} data={item} />
            ))}
        </Box>
    );
}

export default ListCards;
