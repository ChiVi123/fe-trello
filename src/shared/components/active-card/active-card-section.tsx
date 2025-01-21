import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { KeyboardEventHandler } from 'react';
import { useSelector } from 'react-redux';
import { CardComment } from '~modules/card/entity';
import { selectCurrentUser } from '~modules/user/slice';

type CommentToAdd = {
    userAvatar: string | undefined;
    userDisplayName: string | undefined;
    content: string;
};
interface IProps {
    cardComments?: CardComment[];
    onAddCardComments?: (value: CommentToAdd) => Promise<void>;
}

function ActiveCardSection({ cardComments = [], onAddCardComments }: IProps) {
    const currentUser = useSelector(selectCurrentUser);

    const handleAddCardComment: KeyboardEventHandler = (event) => {
        // Not event Shift Enter
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            const value = (event.target as HTMLInputElement).value;
            if (!value) return;

            const commentToAdd = {
                userAvatar: currentUser?.avatar,
                userDisplayName: currentUser?.displayName,
                content: value.trim(),
            };
            onAddCardComments?.(commentToAdd).then(() => {
                (event.target as HTMLInputElement).value = '';
            });
        }
    };

    return (
        <Box sx={{ mt: 2 }}>
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

            {cardComments.length === 0 && (
                <Typography sx={{ pl: '45px', fontSize: '14px', fontWeight: '500', color: '#b1b1b1' }}>
                    No activity found!
                </Typography>
            )}
            {cardComments.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1, width: '100%', mb: 1.5 }}>
                    <Tooltip title={item.userDisplayName}>
                        <Avatar
                            alt={item.userDisplayName}
                            src={item.userAvatar}
                            sx={{ width: 36, height: 36, cursor: 'pointer' }}
                        />
                    </Tooltip>
                    <Box sx={{ width: 'inherit' }}>
                        <Typography component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                            {item.userDisplayName}
                        </Typography>

                        <Typography component='span' sx={{ fontSize: '12px' }}>
                            {moment(item.commentedAt).format('llll')}
                        </Typography>

                        <Box
                            sx={{
                                display: 'block',
                                p: '8px 12px',
                                mt: '4px',
                                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#33485D' : 'white'),
                                border: '0.5px solid rgba(0, 0, 0, 0.2)',
                                borderRadius: '4px',
                                wordBreak: 'break-word',
                                boxShadow: '0 0 1px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            {item.content}
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}

export default ActiveCardSection;
