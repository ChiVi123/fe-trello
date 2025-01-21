import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import { MouseEventHandler, useState } from 'react';
import { IUserEntity } from '~modules/user/entity';

interface IProps {
    boardUsers?: IUserEntity[];
}

function CardUserGroup({ cardMemberIds = [] }: IProps) {
    const [anchorPopoverElement, setAnchorPopoverElement] = useState<HTMLDivElement | null>(null);

    const src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0KwDNZxHDHnlRVMHvkp3RIrP8Zg9i6STdUg&s';
    const alt = 'Ronaldo in 2008';

    const isOpenPopover = Boolean(anchorPopoverElement);
    const popoverId = isOpenPopover ? 'card-all-users-popover' : undefined;

    const handleTogglePopover: MouseEventHandler<HTMLDivElement> = (event) => {
        if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget);
        else setAnchorPopoverElement(null);
    };

    return (
        <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {[...Array(8)].map((_, index) => (
                <Tooltip key={index} title={alt}>
                    <Avatar sx={{ width: 34, height: 34, cursor: 'pointer' }} alt={alt} src={src} />
                </Tooltip>
            ))}

            <Tooltip title='Add new member'>
                <Box
                    aria-describedby={popoverId}
                    onClick={handleTogglePopover}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2f3542' : theme.palette.grey[200]),

                        fontSize: '14px',
                        fontWeight: '600',
                        color: (theme) => (theme.palette.mode === 'dark' ? '#90caf9' : '#172b4d'),

                        cursor: 'pointer',

                        '&:hover': {
                            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#90caf9' : '#e9f2ff'),
                            color: (theme) => (theme.palette.mode === 'dark' ? '#000000de' : '#0c66e4'),
                        },
                    }}
                >
                    <AddIcon fontSize='small' />
                </Box>
            </Tooltip>

            <Popover
                id={popoverId}
                open={isOpenPopover}
                anchorEl={anchorPopoverElement}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                onClose={handleTogglePopover}
            >
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, maxWidth: '260px', p: 2 }}>
                    {[...Array(16)].map((_, index) => (
                        <Tooltip key={index} title={alt}>
                            {/* https://mui.com/material-ui/react-avatar/#with-badge */}
                            <Badge
                                overlap='rectangular'
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={<CheckCircleIcon fontSize='small' sx={{ color: '#27ae60' }} />}
                                sx={{ cursor: 'pointer' }}
                            >
                                <Avatar alt={alt} src={src} sx={{ width: 34, height: 34 }} />
                            </Badge>
                        </Tooltip>
                    ))}
                </Box>
            </Popover>
        </Box>
    );
}

export default CardUserGroup;
