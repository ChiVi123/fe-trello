import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useDebounceFn } from '~hook/debounce';
import { IBoardEntity } from '~modules/board/entity';
import { getBoardsAPI } from '~modules/board/repository';

function TopBarSearchBoard() {
    const navigate = useNavigate();

    const [open, setOpen] = useState<boolean>(false);
    const [boards, setBoards] = useState<IBoardEntity[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!open) setBoards(null);
    }, [open]);

    const handleInputSearchChange = (_event: unknown, eventValue: string) => {
        if (!eventValue) return;
        const searchPath = `?${createSearchParams({ 'q[title]': eventValue })}`;

        setLoading(true);
        getBoardsAPI(searchPath)
            .then((res) => {
                setBoards(res.boards ?? []);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const debounceSearchFn = useDebounceFn(handleInputSearchChange, 1000);

    const handleSelectedBoard = (_event: unknown, selectedBoard: IBoardEntity | null) => {
        if (!selectedBoard) return;
        navigate(`/boards/${selectedBoard._id}`);
    };

    return (
        <Autocomplete
            id='asynchronous-search-board'
            noOptionsText={!boards ? 'Type to search board...' : 'No board found!'}
            open={open}
            loading={loading}
            options={boards ?? []}
            isOptionEqualToValue={(option, value) => option._id === value._id} // https://stackoverflow.com/a/65347275/8324172
            getOptionLabel={(board) => board.title}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label='Type to search'
                    size='small'
                    slotProps={{
                        input: {
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <SearchIcon sx={{ color: 'white' }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress sx={{ color: 'white' }} size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        },
                    }}
                    sx={{
                        '& label': { color: 'white' },
                        '& input': { color: 'white' },
                        '& label.Mui-focused': { color: 'white' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'white' },
                            '&:hover fieldset': { borderColor: 'white' },
                            '&.Mui-focused fieldset': { borderColor: 'white' },
                        },
                        '.MuiSvgIcon-root': { color: 'white' },
                    }}
                />
            )}
            sx={{ width: 220 }}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            onInputChange={debounceSearchFn} // trigger when typing
            onChange={handleSelectedBoard} // trigger when select
        />
    );
}

export default TopBarSearchBoard;
