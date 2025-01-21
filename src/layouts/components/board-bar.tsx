import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import { useSelector } from 'react-redux';
import { selectCurrentBoard } from '~modules/board/slice';
import { capitalizeFirstLetter } from '~utils/formatters';
import BoardUserGroup from './board-user-group';

const MENU_STYLE = {
    px: '5px',
    bgcolor: 'transparent',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    '& .MuiSvgIcon-root': { color: 'white' },
    '&:hover': { bgcolor: 'primary.50' },
};

function BoardBar() {
    const board = useSelector(selectCurrentBoard);
    return (
        <Box
            px={2}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                height: ({ trello }) => trello.boardBarHeight,
                bgcolor: ({ palette }) => (palette.mode === 'dark' ? '#34495e' : '#1976d2'),
                overflowX: 'auto',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Tooltip title={board?.description}>
                    <Chip label={board?.title} icon={<DashboardIcon />} clickable sx={MENU_STYLE} />
                </Tooltip>

                <Chip label={capitalizeFirstLetter(board?.type)} icon={<VpnLockIcon />} clickable sx={MENU_STYLE} />

                <Chip label='Add to Google Drive' icon={<AddToDriveIcon />} clickable sx={MENU_STYLE} />

                <Chip label='Automation' icon={<BoltIcon />} clickable sx={MENU_STYLE} />

                <Chip label='Filters' icon={<FilterListIcon />} clickable sx={MENU_STYLE} />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                    variant='outlined'
                    size='small'
                    startIcon={<PersonAddIcon />}
                    sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white' } }}
                >
                    Invite
                </Button>

                <BoardUserGroup />
            </Box>
        </Box>
    );
}

export default BoardBar;
