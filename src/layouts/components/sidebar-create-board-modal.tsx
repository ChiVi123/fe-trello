import AbcIcon from '@mui/icons-material/Abc';
import CancelIcon from '@mui/icons-material/Cancel';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import FieldErrorAlert from '~components/field-error-alert';
import { FIELD_REQUIRED_MESSAGE } from '~utils/validators';

enum BOARD_TYPES {
    PUBLIC = 'public',
    PRIVATE = 'private',
}

interface IForm {
    title: string;
    description: string;
    type: BOARD_TYPES;
}

const SidebarItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: '12px 16px',
    borderRadius: '8px',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300],
    },
    '&.active': {
        color: theme.palette.mode === 'dark' ? '#90caf9' : '#0c66e4',
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#e9f2ff',
    },
}));

function SidebarCreateBoardModal() {
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IForm>();
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => {
        setIsOpen(false);
        reset();
    };

    const submitCreateNewBoard: SubmitHandler<IForm> = (data) => {
        const { title, description, type } = data;
        console.log('🚀 ~ submitCreateNewBoard ~ title:', title);
        console.log('🚀 ~ submitCreateNewBoard ~ description:', description);
        console.log('🚀 ~ submitCreateNewBoard ~ type:', type);
    };

    return (
        <>
            <SidebarItem onClick={handleOpenModal}>
                <LibraryAddIcon fontSize='small' />
                Create a new board
            </SidebarItem>

            <Modal
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
                open={isOpen}
                // onClose={handleCloseModal} // close modal by ESC or click out side of modal
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: 600,
                        padding: '20px 30px',
                        border: 'none',
                        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : 'white'),
                        borderRadius: '8px',
                        outline: 0,
                        boxShadow: 24,
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            cursor: 'pointer',
                        }}
                    >
                        <CancelIcon
                            color='error'
                            sx={{ '&:hover': { color: 'error.light' } }}
                            onClick={handleCloseModal}
                        />
                    </Box>

                    <Box id='modal-modal-title' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LibraryAddIcon />
                        <Typography variant='h6' component='h2'>
                            Create a new board
                        </Typography>
                    </Box>

                    <Box id='modal-modal-description' sx={{ my: 2 }}>
                        <form onSubmit={handleSubmit(submitCreateNewBoard)}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box>
                                    <TextField
                                        fullWidth
                                        label='Title'
                                        type='text'
                                        variant='outlined'
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position='start'>
                                                        <AbcIcon fontSize='small' />
                                                    </InputAdornment>
                                                ),
                                            },
                                        }}
                                        {...register('title', {
                                            required: FIELD_REQUIRED_MESSAGE,
                                            minLength: { value: 3, message: 'Min Length is 3 characters' },
                                            maxLength: { value: 50, message: 'Max Length is 50 characters' },
                                        })}
                                        error={!!errors['title']}
                                    />
                                    <FieldErrorAlert errors={errors} fieldName='title' />
                                </Box>

                                <Box>
                                    <TextField
                                        fullWidth
                                        label='Description'
                                        type='text'
                                        variant='outlined'
                                        multiline
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position='start'>
                                                        <DescriptionOutlinedIcon fontSize='small' />
                                                    </InputAdornment>
                                                ),
                                            },
                                        }}
                                        {...register('description', {
                                            required: FIELD_REQUIRED_MESSAGE,
                                            minLength: { value: 3, message: 'Min Length is 3 characters' },
                                            maxLength: { value: 255, message: 'Max Length is 255 characters' },
                                        })}
                                        error={!!errors['description']}
                                    />
                                    <FieldErrorAlert errors={errors} fieldName='description' />
                                </Box>

                                <Controller
                                    name='type'
                                    control={control}
                                    defaultValue={BOARD_TYPES.PUBLIC}
                                    render={({ field }) => (
                                        <RadioGroup
                                            {...field}
                                            row
                                            value={field.value}
                                            onChange={(_event, value) => field.onChange(value)}
                                        >
                                            <FormControlLabel
                                                label='Public'
                                                labelPlacement='start'
                                                value={BOARD_TYPES.PUBLIC}
                                                control={<Radio size='small' />}
                                            />
                                            <FormControlLabel
                                                label='Private'
                                                labelPlacement='start'
                                                value={BOARD_TYPES.PRIVATE}
                                                control={<Radio size='small' />}
                                            />
                                        </RadioGroup>
                                    )}
                                />

                                <Box sx={{ alignSelf: 'flex-end' }}>
                                    <Button
                                        type='submit'
                                        variant='contained'
                                        color='primary'
                                        className='interceptor-loading'
                                    >
                                        Create
                                    </Button>
                                </Box>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

export default SidebarCreateBoardModal;
