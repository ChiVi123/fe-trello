import AttachmentIcon from '@mui/icons-material/Attachment';
import CommentIcon from '@mui/icons-material/Comment';
import GroupIcon from '@mui/icons-material/Group';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ICardEntity } from '~modules/card/entity';

interface IProps {
    data: ICardEntity;
}

function Card({ data }: IProps) {
    const shouldShowCardActions = !!data.memberIds.length || !!data.comments.length || !!data.attachments.length;

    return (
        <MuiCard sx={{ boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)', overflow: 'unset' }}>
            {data.cover && <CardMedia sx={{ height: 140 }} image={data.cover} title={data.title} />}

            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>{data.title}</Typography>
            </CardContent>
            {shouldShowCardActions && (
                <CardActions sx={{ p: '0 4px 8px 4px' }}>
                    {Boolean(data.memberIds.length) && (
                        <Button size='small' startIcon={<GroupIcon />}>
                            {data.memberIds.length}
                        </Button>
                    )}
                    {Boolean(data.comments.length) && (
                        <Button size='small' startIcon={<CommentIcon />}>
                            {data.comments.length}
                        </Button>
                    )}
                    {Boolean(data.attachments.length) && (
                        <Button size='small' startIcon={<AttachmentIcon />}>
                            {data.attachments.length}
                        </Button>
                    )}
                </CardActions>
            )}
        </MuiCard>
    );
}

export default Card;
