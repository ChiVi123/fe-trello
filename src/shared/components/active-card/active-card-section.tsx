import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { KeyboardEventHandler } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '~modules/user/slice';

function ActiveCardSection() {
    const currentUser = useSelector(selectCurrentUser);
    const src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0KwDNZxHDHnlRVMHvkp3RIrP8Zg9i6STdUg&s';
    const alt = 'Ronaldo in 2008';

    const handleAddCardComment: KeyboardEventHandler<HTMLDivElement> = (event) => {
        // Not event Shift Enter
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if (!event.currentTarget.nodeValue) return;

            const commentToAdd = {
                userAvatar: currentUser?.avatar,
                userDisplayName: currentUser?.displayName,
                content: event.currentTarget.nodeValue.trim(),
            };
            console.log('🚀 ~ handleAddCardComment ~ commentToAdd:', commentToAdd);
        }
    };

    return (
        <Box sx={{ mt: 2 }}>
            {/* Add comment to Card */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Avatar
                    sx={{ width: 36, height: 36, cursor: 'pointer' }}
                    alt={currentUser?.username}
                    src={currentUser?.avatar}
                />
                <TextField
                    type='text'
                    variant='outlined'
                    placeholder='Write a comment...'
                    fullWidth
                    multiline
                    onKeyDown={handleAddCardComment}
                />
            </Box>

            {[...Array(0)].length === 0 && (
                <Typography sx={{ pl: '45px', fontSize: '14px', fontWeight: '500', color: '#b1b1b1' }}>
                    No activity found!
                </Typography>
            )}
            {[...Array(6)].map((_, index) => (
                <Box sx={{ display: 'flex', gap: 1, width: '100%', mb: 1.5 }} key={index}>
                    <Tooltip title={alt}>
                        <Avatar
                            sx={{ width: 36, height: 36, cursor: 'pointer' }}
                            alt={currentUser?.username}
                            src={src}
                        />
                    </Tooltip>
                    <Box sx={{ width: 'inherit' }}>
                        <Typography component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                            Siuuu
                        </Typography>

                        <Typography component='span' sx={{ fontSize: '12px' }}>
                            {moment().format('llll')}
                        </Typography>

                        <Box
                            sx={{
                                display: 'block',
                                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#33485D' : 'white'),
                                p: '8px 12px',
                                mt: '4px',
                                border: '0.5px solid rgba(0, 0, 0, 0.2)',
                                borderRadius: '4px',
                                wordBreak: 'break-word',
                                boxShadow: '0 0 1px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            This is a comment!
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}

export default ActiveCardSection;
