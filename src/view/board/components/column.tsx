import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import AddCardIcon from '@mui/icons-material/AddCard';
import CloseIcon from '@mui/icons-material/Close';
import Cloud from '@mui/icons-material/Cloud';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import clonedDeep from 'lodash/cloneDeep';
import { useConfirm } from 'material-ui-confirm';
import { CSSProperties, MouseEventHandler, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ToggleFocusInput from '~components/toggle-focus-input';
import { useAppDispatch } from '~core/store';
import { selectCurrentBoard, updateCurrentBoard } from '~modules/board/slice';
import { createCardAPI } from '~modules/card/repository';
import { IColumnEntity } from '~modules/column/entity';
import { deleteColumnAPI, updateColumnDetailAPI } from '~modules/column/repository';
import ListCards from './list-cards';

interface IProps {
    data: IColumnEntity;
}

function Column({ data }: IProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: data._id,
        data: { ...data },
    });

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openNewCardForm, setOpenNewCardForm] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const confirmDeleteColumn = useConfirm();

    const board = useSelector(selectCurrentBoard);
    const dispatch = useAppDispatch();

    const open = Boolean(anchorEl);
    const dndKitColumnStyles: CSSProperties = {
        height: '100%',
        // https://github.com/clauderic/dnd-kit/issues/117
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.8 : undefined,
        transition,
    };

    const toggleNewCardForm = () => setOpenNewCardForm(!openNewCardForm);

    const handleClick: MouseEventHandler<HTMLElement> = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleAddCard = async () => {
        if (!inputRef.current!.value) {
            toast.error('Please enter card title!!!');
            return;
        }

        const title = inputRef.current!.value;
        const columnId = data._id;

        if (!board) return;

        const createdCard = await createCardAPI({ title, columnId, boardId: board?._id });
        const clonedBoard = clonedDeep(board);

        const columnTarget = clonedBoard.columns.find((item) => item._id === columnId);
        if (!columnTarget) return;

        if (columnTarget.cards.some((item) => item.FE_PlaceholderCard)) {
            columnTarget.cardOrderIds = [createdCard._id];
            columnTarget.cards = [createdCard];
        } else {
            columnTarget.cardOrderIds.push(createdCard._id);
            columnTarget.cards.push(createdCard);
        }

        dispatch(updateCurrentBoard(clonedBoard));
        toggleNewCardForm();
    };
    const handleDeleteColumn = () => {
        confirmDeleteColumn({
            title: 'Delete Column?',
            description: 'This action will permanently delete your Column and its Cards! Are you sure?',
            confirmationText: 'Confirm',
        })
            .then(() => {
                if (!board) return;
                const clonedBoard = clonedDeep(board);
                clonedBoard.columns = clonedBoard.columns.filter((item) => item._id !== data._id);
                clonedBoard.columnOrderIds = clonedBoard.columnOrderIds.filter((_id) => _id !== data._id);
                dispatch(updateCurrentBoard(clonedBoard));

                deleteColumnAPI(data._id).then((res) => {
                    toast.success(res?.deleteResult, { position: 'bottom-left' });
                });
            })
            .catch(() => {});
    };
    const handleUpdateColumnTitle = (newTitle: string) => {
        updateColumnDetailAPI(data._id, { title: newTitle }).then(() => {
            if (!board) return;

            const clonedBoard = clonedDeep(board);
            const columnTarget = clonedBoard.columns.find((item) => item._id === data._id);
            if (!columnTarget) return;

            columnTarget.title = newTitle;

            dispatch(updateCurrentBoard(clonedBoard));
        });
    };

    return (
        <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
            <Box
                sx={{
                    minWidth: '300px',
                    maxWidth: '300px',
                    height: 'fit-content',
                    maxHeight: ({ trello, spacing }) => `calc(${trello.boardContentHeight} - ${spacing(5)})`,
                    ml: 2,
                    bgcolor: ({ palette }) => (palette.mode === 'dark' ? '#333643' : '#ebecf0'),
                    borderRadius: '6px',
                }}
                // only listeners is spread in Box component, just active event when interact Box
                {...listeners}
            >
                {/* Header */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: ({ trello }) => trello.columnHeaderHeight,
                        p: 2,
                    }}
                >
                    <ToggleFocusInput data-no-dnd='true' value={data.title} onChangedValue={handleUpdateColumnTitle} />

                    <Box>
                        <Tooltip title='More options'>
                            <IconButton
                                id='column-dropdown-top-bar'
                                aria-controls={open ? 'menu-column-dropdown' : undefined}
                                aria-haspopup='true'
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <MoreVertIcon />
                            </IconButton>
                        </Tooltip>

                        <Menu
                            id='menu-column-dropdown'
                            anchorEl={anchorEl}
                            open={open}
                            onClick={handleClose}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'column-dropdown-top-bar',
                            }}
                        >
                            <MenuItem
                                sx={{
                                    '&:hover': {
                                        color: 'success.light',
                                        '& .MuiListItemIcon-root': { color: 'success.light' },
                                    },
                                }}
                                onClick={toggleNewCardForm}
                            >
                                <ListItemIcon>
                                    <AddCardIcon fontSize='small' />
                                </ListItemIcon>
                                <ListItemText>Add new card</ListItemText>
                            </MenuItem>

                            <MenuItem>
                                <ListItemIcon>
                                    <ContentCopyIcon fontSize='small' />
                                </ListItemIcon>
                                <ListItemText>Copy</ListItemText>
                            </MenuItem>

                            <MenuItem>
                                <ListItemIcon>
                                    <ContentPasteIcon fontSize='small' />
                                </ListItemIcon>
                                <ListItemText>Paste</ListItemText>
                            </MenuItem>

                            <Divider />

                            <MenuItem
                                sx={{
                                    '&:hover': {
                                        color: 'warning.dark',
                                        '& .MuiListItemIcon-root': { color: 'warning.dark' },
                                    },
                                }}
                                onClick={handleDeleteColumn}
                            >
                                <ListItemIcon>
                                    <DeleteForeverIcon fontSize='small' />
                                </ListItemIcon>
                                <ListItemText>Delete this column</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <Cloud fontSize='small' />
                                </ListItemIcon>
                                <ListItemText>Archive this column</ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>

                {/* List cards */}
                <ListCards data={data.cards} />

                {/* Footer */}
                <Box
                    sx={{
                        height: ({ trello }) => trello.columnFooterHeight,
                        p: 2,
                    }}
                >
                    {openNewCardForm ? (
                        <Box data-no-dnd='true' sx={{ display: 'flex', alignItems: 'center', gap: 1, height: '100%' }}>
                            <TextField
                                inputRef={inputRef}
                                id='card-title'
                                label='Enter card title'
                                type='text'
                                size='small'
                                variant='outlined'
                                autoFocus
                                sx={{
                                    '& label': { color: 'text.primary' },
                                    '& input': {
                                        color: 'primary.main',
                                        bgcolor: ({ palette }) => (palette.mode === 'dark' ? '#333643' : 'white'),
                                    },
                                    '& label.Mui-focused': { color: 'primary.main' },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: 'primary.main' },
                                        '&:hover fieldset': { borderColor: 'primary.main' },
                                        '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                                    },
                                    '& .MuiOutlinedInput-input': { orderRadius: 1 },
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
                                    onClick={handleAddCard}
                                >
                                    Add
                                </Button>
                                <CloseIcon
                                    titleAccess='close card form'
                                    fontSize='small'
                                    sx={{ color: 'warning.light', cursor: 'pointer' }}
                                    onClick={toggleNewCardForm}
                                />
                            </Box>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                height: '100%',
                            }}
                        >
                            <Button data-no-dnd='true' startIcon={<AddCardIcon />} onClick={toggleNewCardForm}>
                                Add new card
                            </Button>

                            <Tooltip title='Drag to move'>
                                <DragHandleIcon sx={{ cursor: 'pointer' }} />
                            </Tooltip>
                        </Box>
                    )}
                </Box>
            </Box>
        </div>
    );
}

export default Column;
