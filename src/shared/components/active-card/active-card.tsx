import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ChangeEventHandler } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ToggleFocusInput from '~components/toggle-focus-input';
import VisuallyHiddenInput from '~components/visually-hidden-input';
import { CARD_MEMBERS_ACTIONS } from '~core/constants';
import { useAppDispatch } from '~core/store';
import { updateCardInBoard } from '~modules/board/slice';
import { updateCardAPI } from '~modules/card/repository';
import {
    clearAllStateCard,
    selectCurrentCard,
    selectIsShowModalActiveCard,
    updateCurrentCard,
} from '~modules/card/slice';
import { selectCurrentUser } from '~modules/user/slice';
import { singleFileValidator } from '~utils/validators';
import ActiveCardSection from './active-card-section';
import CardDescriptionMdEditor from './card-description-md-editor';
import CardUserGroup from './card-user-group';

const SidebarItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px',
    backgroundColor: theme.palette.mode === 'dark' ? '#2f3542' : '#091e420f',
    borderRadius: '4px',

    fontSize: '14px',
    fontWeight: '600',
    color: theme.palette.mode === 'dark' ? '#90caf9' : '#172b4d',

    cursor: 'pointer',

    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300],
        '&.active': {
            backgroundColor: theme.palette.mode === 'dark' ? '#90caf9' : '#e9f2ff',
            color: theme.palette.mode === 'dark' ? '#000000de' : '#0c66e4',
        },
    },
}));

function ActiveCard() {
    const dispatch = useAppDispatch();
    const activeCard = useSelector(selectCurrentCard);
    const isShowModalActiveCard = useSelector(selectIsShowModalActiveCard);
    const currentUser = useSelector(selectCurrentUser)!;

    const updateCardDetail = async (updateData: Record<string, unknown> | FormData) => {
        if (!activeCard) return;

        const updatedCard = await updateCardAPI(activeCard._id, updateData);

        dispatch(updateCurrentCard(updatedCard));
        dispatch(updateCardInBoard(updatedCard));
        return updatedCard;
    };

    const handleCloseModal = () => void dispatch(clearAllStateCard());
    const handleUpdateCardTitle = (newTitle: string) => void updateCardDetail({ title: newTitle.trim() });
    const handleUpdateCardDescription = (newDescription: string) => {
        updateCardDetail({ description: newDescription });
    };
    const handleUploadCardCover: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (!event.target.files) return;

        const error = singleFileValidator(event.target?.files[0]);
        if (error) {
            toast.error(error);
            return;
        }
        const reqData = new FormData();
        reqData.append('cardCover', event.target?.files[0]);

        toast.promise(
            updateCardDetail(reqData).finally(() => (event.target.value = '')),
            { pending: 'Updating...' }
        );
    };
    const handleAddCardComment = async (commentToAdd: Record<string, unknown>) => {
        await updateCardDetail({ commentToAdd });
    };
    const handleUpdateCardMembers = (incomingUserInfo: { userId: string; action: CARD_MEMBERS_ACTIONS }) => {
        updateCardDetail({ incomingUserInfo });
    };

    return (
        <Modal disableScrollLock open={isShowModalActiveCard} sx={{ overflowY: 'auto' }} onClose={handleCloseModal}>
            <Box
                sx={{
                    position: 'relative',
                    width: 680,
                    maxWidth: 680,

                    margin: '50px auto',
                    padding: '40px 20px 20px',
                    backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                    border: 'none',
                    borderRadius: '8px',
                    outline: 0,

                    boxShadow: 24,
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '12px',
                        right: '10px',
                        cursor: 'pointer',
                    }}
                >
                    <CancelIcon color='error' sx={{ '&:hover': { color: 'error.light' } }} onClick={handleCloseModal} />
                </Box>

                {activeCard?.cover && (
                    <Box sx={{ mb: 4 }}>
                        <img
                            src={activeCard.cover}
                            alt={activeCard.title}
                            style={{ width: '100%', height: '320px', borderRadius: '6px', objectFit: 'cover' }}
                        />
                    </Box>
                )}

                <Box sx={{ mb: 1, mt: -3, pr: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CreditCardIcon />

                    <ToggleFocusInput
                        inputFontSize='22px'
                        value={activeCard?.title}
                        onChangedValue={handleUpdateCardTitle}
                    />
                </Box>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                    {/* Left side */}
                    <Grid size={{ xs: 12, sm: 9 }}>
                        <Box sx={{ mb: 3 }}>
                            <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>Members</Typography>

                            <CardUserGroup
                                cardMemberIds={activeCard?.memberIds}
                                onUpdateCardMembers={handleUpdateCardMembers}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <SubjectRoundedIcon />
                                <Typography component='span' sx={{ fontWeight: '600', fontSize: '20px' }}>
                                    Description
                                </Typography>
                            </Box>

                            <CardDescriptionMdEditor
                                defaultValue={activeCard?.description ?? ''}
                                onChangeValue={handleUpdateCardDescription}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <DvrOutlinedIcon />
                                <Typography component='span' sx={{ fontWeight: '600', fontSize: '20px' }}>
                                    Activity
                                </Typography>
                            </Box>

                            <ActiveCardSection
                                cardComments={activeCard?.comments}
                                onAddCardComments={handleAddCardComment}
                            />
                        </Box>
                    </Grid>

                    {/* Right side */}
                    <Grid size={{ xs: 12, sm: 3 }}>
                        <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>Add To Card</Typography>
                        <Stack direction='column' spacing={1}>
                            {!activeCard?.memberIds?.includes(currentUser._id) && (
                                <SidebarItem
                                    className='active'
                                    onClick={() =>
                                        handleUpdateCardMembers({
                                            userId: currentUser._id,
                                            action: CARD_MEMBERS_ACTIONS.ADD,
                                        })
                                    }
                                >
                                    <PersonAddAlt1OutlinedIcon fontSize='small' />
                                    Join
                                </SidebarItem>
                            )}

                            {activeCard?.memberIds?.includes(currentUser._id) && (
                                <SidebarItem
                                    className='active'
                                    onClick={() =>
                                        handleUpdateCardMembers({
                                            userId: currentUser._id,
                                            action: CARD_MEMBERS_ACTIONS.REMOVE,
                                        })
                                    }
                                >
                                    <PersonRemoveAlt1OutlinedIcon fontSize='small' />
                                    Leave
                                </SidebarItem>
                            )}

                            <SidebarItem {...{ component: 'label' }} className='active'>
                                <ImageOutlinedIcon fontSize='small' />
                                Cover
                                <VisuallyHiddenInput type='file' onChange={handleUploadCardCover} />
                            </SidebarItem>

                            <Box component={'label'}></Box>

                            <SidebarItem>
                                <AttachFileOutlinedIcon fontSize='small' />
                                Attachment
                            </SidebarItem>
                            <SidebarItem>
                                <LocalOfferOutlinedIcon fontSize='small' />
                                Labels
                            </SidebarItem>
                            <SidebarItem>
                                <TaskAltOutlinedIcon fontSize='small' />
                                Checklist
                            </SidebarItem>
                            <SidebarItem>
                                <WatchLaterOutlinedIcon fontSize='small' />
                                Dates
                            </SidebarItem>
                            <SidebarItem>
                                <AutoFixHighOutlinedIcon fontSize='small' />
                                Custom Fields
                            </SidebarItem>
                        </Stack>

                        <Divider sx={{ my: 2 }} />

                        <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>Actions</Typography>
                        <Stack direction='column' spacing={1}>
                            <SidebarItem>
                                <ArrowForwardOutlinedIcon fontSize='small' />
                                Move
                            </SidebarItem>
                            <SidebarItem>
                                <ContentCopyOutlinedIcon fontSize='small' />
                                Copy
                            </SidebarItem>
                            <SidebarItem>
                                <AutoAwesomeOutlinedIcon fontSize='small' />
                                Make Template
                            </SidebarItem>
                            <SidebarItem>
                                <ArchiveOutlinedIcon fontSize='small' />
                                Archive
                            </SidebarItem>
                            <SidebarItem>
                                <ShareOutlinedIcon fontSize='small' />
                                Share
                            </SidebarItem>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}

export default ActiveCard;
