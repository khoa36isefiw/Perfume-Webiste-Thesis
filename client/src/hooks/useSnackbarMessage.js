import * as React from 'react';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import { Box, Typography } from '@mui/material';

export const useSnackbarMessage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const handleClickWithTitle = (variant, title, content) => () => {
        enqueueSnackbar({
            variant, // type of message: warning, success, infor, error
            // position for message
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            },
            autoHideDuration: 3000,
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
                        {title}
                    </Typography>
                    <Typography>{content}</Typography>
                </Box>
            ),
        });
    };
    return {};
};
