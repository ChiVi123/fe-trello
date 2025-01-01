import DarkModeIcon from '@mui/icons-material/DarkMode';
import HomeIcon from '@mui/icons-material/Home';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { pink } from '@mui/material/colors';
import { useColorScheme } from '@mui/material/styles';

function SelectThemeMode() {
    const { mode, setMode } = useColorScheme();

    if (!mode) {
        return null;
    }

    const handleChange = (event: SelectChangeEvent) => {
        const selectedMode = event.target.value as 'light' | 'dark' | 'system';
        setMode(selectedMode);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
            <InputLabel id='label-select-theme-mode'>Mode</InputLabel>
            <Select
                labelId='label-select-theme-mode'
                id='select-theme-mode'
                value={mode}
                label='Mode'
                onChange={handleChange}
            >
                <MenuItem value='light'>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LightModeIcon fontSize='small' />
                        Light
                    </Box>
                </MenuItem>
                <MenuItem value='dark'>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DarkModeIcon fontSize='small' />
                        Dark
                    </Box>
                </MenuItem>
                <MenuItem value='system'>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SettingsBrightnessIcon fontSize='small' />
                        System
                    </Box>
                </MenuItem>
            </Select>
        </FormControl>
    );
}

function ModeSwitcher() {
    const { mode, setMode } = useColorScheme();

    if (!mode) {
        return null;
    }

    return (
        <select
            value={mode}
            onChange={(event) => {
                setMode(event.target.value as 'light' | 'dark' | 'system');
            }}
        >
            <option value='system'>System</option>
            <option value='light'>Light</option>
            <option value='dark'>Dark</option>
        </select>
    );
}

function App() {
    return (
        <>
            <SelectThemeMode />
            <hr />
            <ModeSwitcher />
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
