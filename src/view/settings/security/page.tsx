import LockIcon from '@mui/icons-material/Lock';
import LockResetIcon from '@mui/icons-material/LockReset';
import LogoutIcon from '@mui/icons-material/Logout';
import PasswordIcon from '@mui/icons-material/Password';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useConfirm } from 'material-ui-confirm';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import FieldErrorAlert from '~components/field-error-alert';
import { useAppDispatch } from '~core/store';
import { logoutAPI, updateUserAPI } from '~modules/user/async-thunk';
import { FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~utils/validators';

interface IForm {
    currentPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
}

function SettingsSecurityPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IForm>();
    const confirmChangePassword = useConfirm();
    const dispatch = useAppDispatch();

    const handleOnSubmit: SubmitHandler<IForm> = (data) => {
        confirmChangePassword({
            title: (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LogoutIcon sx={{ color: 'warning.dark' }} /> Change Password
                </Box>
            ),
            description: 'You have to login again after successfully changing your password. Continue?',
            confirmationText: 'Confirm',
            cancellationText: 'Cancel',
        })
            .then(() => {
                const { currentPassword, newPassword } = data;
                toast
                    .promise(dispatch(updateUserAPI({ currentPassword, newPassword })), { pending: 'Updating...' })
                    .then((res) => {
                        if (!('error' in res)) {
                            toast.success('Successfully changed your password, \n Please login again');
                            dispatch(logoutAPI(false));
                        }
                    });
            })
            .catch(() => {});
    };

    return (
        <>
            <Box>
                <Typography variant='h5'>Security Dashboard</Typography>
            </Box>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '400px' }}>
                    <Box>
                        <TextField
                            label='Current Password'
                            type='password'
                            variant='outlined'
                            fullWidth
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <PasswordIcon fontSize='small' />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            {...register('currentPassword', {
                                required: FIELD_REQUIRED_MESSAGE,
                                pattern: {
                                    value: PASSWORD_RULE,
                                    message: PASSWORD_RULE_MESSAGE,
                                },
                            })}
                            error={!!errors['currentPassword']}
                        />
                        <FieldErrorAlert errors={errors} fieldName='currentPassword' />
                    </Box>

                    <Box>
                        <TextField
                            fullWidth
                            label='New Password'
                            type='password'
                            variant='outlined'
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <LockIcon fontSize='small' />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            {...register('newPassword', {
                                required: FIELD_REQUIRED_MESSAGE,
                                pattern: {
                                    value: PASSWORD_RULE,
                                    message: PASSWORD_RULE_MESSAGE,
                                },
                            })}
                            error={!!errors['newPassword']}
                        />
                        <FieldErrorAlert errors={errors} fieldName='newPassword' />
                    </Box>

                    <Box>
                        <TextField
                            fullWidth
                            label='New Password Confirmation'
                            type='password'
                            variant='outlined'
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <LockResetIcon fontSize='small' />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            {...register('newPasswordConfirmation', {
                                validate: (value) => {
                                    if (value === watch('newPassword')) return true;
                                    return 'Password confirmation does not match.';
                                },
                            })}
                            error={!!errors['newPasswordConfirmation']}
                        />
                        <FieldErrorAlert errors={errors} fieldName='newPasswordConfirmation' />
                    </Box>

                    <Box>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            fullWidth
                            className='interceptor-loading'
                        >
                            Change
                        </Button>
                    </Box>
                </Box>
            </form>
        </>
    );
}

export default SettingsSecurityPage;
