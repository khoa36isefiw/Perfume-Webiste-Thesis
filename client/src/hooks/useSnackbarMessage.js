import React from 'react';
import { useSnackbar } from 'notistack';
import { Box } from '@mui/material';
import NotificationMessageV2 from '../components/NotificationMessage/NotificationMessageV2';

export const useSnackbarMessage = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const showNotificationMessage = (variant, title, content, options = {}) => {
        enqueueSnackbar(content, {
            variant, // 'success', 'error', 'info', 'warning'
            anchorOrigin: { vertical: 'top', horizontal: 'right' }, // default position
            autoHideDuration: 6000, // default duration
            ...options, // allow overriding default options
            content: (key) => (
                <Box key={key}>
                    <NotificationMessageV2
                        msgType={variant}
                        msgTitle={title}
                        msgContent={content}
                        onClose={() => closeSnackbar(key)}
                    />
                </Box>
            ),
        });
    };

    return {
        showNotificationMessage,
    };
};
