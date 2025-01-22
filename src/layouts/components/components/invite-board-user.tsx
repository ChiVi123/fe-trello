import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { MouseEventHandler, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import FieldErrorAlert from '~components/field-error-alert';
import { socketIO } from '~core/socket';
import { inviteUserToBoardAPI } from '~modules/user/repository';
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE } from '~utils/validators';

interface IForm {
    inviteeEmail: string | null;
}
interface IProps {
    boardId: string | undefined;
}

function InviteBoardUser({ boardId }: IProps) {
    // https://mui.com/material-ui/react-popover/
    const [anchorPopoverElement, setAnchorPopoverElement] = useState<(EventTarget & HTMLButtonElement) | null>(null);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IForm>();

    const isOpenPopover = Boolean(anchorPopoverElement);
    const popoverId = isOpenPopover ? 'invite-board-user-popover' : undefined;

    const handleTogglePopover: MouseEventHandler<HTMLButtonElement> = (event) => {
        if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget);
        else setAnchorPopoverElement(null);
    };

    const handleOnSubmit: SubmitHandler<IForm> = (data) => {
        inviteUserToBoardAPI({ ...data, boardId }).then((invitation) => {
            setValue('inviteeEmail', null);
            setAnchorPopoverElement(null);

            socketIO.emit('FE_USER_WERE_INVITED_TO_BOARD', invitation);
        });
    };

    return (
        <Box>
            <Tooltip title='Invite user to this board!'>
                <Button
                    aria-describedby={popoverId}
                    variant='outlined'
                    startIcon={<PersonAddIcon />}
                    sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white' } }}
                    onClick={handleTogglePopover}
                >
                    Invite
                </Button>
            </Tooltip>

            <Popover
                id={popoverId}
                open={isOpenPopover}
                anchorEl={anchorPopoverElement}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={handleTogglePopover}
            >
                <form style={{ width: '320px' }} onSubmit={handleSubmit(handleOnSubmit)}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: '15px 20px 20px 20px' }}>
                        <Typography component='span' sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                            Invite User To This Board!
                        </Typography>
                        <Box>
                            <TextField
                                type='text'
                                variant='outlined'
                                label='Enter email to invite'
                                autoFocus
                                fullWidth
                                {...register('inviteeEmail', {
                                    required: FIELD_REQUIRED_MESSAGE,
                                    pattern: { value: EMAIL_RULE, message: EMAIL_RULE_MESSAGE },
                                })}
                                error={!!errors['inviteeEmail']}
                            />
                            <FieldErrorAlert errors={errors} fieldName={'inviteeEmail'} />
                        </Box>

                        <Box sx={{ alignSelf: 'flex-end' }}>
                            <Button type='submit' variant='contained' color='info' className='interceptor-loading'>
                                Invite
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Popover>
        </Box>
    );
}

export default InviteBoardUser;
