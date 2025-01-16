import { ConfirmOptions } from 'material-ui-confirm';

export const confirmOptions: ConfirmOptions = {
    allowClose: false,
    dialogProps: { maxWidth: 'xs' },
    confirmationButtonProps: { color: 'error', variant: 'contained' },
    buttonOrder: ['confirm', 'cancel'],
};
