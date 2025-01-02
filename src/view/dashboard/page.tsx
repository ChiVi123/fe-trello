import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Column from './components/column';

function DashboardPage() {
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
            <Column />
            <Column />
            <Column />

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
