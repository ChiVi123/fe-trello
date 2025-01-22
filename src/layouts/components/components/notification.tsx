import DoneIcon from '@mui/icons-material/Done';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { MouseEventHandler, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BOARD_INVITATION_STATUS } from '~core/constants';
import { useAppDispatch } from '~core/store';
import { getInvitationsAPI, updateBoardInvitationAPI } from '~modules/notifications/async-thunk';
import { selectCurrentNotifications } from '~modules/notifications/slice';

function Notifications() {
    const [anchorEl, setAnchorEl] = useState<HTMLSpanElement | null>(null);
    const notifications = useSelector(selectCurrentNotifications);
    const dispatch = useAppDispatch();

    const open = Boolean(anchorEl);

    useEffect(() => {
        const promise = dispatch(getInvitationsAPI());
        return () => {
            promise.abort();
        };
    }, [dispatch]);

    const handleUpdateBoardInvitation = (invitationId: string, status: BOARD_INVITATION_STATUS) => {
        dispatch(updateBoardInvitationAPI({ invitationId, status })).then((res) => {
            console.log('🚀 ~ dispatch ~ res:', res);
        });
    };
    const handleClickNotificationIcon: MouseEventHandler<HTMLSpanElement> = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => setAnchorEl(null);

    return (
        <Box>
            <Tooltip title='Notifications'>
                <Badge
                    id='basic-button-open-notification'
                    aria-controls={open ? 'basic-notification-drop-down' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                    color='warning'
                    // variant="none"
                    variant='dot'
                    sx={{ cursor: 'pointer' }}
                    onClick={handleClickNotificationIcon}
                >
                    <NotificationsNoneIcon
                        sx={{
                            // color: 'white'
                            color: 'yellow',
                        }}
                    />
                </Badge>
            </Tooltip>

            <Menu
                id='basic-notification-drop-down'
                anchorEl={anchorEl}
                open={open}
                MenuListProps={{ 'aria-labelledby': 'basic-button-open-notification' }}
                sx={{ mt: 2 }}
                onClose={handleClose}
            >
                {(!notifications || notifications.length === 0) && (
                    <MenuItem sx={{ minWidth: 200 }}>You do not have any new notifications.</MenuItem>
                )}
                {notifications?.map((item, index) => (
                    <Box key={item._id}>
                        <MenuItem
                            sx={{
                                minWidth: 200,
                                maxWidth: 360,
                                overflowY: 'auto',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                    maxWidth: '100%',
                                    wordBreak: 'break-word',
                                    whiteSpace: 'pre-wrap',
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box>
                                        <GroupAddIcon fontSize='small' />
                                    </Box>
                                    <Box>
                                        <strong>{item.inviter.displayName} </strong>
                                        had invited you to join the board
                                        <strong> {item.board.title}</strong>
                                    </Box>
                                </Box>

                                {item.boardInvitation?.status === BOARD_INVITATION_STATUS.PENDING && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                            gap: 1,
                                        }}
                                    >
                                        <Button
                                            type='submit'
                                            variant='contained'
                                            color='success'
                                            size='small'
                                            className='interceptor-loading'
                                            onClick={() =>
                                                handleUpdateBoardInvitation(item._id, BOARD_INVITATION_STATUS.ACCEPTED)
                                            }
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            type='submit'
                                            variant='contained'
                                            color='warning'
                                            size='small'
                                            className='interceptor-loading'
                                            onClick={() =>
                                                handleUpdateBoardInvitation(item._id, BOARD_INVITATION_STATUS.REJECTED)
                                            }
                                        >
                                            Reject
                                        </Button>
                                    </Box>
                                )}

                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                                    {item.boardInvitation?.status === BOARD_INVITATION_STATUS.ACCEPTED && (
                                        <Chip icon={<DoneIcon />} label='Accepted' color='success' size='small' />
                                    )}

                                    {item.boardInvitation?.status === BOARD_INVITATION_STATUS.REJECTED && (
                                        <Chip icon={<NotInterestedIcon />} label='Rejected' size='small' />
                                    )}
                                </Box>

                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography component='span' sx={{ fontSize: '13px' }}>
                                        {moment(item.createdAt).format('llll')}
                                    </Typography>
                                </Box>
                            </Box>
                        </MenuItem>
                        {index !== notifications.length - 1 && <Divider />}
                    </Box>
                ))}
            </Menu>
        </Box>
    );
}

export default Notifications;
