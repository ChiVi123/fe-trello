import Alert from '@mui/material/Alert';
import { FieldErrors, FieldPath, FieldValues, get, useFormContext } from 'react-hook-form';

interface IProps<T extends FieldValues> {
    fieldName: FieldPath<T>;
    errors: FieldErrors<T>;
}

function FieldErrorAlert<T extends FieldValues>({ errors, fieldName }: IProps<T>) {
    const methods = useFormContext();
    const error = get(errors || methods.formState.errors, fieldName);

    if (!error) return null;

    return (
        <Alert severity='error' sx={{ mt: '0.7em', '.MuiAlert-message': { overflow: 'hidden' } }}>
            {error?.message}
        </Alert>
    );
}

export default FieldErrorAlert;
