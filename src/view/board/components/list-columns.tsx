import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import CloseIcon from '@mui/icons-material/Close';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import clonedDeep from 'lodash/cloneDeep';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useAppDispatch } from '~core/store';
import { selectCurrentBoard, updateCurrentBoard } from '~modules/board/slice';
import { IColumnEntity } from '~modules/column/entity';
import { createColumnAPI } from '~modules/column/repository';
import { generatePlaceholderCard } from '~utils/formatters';
import Column from './column';

interface IProps {
    columns: IColumnEntity[];
}

function ListColumns({ columns }: IProps) {
    const [openNewColumnForm, setOpenNewColumnForm] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useAppDispatch();
    const board = useSelector(selectCurrentBoard);

    const toggleNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm);

    const handleAddColumn = async () => {
        if (!inputRef.current!.value) {
            toast.error('Please enter column title!!!', { position: 'bottom-left' });
            return;
        }

        if (!board) return;

        const title = inputRef.current!.value;
        const createdColumn = await createColumnAPI({ title, boardId: board?._id });
        const clonedBoard = clonedDeep(board);
        const placeholder = generatePlaceholderCard(createdColumn);

        createdColumn.cards = [placeholder];
        createdColumn.cardOrderIds = [placeholder._id];
        clonedBoard.columnOrderIds.push(createdColumn._id);
        clonedBoard.columns.push(createdColumn);

        dispatch(updateCurrentBoard(clonedBoard));
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
                    <Column key={item._id} data={item} />
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
                            className='interceptor-loading'
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
