import AppsIcon from '@mui/icons-material/Apps';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import SelectThemeMode from '~components/select-theme-mode';
import TrelloIcon from '~icon/trello';
import DropdownMenu from './components/dropdown-menu';
import ProfileMenu from './components/profile-menu';

function AppBar() {
    return (
        <Box
            px={2}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: ({ trello }) => trello.appBarHeight,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AppsIcon />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <TrelloIcon color='primary' fontSize='small' />
                    <Typography
                        component='span'
                        mt={0.125}
                        sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }}
                    >
                        Trello
                    </Typography>
                </Box>

                <DropdownMenu label='Workspaces' />
                <DropdownMenu label='Recent' />
                <DropdownMenu label='Started' />
                <DropdownMenu label='Templates' />

                <Button variant='outlined'>Create</Button>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField id='search-bar' label='Search' type='search' size='small' />

                <SelectThemeMode />

                <Tooltip title='Notification'>
                    <Badge color='secondary' variant='dot' sx={{ cursor: 'pointer' }}>
                        <NotificationsNoneIcon />
                    </Badge>
                </Tooltip>

                <Tooltip title='Help'>
                    <HelpOutlineIcon sx={{ cursor: 'pointer' }} />
                </Tooltip>

                <ProfileMenu />
            </Box>
        </Box>
    );
}

export default AppBar;
