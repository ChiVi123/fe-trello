import Logout from '@mui/icons-material/Logout';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';

function ProfileMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <Tooltip title='Account settings'>
                <IconButton
                    id='button-dropdown-top-bar'
                    aria-controls={open ? 'menu-dropdown-top-bar' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                    size='small'
                    sx={{ p: 0, border: ({ palette }) => `1px solid ${palette.text.primary}` }}
                    onClick={handleClick}
                >
                    <Avatar
                        src='https://th.bing.com/th/id/OIP.ajU-6rPRyMYAj4s6uMrCowHaE7?rs=1&pid=ImgDetMain'
                        alt='user'
                        sx={{ width: 29, height: 29 }}
                    />
                </IconButton>
            </Tooltip>
            <Menu
                id='menu-dropdown-top-bar'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'button-dropdown-top-bar',
                }}
            >
                <MenuItem>
                    <Avatar sx={{ width: 28, height: 28, mr: 2 }} /> Profile
                </MenuItem>
                <MenuItem>
                    <Avatar sx={{ width: 28, height: 28, mr: 2 }} /> My account
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <PersonAdd fontSize='small' />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize='small' />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Logout fontSize='small' />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default ProfileMenu;
