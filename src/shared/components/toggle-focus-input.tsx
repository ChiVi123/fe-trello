import TextField from '@mui/material/TextField';
import { ComponentProps, useState } from 'react';

interface IAdditionProps {
    inputFontSize?: string;
    value?: string;
    onChangedValue?: (value: string) => void;
}

type ToggleFocusInputProps = ComponentProps<typeof TextField> & IAdditionProps;

// Controlled Input trong MUI: https://mui.com/material-ui/react-text-field/#uncontrolled-vs-controlled
function ToggleFocusInput({ value = '', inputFontSize = '16px', onChangedValue, ...props }: ToggleFocusInputProps) {
    const [inputValue, setInputValue] = useState(value);

    const handleBlur = () => {
        setInputValue(inputValue.trim());

        // value is empty or no change, no need update state
        if (!inputValue || inputValue.trim() === value) {
            setInputValue(value);
            return;
        }

        onChangedValue?.(inputValue);
    };

    return (
        <TextField
            id='toggle-focus-input-controlled'
            type='text'
            variant='outlined'
            size='small'
            value={inputValue}
            fullWidth
            onChange={(event) => {
                setInputValue(event.target.value);
            }}
            onBlur={handleBlur}
            {...props}
            sx={{
                '& label': {},
                '& input': { fontSize: inputFontSize, fontWeight: 'bold' },
                '& .MuiOutlinedInput-root': {
                    backgroundColor: 'transparent',
                    '& fieldset': { borderColor: 'transparent' },
                },
                '& .MuiOutlinedInput-root:hover': {
                    borderColor: 'transparent',
                    '& fieldset': { borderColor: 'transparent' },
                },
                '& .MuiOutlinedInput-root.Mui-focused': {
                    backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#33485D' : 'white'),
                    '& fieldset': { borderColor: 'primary.main' },
                },
                '& .MuiOutlinedInput-input': {
                    px: '6px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                },
            }}
        />
    );
}

export default ToggleFocusInput;
