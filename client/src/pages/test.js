import * as React from 'react';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import { Box, Typography } from '@mui/material';

export default function TestSnackbarWithTitle() {
    const { enqueueSnackbar } = useSnackbar();

    const handleClickWithTitle = (variant) => () => {
        enqueueSnackbar('This is a success message!', {
            variant, // type of message: warning, success, infor, error
            // position for message
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            },
            content: () => (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        bgcolor: '#fff',
                        border: '1px solid #4caf50',
                        borderRadius: '4px',
                        p: 1,
                    }}
                >
                    <Typography variant="h6" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                        Success
                    </Typography>
                    <Typography>This is a success message!</Typography>
                </Box>
            ),
        });
    };

    return (
        <Box sx={{ height: '100px', width: '200px', bgcolor: '#ccc', p: 2 }}>
            <Button onClick={handleClickWithTitle('success')} variant="contained">
                Show success snackbar with title
            </Button>
        </Box>
    );
}
