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
import Typography from '@mui/material/Typography';
import { useConfirm } from 'material-ui-confirm';
import { CSSProperties, MouseEventHandler, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { IColumnEntity } from '~modules/column/entity';
import ListCards from './list-cards';

interface IProps {
    data: IColumnEntity;
    onAddCard?(value: { title: string; columnId: string }): void;
    onDeleteColumn?(columnId: string): void;
}

function Column({ data, onAddCard, onDeleteColumn }: IProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: data._id,
        data: { ...data },
    });

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openNewCardForm, setOpenNewCardForm] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const confirmDeleteColumn = useConfirm();

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
    const handleAddCard = () => {
        if (!inputRef.current!.value) {
            toast.error('Please enter card title!!!');
            return;
        }

        onAddCard?.({ title: inputRef.current!.value, columnId: data._id });
        toggleNewCardForm();
    };
    const handleDeleteColumn = () => {
        confirmDeleteColumn({
            title: 'Delete Column?',
            description: 'This action will permanently delete your Column and its Cards! Are you sure?',
            confirmationText: 'Confirm',
        })
            .then(() => {
                onDeleteColumn?.(data._id);
            })
            .catch(() => {});
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
                    <Typography variant='h6' fontWeight='bold' sx={{ fontSize: '1rem', cursor: 'pointer' }}>
                        {data.title}
                    </Typography>

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
                            onClick={toggleNewCardForm}
                        >
                            <Button data-no-dnd='true' startIcon={<AddCardIcon />}>
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
