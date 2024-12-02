import React from 'react';
import { useSnackbar } from 'notistack';
import { Box, Typography } from '@mui/material';
import NotificationMessageV2 from '../components/NotificationMessage/NotificationMessageV2';

export const useSnackbarMessage = () => {
    const { enqueueSnackbar } = useSnackbar();

    const handleClickWithTitle = (variant, title, content, options = {}) => {
        enqueueSnackbar(content, {
            variant, // 'success', 'error', 'info', 'warning'
            anchorOrigin: { vertical: 'top', horizontal: 'right' }, // default position
            autoHideDuration: 3000, // default duration
            ...options, // allow overriding default options
            content: (key) => (
                // <Box
                //     key={key}
                //     sx={{
                //         zIndex: 999,
                //         display: 'flex',
                //         flexDirection: 'column',
                //         bgcolor: '#fff',
                //         border: `1px solid ${
                //             variant === 'success'
                //                 ? '#4caf50'
                //                 : variant === 'error'
                //                 ? '#f44336'
                //                 : variant === 'warning'
                //                 ? '#ff9800'
                //                 : '#2196f3'
                //         }`,
                //         borderRadius: '4px',
                //         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                //         p: 1,
                //     }}
                // >
                //     <Typography
                //         variant="h6"
                //         sx={{
                //             fontWeight: 'bold',
                //             color:
                //                 variant === 'success'
                //                     ? '#4caf50'
                //                     : variant === 'error'
                //                     ? '#f44336'
                //                     : variant === 'warning'
                //                     ? '#ff9800'
                //                     : '#2196f3',
                //         }}
                //     >
                //         {title}
                //     </Typography>
                //     <Typography>{content}</Typography>
                // </Box>
                <Box key={key}>
                    <NotificationMessageV2
                        msgType={variant}
                        msgTitle={title}
                        msgContent={content}
                    />
                </Box>
            ),
        });
    };

    return {
        handleClickWithTitle,
    };
};
