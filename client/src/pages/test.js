import * as React from 'react';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import { Box } from '@mui/material';

export default function TestSnackbar() {
    const { enqueueSnackbar } = useSnackbar();

    const handleClick = () => {
        enqueueSnackbar('I love snacks.');
    };

    const handleClickVariant = (variant) => () => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar('This is a success message!', { variant });
    };

    return (
        <Box sx={{ height: '100px', width: '200px', bgcolor: '#ccc' }}>
            <Button onClick={handleClick}>Show snackbar</Button>
            <Button onClick={handleClickVariant('success')}>Show success snackbar</Button>
        </Box>
    );
}
