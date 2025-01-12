import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import CloseIcon from '@mui/icons-material/Close';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { IColumnEntity } from '~modules/column/entity';
import Column from './column';

interface IProps {
    columns: IColumnEntity[];
    onAddColumn?(value: string): Promise<void>;
    onAddCard?(value: { title: string; columnId: string }): Promise<void>;
}

function ListColumns({ columns, onAddColumn, onAddCard }: IProps) {
    const [openNewColumnForm, setOpenNewColumnForm] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const toggleNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm);

    const handleAddColumn = async () => {
        if (!inputRef.current!.value) {
            toast.error('Please enter column title!!!', { position: 'bottom-left' });
            return;
        }

        if (onAddColumn) {
            await onAddColumn(inputRef.current!.value);
        }

        toggleNewColumnForm();
    };

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                bgcolor: 'inherit',
                overflowX: 'auto',
                overflowY: 'hidden',
                '&::-webkit-scrollbar-track': { m: 2 },
            }}
        >
            <SortableContext items={columns.map((item) => item._id)} strategy={horizontalListSortingStrategy}>
                {columns.map((item) => (
                    <Column key={item._id} data={item} onAddCard={onAddCard} />
                ))}
            </SortableContext>

            {openNewColumnForm ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        minWidth: '250px',
                        maxWidth: '250px',
                        height: 'fit-content',
                        mx: 2,
                        p: 1,
                        pt: 1.5,
                        borderRadius: '6px',
                        bgcolor: '#ffffff3d',
                    }}
                >
                    <TextField
                        inputRef={inputRef}
                        id='column-title'
                        label='Enter column title'
                        type='text'
                        size='small'
                        variant='outlined'
                        autoFocus
                        sx={{
                            '& label': { color: 'white' },
                            '& input': { color: 'white' },
                            '& label.Mui-focused': { color: 'white' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'white' },
                                '&:hover fieldset': { borderColor: 'white' },
                                '&.Mui-focused fieldset': { borderColor: 'white' },
                            },
                        }}
                    />

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Button
                            size='small'
                            color='success'
                            variant='contained'
                            sx={{
                                border: '1px solid',
                                borderColor: 'success.main',
                                boxShadow: 'none',
                                '&:hover': { bgcolor: 'success.main' },
                            }}
                            onClick={handleAddColumn}
                        >
                            Add Column
                        </Button>
                        <CloseIcon
                            titleAccess='close column form'
                            fontSize='small'
                            sx={{ color: 'white', cursor: 'pointer', '&:hover': { color: 'warning.light' } }}
                            onClick={toggleNewColumnForm}
                        />
                    </Box>
                </Box>
            ) : (
                <Box
                    sx={{
                        minWidth: '200px',
                        maxWidth: '200px',
                        height: 'fit-content',
                        mx: 2,
                        borderRadius: '6px',
                        bgcolor: '#ffffff3d',
                    }}
                    onClick={toggleNewColumnForm}
                >
                    <Button
                        fullWidth
                        startIcon={<NoteAddIcon />}
                        sx={{ justifyContent: 'flex-start', pl: 2.5, py: 1, color: 'white' }}
                    >
                        Add new column
                    </Button>
                </Box>
            )}
        </Box>
    );
}

export default ListColumns;
