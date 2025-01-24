import AppsIcon from '@mui/icons-material/Apps';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import SelectThemeMode from '~components/select-theme-mode';
import TrelloIcon from '~icon/trello';
import DropdownMenu from './components/dropdown-menu';
import Notifications from './components/notifications';
import ProfileMenu from './components/profile-menu';
import TopBarSearchBoard from './components/search-bar';

function AppBar() {
    return (
        <Box
            px={2}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                height: ({ trello }) => trello.appBarHeight,
                bgcolor: ({ palette }) => (palette.mode === 'dark' ? '#2c3e50' : '#1565c0'),
                overflowX: 'auto',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Link to='/boards'>
                    <Tooltip title='Boards list'>
                        <AppsIcon sx={{ color: 'white', verticalAlign: 'middle' }} />
                    </Tooltip>
                </Link>

                <Box
                    component={Link}
                    to='/'
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5, textDecoration: 'none' }}
                >
                    <TrelloIcon fontSize='small' sx={{ color: 'white' }} />
                    <Typography
                        component='span'
                        mt={0.125}
                        sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}
                    >
                        Trello
                    </Typography>
                </Box>

                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
                    <DropdownMenu label='Workspaces' />
                    <DropdownMenu label='Recent' />
                    <DropdownMenu label='Started' />
                    <DropdownMenu label='Templates' />

                    <Button startIcon={<LibraryAddIcon />} sx={{ color: 'white' }}>
                        Create
                    </Button>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TopBarSearchBoard />

                <SelectThemeMode />

                <Notifications />

                <Tooltip title='Help'>
                    <HelpOutlineIcon sx={{ color: 'white', cursor: 'pointer' }} />
                </Tooltip>

                <ProfileMenu />
            </Box>
        </Box>
    );
}

export default AppBar;
