import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useColorScheme } from '@mui/material/styles';

export default function SelectThemeMode() {
    const { mode, setMode } = useColorScheme();

    if (!mode) {
        return null;
    }

    const handleChange = (event: SelectChangeEvent) => {
        const selectedMode = event.target.value as 'light' | 'dark' | 'system';
        setMode(selectedMode);
    };

    return (
        <FormControl size='small' sx={{ minWidth: 120 }}>
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
