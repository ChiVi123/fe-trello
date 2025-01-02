import AttachmentIcon from '@mui/icons-material/Attachment';
import CommentIcon from '@mui/icons-material/Comment';
import GroupIcon from '@mui/icons-material/Group';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface IProps {
    temporaryHiddenMedia?: boolean;
}

function Card({ temporaryHiddenMedia }: IProps) {
    if (temporaryHiddenMedia) {
        return (
            <MuiCard sx={{ boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)', overflow: 'unset' }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                    <Typography>C. Ronaldo reach 1000 goals</Typography>
                </CardContent>
            </MuiCard>
        );
    }

    return (
        <MuiCard sx={{ boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)', overflow: 'unset' }}>
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
        </MuiCard>
    );
}

export default Card;
