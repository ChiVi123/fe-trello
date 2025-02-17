import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
// import CardMedia from '@mui/material/CardMedia'
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import randomColor from 'randomcolor';
import { Link, useLocation } from 'react-router-dom';
import PageLoadingSpinner from '~components/page-loading-spinner';
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from '~core/constants';
import { IBoardEntity } from '~modules/board/entity';
import { getBoardsAPI } from '~modules/board/repository';
import SidebarCreateBoardModal from '~view/board/components/sidebar-create-board-modal';

const SidebarItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: '12px 16px',
    borderRadius: '8px',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300],
    },
    '&.active': {
        color: theme.palette.mode === 'dark' ? '#90caf9' : '#0c66e4',
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#e9f2ff',
    },
}));

function BoardsPage() {
    const [boards, setBoards] = useState<IBoardEntity[] | null>(null);
    const [totalBoards, setTotalBoards] = useState<number | null>(null);
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    const page = parseInt(query.get('page') || '1', 10);

    const updateListBoards = (res: { boards?: IBoardEntity[]; totalBoards?: number }) => {
        setBoards(res.boards ?? []);
        setTotalBoards(res.totalBoards ?? 0);
    };

    useEffect(() => {
        const controller = new AbortController();
        getBoardsAPI(location.search, controller.signal).then(updateListBoards);

        return () => controller.abort();
    }, [location.search]);

    const handleAfterCreatedBoard = () => {
        getBoardsAPI(location.search).then(updateListBoards);
    };

    if (!boards) {
        return <PageLoadingSpinner caption='Loading Boards...' />;
    }

    return (
        <Box sx={{ px: 2, my: 4 }}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 3 }}>
                    <Stack direction='column' spacing={1}>
                        <SidebarItem className='active'>
                            <SpaceDashboardIcon fontSize='small' />
                            Boards
                        </SidebarItem>
                        <SidebarItem>
                            <ListAltIcon fontSize='small' />
                            Templates
                        </SidebarItem>
                        <SidebarItem>
                            <HomeIcon fontSize='small' />
                            Home
                        </SidebarItem>
                    </Stack>
                    <Divider sx={{ my: 1 }} />
                    <Stack direction='column' spacing={1}>
                        <SidebarCreateBoardModal onAfterCreate={handleAfterCreatedBoard} />
                    </Stack>
                </Grid>

                <Grid size={{ xs: 12, sm: 9 }}>
                    <Typography variant='h4' sx={{ fontWeight: 'bold', mb: 3 }}>
                        Your boards:
                    </Typography>

                    {boards?.length === 0 && (
                        <Typography component='span' sx={{ fontWeight: 'bold', mb: 3 }}>
                            No result found!
                        </Typography>
                    )}

                    {boards?.length > 0 && (
                        <Grid container spacing={2}>
                            {boards.map((item) => (
                                <Grid key={item._id} columns={{ xs: 2, sm: 3, md: 4 }}>
                                    <Card sx={{ width: '250px' }}>
                                        {/* <CardMedia component="img" height="100" image="https://picsum.photos/100" /> */}
                                        <Box sx={{ height: '50px', backgroundColor: randomColor() }}></Box>

                                        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                            <Typography gutterBottom variant='h6' component='div'>
                                                {item.title}
                                            </Typography>
                                            <Typography
                                                variant='body2'
                                                color='text.secondary'
                                                sx={{
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {item.description}
                                            </Typography>
                                            <Box
                                                component={Link}
                                                to={`/boards/${item._id}`}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'flex-end',
                                                    mt: 1,
                                                    color: 'primary.main',
                                                    '&:hover': { color: 'primary.light' },
                                                }}
                                            >
                                                Go to board <ArrowRightIcon fontSize='small' />
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}

                    {!!totalBoards && totalBoards > 0 && (
                        <Box sx={{ my: 3, pr: 5, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Pagination
                                size='large'
                                color='secondary'
                                showFirstButton
                                showLastButton
                                // rounds a number up to the nearest integer
                                count={Math.ceil(totalBoards / DEFAULT_ITEMS_PER_PAGE)}
                                page={page}
                                renderItem={(item) => (
                                    <PaginationItem
                                        component={Link}
                                        to={`/boards${item.page === DEFAULT_PAGE ? '' : `?page=${item.page}`}`}
                                        {...item}
                                    />
                                )}
                            />
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}

export default BoardsPage;
