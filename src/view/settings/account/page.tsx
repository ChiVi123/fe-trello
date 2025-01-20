import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MailIcon from '@mui/icons-material/Mail';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { ChangeEventHandler } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FieldErrorAlert from '~components/field-error-alert';
import { useAppDispatch } from '~core/store';
import { updateUserAPI } from '~modules/user/async-thunk';
import { selectCurrentUser } from '~modules/user/slice';
import { FIELD_REQUIRED_MESSAGE, singleFileValidator } from '~utils/validators';

interface IForm {
    displayName: string;
}

// Custom UI file input: https://mui.com/material-ui/react-button/#file-upload
// MUI recommend: https://github.com/viclafouch/mui-file-input
const VisuallyHiddenInput = styled('input')({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 1,
    height: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
});

function SettingsAccountPage() {
    const currentUser = useSelector(selectCurrentUser);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>({
        defaultValues: { displayName: currentUser?.displayName },
    });
    const dispatch = useAppDispatch();

    const handleOnSubmit: SubmitHandler<IForm> = (data) => {
        const { displayName } = data;
        if (displayName === currentUser?.displayName) return;

        toast.promise(dispatch(updateUserAPI({ displayName })), { pending: 'Updating...' }).then((res) => {
            if (!('error' in res)) {
                toast.success('User updated successfully!');
            }
        });
    };

    const uploadAvatar: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (!e.target.files) return;

        const { files } = e.target;
        const error = singleFileValidator(files[0]);
        if (error) {
            toast.error(error);
            return;
        }

        const reqData = new FormData();
        reqData.append('avatar', files[0]);

        toast.promise(dispatch(updateUserAPI(reqData)), { pending: 'Updating...' }).then((res) => {
            if (!('error' in res)) {
                toast.success('User updated successfully!');
            }
            e.target.value = '';
        });
    };

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box>
                    <Avatar
                        sx={{ width: 84, height: 84, mb: 1 }}
                        alt={currentUser?.username}
                        src={currentUser?.avatar}
                    />
                    <Tooltip title='Upload a new image to update your avatar immediately.'>
                        <Button component='label' variant='contained' size='small' startIcon={<CloudUploadIcon />}>
                            Upload
                            <VisuallyHiddenInput type='file' onChange={uploadAvatar} />
                        </Button>
                    </Tooltip>
                </Box>
                <Box>
                    <Typography variant='h6'>{currentUser?.displayName}</Typography>
                    <Typography sx={{ color: 'grey' }}>@{currentUser?.username}</Typography>
                </Box>
            </Box>

            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '400px' }}>
                    <Box>
                        <TextField
                            label='Your Email'
                            type='text'
                            defaultValue={currentUser?.email}
                            variant='filled'
                            fullWidth
                            disabled
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <MailIcon fontSize='small' />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </Box>

                    <Box>
                        <TextField
                            label='Your Username'
                            type='text'
                            defaultValue={currentUser?.username}
                            variant='filled'
                            fullWidth
                            disabled
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <AccountBoxIcon fontSize='small' />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </Box>

                    <Box>
                        <TextField
                            label='Your Display Name'
                            type='text'
                            variant='outlined'
                            fullWidth
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <AssignmentIndIcon fontSize='small' />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            {...register('displayName', {
                                required: FIELD_REQUIRED_MESSAGE,
                            })}
                            error={!!errors['displayName']}
                        />
                        <FieldErrorAlert errors={errors} fieldName={'displayName'} />
                    </Box>

                    <Box>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            fullWidth
                            className='interceptor-loading'
                        >
                            Update
                        </Button>
                    </Box>
                </Box>
            </form>
        </>
    );
}

export default SettingsAccountPage;
