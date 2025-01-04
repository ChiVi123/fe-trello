import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import AddCardIcon from '@mui/icons-material/AddCard';
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
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { CSSProperties, MouseEventHandler, useState } from 'react';
import { IColumnEntity } from '~modules/column/entity';
import { mapOrder } from '~utils/sorts';
import ListCards from './list-cards';

interface IProps {
    data: IColumnEntity;
}

function Column({ data }: IProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: data._id,
        data: { ...data },
    });
    const dndKitColumnStyles: CSSProperties = {
        height: '100%',
        // https://github.com/clauderic/dnd-kit/issues/117
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.8 : undefined,
        transition,
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick: MouseEventHandler<HTMLElement> = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const orderedCards = mapOrder(data.cards, data.cardOrderIds, '_id');

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
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'column-dropdown-top-bar',
                            }}
                        >
                            <MenuItem>
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

                            <MenuItem>
                                <ListItemIcon>
                                    <DeleteForeverIcon fontSize='small' />
                                </ListItemIcon>
                                <ListItemText>Remove this column</ListItemText>
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
                <ListCards data={orderedCards} />

                {/* Footer */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: ({ trello }) => trello.columnFooterHeight,
                        p: 2,
                    }}
                >
                    <Button startIcon={<AddCardIcon />}>Add new card</Button>

                    <Tooltip title='Drag to move'>
                        <DragHandleIcon sx={{ cursor: 'pointer' }} />
                    </Tooltip>
                </Box>
            </Box>
        </div>
    );
}

export default Column;
