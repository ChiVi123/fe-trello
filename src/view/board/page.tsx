import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
// import CardMedia from '@mui/material/CardMedia'
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import randomColor from 'randomcolor';
import { Link, useLocation } from 'react-router-dom';
import PageLoadingSpinner from '~components/page-loading-spinner';
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from '~core/constants';
import { IBoardEntity } from '~modules/board/entity';
import { getBoardsAPI } from '~modules/board/repository';

function BoardsPage() {
    const [boards, setBoards] = useState<IBoardEntity[] | null>(null);
    const [totalBoards, setTotalBoards] = useState<number | null>(null);
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    const page = parseInt(query.get('page') || '1', 10);

    useEffect(() => {
        const controller = new AbortController();
        getBoardsAPI(location.search, controller.signal).then((res) => {
            setBoards(res.boards ?? []);
            setTotalBoards(res.totalBoards ?? 0);
        });

        return () => controller.abort();
    }, [location.search]);

    if (!boards) {
        return <PageLoadingSpinner caption='Loading Boards...' />;
    }

    return (
        <>
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
                                        sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                                    >
                                        {item.description}
                                    </Typography>
                                    <Box
                                        component={Link}
                                        to={`/boards/${item._id}`}
                                        sx={{
                                            mt: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
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
        </>
    );
}

export default BoardsPage;
