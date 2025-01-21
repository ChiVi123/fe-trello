import { styled } from '@mui/material/styles';
import { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

/**
 * https://mui.com/material-ui/react-button/#file-upload
 * ...
 * https://github.com/viclafouch/mui-file-input
 */
const HiddenInputStyles = styled('input')({ display: 'none' });

function VisuallyHiddenInput(props: Props) {
    return <HiddenInputStyles {...props} />;
}

export default VisuallyHiddenInput;
