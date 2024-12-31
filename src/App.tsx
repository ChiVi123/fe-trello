import HomeIcon from '@mui/icons-material/Home';
import { Button } from '@mui/material';
import { pink } from '@mui/material/colors';

function App() {
    return (
        <>
            <div>hello</div>
            <Button variant='text'>Text</Button>
            <Button variant='contained'>Contained</Button>
            <Button variant='outlined'>Outlined</Button>
            <HomeIcon />
            <HomeIcon color='primary' />
            <HomeIcon color='secondary' />
            <HomeIcon color='success' />
            <HomeIcon color='action' />
            <HomeIcon color='disabled' />
            <HomeIcon sx={{ color: pink[500] }} />
        </>
    );
}

export default App;
