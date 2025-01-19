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
import { useConfirm } from 'material-ui-confirm';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '~core/store';
import { logoutAPI } from '~modules/user/async-thunk';
import { selectCurrentUser } from '~modules/user/slice';

function ProfileMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const currentUser = useSelector(selectCurrentUser);
    const confirmLogout = useConfirm();
    const dispatch = useAppDispatch();

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        confirmLogout({
            title: 'Log out of your account?',
            confirmationText: 'Confirm',
            cancellationText: 'Cancel',
        })
            .then(() => dispatch(logoutAPI()))
            .catch(() => {});
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
                    <Avatar src={currentUser?.avatar} alt={currentUser?.displayName} sx={{ width: 29, height: 29 }} />
                </IconButton>
            </Tooltip>
            <Menu
                id='menu-dropdown-top-bar'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'button-dropdown-top-bar',
                }}
            >
                <MenuItem component={Link} to='/settings/account' sx={{ '&:hover': { color: 'success.light' } }}>
                    <Avatar
                        src={currentUser?.avatar}
                        alt={currentUser?.displayName}
                        sx={{ width: 28, height: 28, mr: 2 }}
                    />
                    Profile
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
                <MenuItem sx={{ '&:hover': { color: 'warning.dark' } }} onClick={handleLogout}>
                    <ListItemIcon sx={{ color: 'inherit' }}>
                        <Logout color='inherit' fontSize='small' />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default ProfileMenu;
