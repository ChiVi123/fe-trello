import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

const MENU_STYLE = {
    px: '5px',
    bgcolor: 'white',
    border: 'none',
    borderRadius: '4px',
    color: 'primary.main',
    '& .MuiSvgIcon-root': { color: 'primary.main' },
    '&:hover': { bgcolor: 'primary.50' },
};

function BoardBar() {
    return (
        <Box
            px={2}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                height: ({ trello }) => trello.appBarHeight,
                borderTop: ({ palette }) => `1px solid ${palette.primary.main}`,
                overflowX: 'auto',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label='account' icon={<DashboardIcon />} clickable sx={MENU_STYLE} />

                <Chip label='Public/Private' icon={<VpnLockIcon />} clickable sx={MENU_STYLE} />

                <Chip label='Add to Google Drive' icon={<AddToDriveIcon />} clickable sx={MENU_STYLE} />

                <Chip label='Automation' icon={<BoltIcon />} clickable sx={MENU_STYLE} />

                <Chip label='Filters' icon={<FilterListIcon />} clickable sx={MENU_STYLE} />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button variant='outlined' size='small' startIcon={<PersonAddIcon />}>
                    Invite
                </Button>

                <AvatarGroup max={7}>
                    <Tooltip title='Remy Sharp'>
                        <Avatar
                            alt='Remy Sharp'
                            src='https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/f4/f4f4575e3cd474113b339ae746204f7fa557ece6_full.jpg'
                        />
                    </Tooltip>

                    <Tooltip title='Remy Sharp'>
                        <Avatar
                            alt='Remy Sharp'
                            src='https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/f4/f4fa1a998b3638f6b0fb86f995bbae6077e3779e_full.jpg'
                        />
                    </Tooltip>

                    <Tooltip title='Remy Sharp'>
                        <Avatar
                            alt='Remy Sharp'
                            src='https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/f5/f505d3519bf5a04323b108388b1abce1371b5118_full.jpg'
                        />
                    </Tooltip>

                    <Tooltip title='Remy Sharp'>
                        <Avatar
                            alt='Remy Sharp'
                            src='https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/f5/f559572c356ae9554890eceb701670f15b90fbe6_full.jpg'
                        />
                    </Tooltip>

                    <Tooltip title='Remy Sharp'>
                        <Avatar
                            alt='Remy Sharp'
                            src='https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/c3/c3b9d16542836cc329f1ab3d66ce16bd27ab8fbf_full.jpg'
                        />
                    </Tooltip>

                    <Tooltip title='Remy Sharp'>
                        <Avatar
                            alt='Remy Sharp'
                            src='https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/c3/c3919cb81904f52777705e8aaac9fa8629a082f7_full.jpg'
                        />
                    </Tooltip>

                    <Tooltip title='Remy Sharp'>
                        <Avatar
                            alt='Remy Sharp'
                            src='https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/c3/c39115cafcce96493b908445babad3ba65214b34_full.jpg'
                        />
                    </Tooltip>

                    <Tooltip title='Remy Sharp'>
                        <Avatar
                            alt='Remy Sharp'
                            src='https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/c3/c39115cafcce96493b908445babad3ba65214b34_full.jpg'
                        />
                    </Tooltip>

                    <Tooltip title='Remy Sharp'>
                        <Avatar
                            alt='Remy Sharp'
                            src='https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/c3/c39115cafcce96493b908445babad3ba65214b34_full.jpg'
                        />
                    </Tooltip>

                    <Tooltip title='Remy Sharp'>
                        <Avatar
                            alt='Remy Sharp'
                            src='https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/c3/c39115cafcce96493b908445babad3ba65214b34_full.jpg'
                        />
                    </Tooltip>
                </AvatarGroup>
            </Box>
        </Box>
    );
}

export default BoardBar;
