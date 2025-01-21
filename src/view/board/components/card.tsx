import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import AttachmentIcon from '@mui/icons-material/Attachment';
import CommentIcon from '@mui/icons-material/Comment';
import GroupIcon from '@mui/icons-material/Group';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CSSProperties } from 'react';
import { useAppDispatch } from '~core/store';
import { ICardEntity } from '~modules/card/entity';
import { updateCurrentCard } from '~modules/card/slice';

interface IProps {
    data: ICardEntity;
}

function Card({ data }: IProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: data._id,
        data: { ...data },
    });
    const dispatch = useAppDispatch();

    const dndKitCardStyles: CSSProperties = {
        border: isDragging ? '1px solid #2ecc71' : undefined,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : undefined,
        transition,
    };
    const shouldShowCardActions = !!data?.memberIds?.length || !!data?.comments?.length || !!data?.attachments?.length;

    const handleClickCard = () => void dispatch(updateCurrentCard(data));

    return (
        <MuiCard
            ref={setNodeRef}
            style={dndKitCardStyles}
            {...attributes}
            {...listeners}
            sx={{
                display: data?.FE_PlaceholderCard ? 'none' : 'block',
                // height: data?.FE_PlaceholderCard ? '0px': 'unset',
                border: '1px solid transparent',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset',
                // overflow: data?.FE_PlaceholderCard ? 'hidden': 'unset',
                '&:hover': { borderColor: 'primary.main' },
            }}
            onClick={handleClickCard}
        >
            {data.cover && <CardMedia sx={{ height: 140 }} image={data.cover} title={data.title} />}

            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>{data.title}</Typography>
            </CardContent>
            {shouldShowCardActions && (
                <CardActions sx={{ p: '0 4px 8px 4px' }}>
                    {Boolean(data?.memberIds?.length) && (
                        <Button size='small' startIcon={<GroupIcon />}>
                            {data?.memberIds?.length}
                        </Button>
                    )}
                    {Boolean(data?.comments?.length) && (
                        <Button size='small' startIcon={<CommentIcon />}>
                            {data?.comments?.length}
                        </Button>
                    )}
                    {Boolean(data?.attachments?.length) && (
                        <Button size='small' startIcon={<AttachmentIcon />}>
                            {data?.attachments?.length}
                        </Button>
                    )}
                </CardActions>
            )}
        </MuiCard>
    );
}

export default Card;
