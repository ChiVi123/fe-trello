import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import { MouseEventHandler, useState } from 'react';
import { IUserEntity } from '~modules/user/entity';

interface IProps {
    boardUsers?: IUserEntity[];
    limit?: number;
}

function BoardUserGroup({ boardUsers = [], limit = 4 }: IProps) {
    // https://mui.com/material-ui/react-popover/
    const [anchorPopoverElement, setAnchorPopoverElement] = useState<HTMLDivElement | null>(null);

    const src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0KwDNZxHDHnlRVMHvkp3RIrP8Zg9i6STdUg&s';
    const alt = 'Ronaldo in 2008';
    const isOpenPopover = Boolean(anchorPopoverElement);
    const popoverId = isOpenPopover ? 'board-all-users-popover' : undefined;

    const handleTogglePopover: MouseEventHandler<HTMLDivElement> = (event) => {
        if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget);
        else setAnchorPopoverElement(null);
    };

    return (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
            {[...Array(12)].slice(0, limit).map((_, index) => (
                <Tooltip key={index} title={alt}>
                    <Avatar alt={alt} src={src} sx={{ width: 34, height: 34, cursor: 'pointer' }} />
                </Tooltip>
            ))}

            {[...Array(12)].length > limit && (
                <Tooltip title='Show more'>
                    <Box
                        aria-describedby={popoverId}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 36,
                            height: 36,
                            backgroundColor: '#a4b0be',
                            borderRadius: '50%',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: 'white',
                            cursor: 'pointer',
                        }}
                        onClick={handleTogglePopover}
                    >
                        +{[...Array(12)].length - limit}
                    </Box>
                </Tooltip>
            )}

            <Popover
                id={popoverId}
                open={isOpenPopover}
                anchorEl={anchorPopoverElement}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                onClose={handleTogglePopover}
            >
                <Box sx={{ p: 2, maxWidth: '235px', display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {[...Array(12)].map((_, index) => (
                        <Tooltip key={index} title={alt}>
                            <Avatar alt={alt} src={src} sx={{ width: 34, height: 34, cursor: 'pointer' }} />
                        </Tooltip>
                    ))}
                </Box>
            </Popover>
        </Box>
    );
}

export default BoardUserGroup;
