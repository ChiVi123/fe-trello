import AddCardIcon from '@mui/icons-material/AddCard';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Cloud from '@mui/icons-material/Cloud';
import CommentIcon from '@mui/icons-material/Comment';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import GroupIcon from '@mui/icons-material/Group';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { MouseEventHandler, useState } from 'react';

const COLUMN_HEADER_HEIGHT = '50px';
const COLUMN_FOOTER_HEIGHT = '56px';

function DashboardPage() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick: MouseEventHandler<HTMLElement> = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
            {/* Column 1 */}
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
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: COLUMN_HEADER_HEIGHT,
                        p: 2,
                    }}
                >
                    <Typography variant='h6' fontWeight='bold' sx={{ fontSize: '1rem', cursor: 'pointer' }}>
                        Column title
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

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        maxHeight: ({ trello, spacing }) => `calc(
                            ${trello.boardContentHeight} -
                            ${spacing(5)} -
                            ${COLUMN_HEADER_HEIGHT} -
                            ${COLUMN_FOOTER_HEIGHT}
                        )`,
                        px: '5px',
                        mx: '5px',
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da' },
                        '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#bfc2cf' },
                    }}
                >
                    <Card sx={{ boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)', overflow: 'unset' }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image='https://www.si.com/.image/t_share/MTY4MDMwNTA0NDMwODcxOTM2/juventus-v-manchester-united-uefa-champions-league-group-h-5bf7490b6b6cd20cff000001jpg.jpg'
                            title='green iguana'
                        />
                        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                            <Typography>C. Ronaldo reach 1000 goals</Typography>
                        </CardContent>
                        <CardActions sx={{ p: '0 4px 8px 4px' }}>
                            <Button size='small' startIcon={<GroupIcon />}>
                                20
                            </Button>
                            <Button size='small' startIcon={<CommentIcon />}>
                                13
                            </Button>
                            <Button size='small' startIcon={<AttachmentIcon />}>
                                6
                            </Button>
                        </CardActions>
                    </Card>

                    {Array.from({ length: 6 }, (_, i) => i + 1).map((item) => (
                        <Card key={item} sx={{ boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)', overflow: 'unset' }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>C. Ronaldo reach 1000 goals [{item}]</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: COLUMN_FOOTER_HEIGHT,
                        p: 2,
                    }}
                >
                    <Button startIcon={<AddCardIcon />}>Add new card</Button>

                    <Tooltip title='Drag to move'>
                        <DragHandleIcon sx={{ cursor: 'pointer' }} />
                    </Tooltip>
                </Box>
            </Box>

            {/* Column 2 */}
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
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: COLUMN_HEADER_HEIGHT,
                        p: 2,
                    }}
                >
                    <Typography variant='h6' fontWeight='bold' sx={{ fontSize: '1rem', cursor: 'pointer' }}>
                        Column title
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

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        maxHeight: ({ trello, spacing }) => `calc(
                            ${trello.boardContentHeight} -
                            ${spacing(5)} -
                            ${COLUMN_HEADER_HEIGHT} -
                            ${COLUMN_FOOTER_HEIGHT}
                        )`,
                        px: '5px',
                        mx: '5px',
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da' },
                        '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#bfc2cf' },
                    }}
                >
                    <Card sx={{ boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)', overflow: 'unset' }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image='https://www.si.com/.image/t_share/MTY4MDMwNTA0NDMwODcxOTM2/juventus-v-manchester-united-uefa-champions-league-group-h-5bf7490b6b6cd20cff000001jpg.jpg'
                            title='green iguana'
                        />
                        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                            <Typography>C. Ronaldo reach 1000 goals</Typography>
                        </CardContent>
                        <CardActions sx={{ p: '0 4px 8px 4px' }}>
                            <Button size='small' startIcon={<GroupIcon />}>
                                20
                            </Button>
                            <Button size='small' startIcon={<CommentIcon />}>
                                13
                            </Button>
                            <Button size='small' startIcon={<AttachmentIcon />}>
                                6
                            </Button>
                        </CardActions>
                    </Card>

                    <Card sx={{ boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)', overflow: 'unset' }}>
                        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                            <Typography>C. Ronaldo reach 1000 goals</Typography>
                        </CardContent>
                    </Card>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: COLUMN_FOOTER_HEIGHT,
                        p: 2,
                    }}
                >
                    <Button startIcon={<AddCardIcon />}>Add new card</Button>

                    <Tooltip title='Drag to move'>
                        <DragHandleIcon sx={{ cursor: 'pointer' }} />
                    </Tooltip>
                </Box>
            </Box>
        </Box>
    );
}

export default DashboardPage;
