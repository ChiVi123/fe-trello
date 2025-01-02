import Box from '@mui/material/Box';
import Column from './component/column';

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
            <Column />
            <Column />
        </Box>
    );
}

export default DashboardPage;
