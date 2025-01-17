import LockIcon from '@mui/icons-material/Lock';
import { Card as MuiCard } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import FieldErrorAlert from '~components/field-error-alert';
import { ReactComponent as TrelloIcon } from '~svg/trello.svg';
import {
    EMAIL_RULE,
    EMAIL_RULE_MESSAGE,
    FIELD_REQUIRED_MESSAGE,
    PASSWORD_RULE,
    PASSWORD_RULE_MESSAGE,
} from '~utils/validators';

interface IRegisterForm {
    email: string;
    password: string;
    passwordConfirmation: string;
}

function RegisterPage() {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<IRegisterForm>();

    const handleRegister: SubmitHandler<IRegisterForm> = async (data) => {
        console.log('🚀 ~ handleRegister ~ data:', data);
    };
    return (
        <form onSubmit={handleSubmit(handleRegister)}>
            <Zoom in={true} style={{ transitionDelay: '200ms' }}>
                <MuiCard sx={{ minWidth: 380, maxWidth: 380, marginTop: '6em' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, margin: '1em' }}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                            <LockIcon />
                        </Avatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                            <TrelloIcon />
                        </Avatar>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '1em',
                            color: 'grey.500',
                        }}
                    >
                        Author: chividev
                    </Box>

                    <Box sx={{ padding: '0 1em 1em 1em' }}>
                        <Box sx={{ marginTop: '1em' }}>
                            <TextField
                                // autoComplete="nope"
                                label='Email'
                                type='text'
                                variant='outlined'
                                autoFocus
                                fullWidth
                                error={!!errors['email']}
                                {...register('email', {
                                    required: FIELD_REQUIRED_MESSAGE,
                                    pattern: { value: EMAIL_RULE, message: EMAIL_RULE_MESSAGE },
                                })}
                            />
                            <FieldErrorAlert errors={errors} fieldName='email' />
                        </Box>

                        <Box sx={{ marginTop: '1em' }}>
                            <TextField
                                label='Password'
                                type='password'
                                variant='outlined'
                                fullWidth
                                error={!!errors['password']}
                                {...register('password', {
                                    required: FIELD_REQUIRED_MESSAGE,
                                    pattern: { value: PASSWORD_RULE, message: PASSWORD_RULE_MESSAGE },
                                })}
                            />
                            <FieldErrorAlert errors={errors} fieldName='password' />
                        </Box>

                        <Box sx={{ marginTop: '1em' }}>
                            <TextField
                                label='Password Confirmation'
                                type='password'
                                variant='outlined'
                                fullWidth
                                error={!!errors['passwordConfirmation']}
                                {...register('passwordConfirmation', {
                                    validate: (value) => {
                                        if (value === watch('password')) return true;
                                        return 'Password Confirmation does not match';
                                    },
                                })}
                            />
                            <FieldErrorAlert errors={errors} fieldName='passwordConfirmation' />
                        </Box>
                    </Box>

                    <CardActions sx={{ padding: '0 1em 1em 1em' }}>
                        <Button type='submit' variant='contained' color='primary' size='large' fullWidth>
                            Register
                        </Button>
                    </CardActions>

                    <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
                        <Typography>Already have an account?</Typography>
                        <Link to='/login' style={{ textDecoration: 'none' }}>
                            <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}>
                                Log in!
                            </Typography>
                        </Link>
                    </Box>
                </MuiCard>
            </Zoom>
        </form>
    );
}

export default RegisterPage;
