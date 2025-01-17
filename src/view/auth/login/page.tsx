import LockIcon from '@mui/icons-material/Lock';
import { Card as MuiCard } from '@mui/material';
// import Alert from '@mui/material/Alert';
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

interface ILoginForm {
    email: string;
    password: string;
}

function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginForm>();

    const handleLogIn: SubmitHandler<ILoginForm> = async (data) => {
        console.log('🚀 ~ handleLogIn ~ data:', data);
    };

    return (
        <form onSubmit={handleSubmit(handleLogIn)}>
            <Zoom in={true} style={{ transitionDelay: '200ms' }}>
                <MuiCard sx={{ minWidth: 480, maxWidth: 480, my: '2em' }}>
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
                        Author: ChiViDev
                    </Box>

                    {/* <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            padding: '0 1em',
                            marginTop: '1em',
                        }}
                    >
                        <Alert severity='success' sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
                            Your email&nbsp;
                            <Typography component='span' sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>
                                chividev@gmail.com
                            </Typography>
                            &nbsp;has been verified.
                            <br />
                            Now you can login to enjoy our services! Have a good day!
                        </Alert>

                        <Alert severity='info' sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
                            An email has been sent to&nbsp;
                            <Typography component='span' sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>
                                chividev@gmail.com
                            </Typography>
                            <br />
                            Please check and verify your account before logging in!
                        </Alert>
                    </Box> */}

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
                    </Box>
                    <CardActions sx={{ padding: '0 1em 1em 1em' }}>
                        <Button type='submit' variant='contained' color='primary' size='large' fullWidth>
                            Login
                        </Button>
                    </CardActions>
                    <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
                        <Typography>New to Trello MERN Stack?</Typography>
                        <Link to='/register' style={{ textDecoration: 'none' }}>
                            <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}>
                                Create account!
                            </Typography>
                        </Link>
                    </Box>
                </MuiCard>
            </Zoom>
        </form>
    );
}

export default LoginPage;
