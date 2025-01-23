import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import { MouseEventHandler, useState } from 'react';
import { useSelector } from 'react-redux';
import { CARD_MEMBERS_ACTIONS } from '~core/constants';
import { selectCurrentBoard } from '~modules/board/slice';
import { IUserEntity } from '~modules/user/entity';

interface IProps {
    cardMemberIds?: string[];
    onUpdateCardMembers?: (value: { userId: string; action: CARD_MEMBERS_ACTIONS }) => void;
}

function CardUserGroup({ cardMemberIds = [], onUpdateCardMembers }: IProps) {
    const [anchorPopoverElement, setAnchorPopoverElement] = useState<HTMLDivElement | null>(null);
    const currentBoard = useSelector(selectCurrentBoard);

    const isUserInCardMembers = (id: string): boolean => cardMemberIds.includes(id);
    const FE_card_members = cardMemberIds.map((memberId) =>
        currentBoard?.FE_all_users.find((user) => user._id === memberId)
    );

    const isOpenPopover = Boolean(anchorPopoverElement);
    const popoverId = isOpenPopover ? 'card-all-users-popover' : undefined;

    const handleTogglePopover: MouseEventHandler<HTMLDivElement> = (event) => {
        if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget);
        else setAnchorPopoverElement(null);
    };
    const handleUpdateCardMembers = (user: IUserEntity) => {
        const incomingUserInfo = {
            userId: user._id,
            action: isUserInCardMembers(user._id) ? CARD_MEMBERS_ACTIONS.REMOVE : CARD_MEMBERS_ACTIONS.ADD,
        };
        onUpdateCardMembers?.(incomingUserInfo);
    };

    return (
        <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {FE_card_members?.map((item) => (
                <Tooltip key={item?._id} title={item?.displayName}>
                    <Avatar
                        sx={{ width: 34, height: 34, cursor: 'pointer' }}
                        alt={item?.displayName}
                        src={item?.avatar}
                    />
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
                    {currentBoard?.FE_all_users.map((item) => (
                        <Tooltip key={item._id} title={item.displayName}>
                            {/* https://mui.com/material-ui/react-avatar/#with-badge */}
                            <Badge
                                overlap='rectangular'
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    isUserInCardMembers(item._id) ? (
                                        <CheckCircleIcon fontSize='small' sx={{ color: '#27ae60' }} />
                                    ) : null
                                }
                                sx={{ cursor: 'pointer' }}
                                onClick={() => handleUpdateCardMembers(item)}
                            >
                                <Avatar alt={item.displayName} src={item.avatar} sx={{ width: 34, height: 34 }} />
                            </Badge>
                        </Tooltip>
                    ))}
                </Box>
            </Popover>
        </Box>
    );
}

export default CardUserGroup;
