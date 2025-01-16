import HomeIcon from '@mui/icons-material/Home';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import particlesPath from '~image/particles.png';
import { ReactComponent as AstronautSvg } from '~svg/astronaut.svg';
import { ReactComponent as PlanetSvg } from '~svg/planet.svg';

function NotFoundPage() {
    return (
        <Box sx={{ width: '100vw', height: '100vh', bgcolor: '#25344C', color: 'white' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url("${particlesPath}")`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'repeat',
                    backgroundPosition: 'center',
                    // boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.2)',
                    animation: 'stars 12s linear infinite alternate',
                    '@keyframes stars': {
                        '0%': { backgroundPosition: '-100% 100%' },
                        '100%': { backgroundPosition: '0 0 ' },
                    },
                }}
            >
                <Typography variant='h1' sx={{ fontSize: '100px', fontWeight: 800 }}>
                    404
                </Typography>

                <Typography
                    sx={{
                        maxWidth: '350px',
                        fontSize: '18px !important',
                        lineHeight: '25px',
                        fontWeight: 400,
                        textAlign: 'center',
                    }}
                >
                    LOST IN&nbsp;
                    <Typography
                        component='span'
                        sx={{
                            position: 'relative',
                            '&:after': {
                                content: '""',
                                position: 'absolute',
                                top: '43%',
                                left: 0,
                                width: '100%',
                                borderBottom: '3px solid #fdba26',
                            },
                        }}
                    >
                        &nbsp;SPACE&nbsp;
                    </Typography>
                    &nbsp;
                    <Typography component='span' sx={{ fontWeight: 500, color: '#fdba26' }}>
                        ChiViDev
                    </Typography>
                    ?<br />
                    Hmm, looks like that page doesn&apos;t exist.
                </Typography>

                <Box sx={{ position: 'relative', width: '320px', height: '320px' }}>
                    <SvgIcon
                        component={AstronautSvg}
                        inheritViewBox
                        sx={{
                            position: 'absolute',
                            top: '20px',
                            right: '25px',
                            width: '50px',
                            height: '50px',
                            animation: 'spinAround 5s linear 0s infinite',
                            '@keyframes spinAround': {
                                from: { transform: 'rotate(0deg)' },
                                to: { transform: 'rotate(360deg)' },
                            },
                        }}
                    />
                    <PlanetSvg />
                </Box>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <Button
                        variant='outlined'
                        startIcon={<HomeIcon />}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: 'white',
                            borderColor: 'white',
                            '&:hover': { color: '#fdba26', borderColor: '#fdba26' },
                        }}
                    >
                        Go Home
                    </Button>
                </Link>
            </Box>
        </Box>
    );
}

export default NotFoundPage;
