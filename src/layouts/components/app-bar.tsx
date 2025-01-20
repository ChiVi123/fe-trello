import AppsIcon from '@mui/icons-material/Apps';
import CloseIcon from '@mui/icons-material/Close';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SelectThemeMode from '~components/select-theme-mode';
import TrelloIcon from '~icon/trello';
import DropdownMenu from './components/dropdown-menu';
import ProfileMenu from './components/profile-menu';

function AppBar() {
    const [search, setSearch] = useState<string>('');

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
                <TextField
                    id='search-bar'
                    label='Search'
                    type='text'
                    size='small'
                    value={search}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <SearchIcon sx={{ color: 'white' }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <CloseIcon
                                        fontSize='small'
                                        sx={{ color: search ? 'white' : 'transparent', cursor: 'pointer' }}
                                        onClick={() => setSearch('')}
                                    />
                                </InputAdornment>
                            ),
                        },
                    }}
                    sx={{
                        minWidth: 120,
                        maxWidth: 180,
                        '& label': { color: 'white' },
                        '& input': { color: 'white' },
                        '& label.Mui-focused': { color: 'white' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'white' },
                            '&:hover fieldset': { borderColor: 'white' },
                            '&.Mui-focused fieldset': { borderColor: 'white' },
                        },
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <SelectThemeMode />

                <Tooltip title='Notification'>
                    <Badge color='warning' variant='dot' sx={{ cursor: 'pointer' }}>
                        <NotificationsNoneIcon sx={{ color: 'white' }} />
                    </Badge>
                </Tooltip>

                <Tooltip title='Help'>
                    <HelpOutlineIcon sx={{ color: 'white', cursor: 'pointer' }} />
                </Tooltip>

                <ProfileMenu />
            </Box>
        </Box>
    );
}

export default AppBar;
