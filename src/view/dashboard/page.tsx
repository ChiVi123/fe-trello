import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { mockData } from '~modules/mock-data';
import { mapOrder } from '~utils/sorts';
import Column from './components/column';

function DashboardPage() {
    const {
        board: { columnOrderIds, columns },
    } = mockData;
    const orderedColumns = mapOrder(columns, columnOrderIds, '_id');

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                bgcolor: 'inherit',
                overflowX: 'auto',
                overflowY: 'hidden',
                '&::-webkit-scrollbar-track': { m: 2 },
            }}
        >
            {orderedColumns.map((item) => (
                <Column key={item._id} data={item} />
            ))}

            <Box
                sx={{
                    minWidth: '200px',
                    maxWidth: '200px',
                    height: 'fit-content',
                    mx: 2,
                    borderRadius: '6px',
                    bgcolor: '#ffffff3d',
                }}
            >
                <Button
                    fullWidth
                    startIcon={<NoteAddIcon />}
                    sx={{ justifyContent: 'flex-start', pl: 2.5, py: 1, color: 'white' }}
                >
                    Add new column
                </Button>
            </Box>
        </Box>
    );
}

export default DashboardPage;
