import * as React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import { mobileScreen, theme } from '../../Theme/Theme';

function NotificationMessageV2({ msgType, msgTitle, msgContent, onClose }) {
    const getNotificationStyles = (type) => {
        // get from styles
        switch (type) {
            case 'error':
                return {
                    icon: <CancelIcon sx={{ fontSize: '20px' }} />,
                    bgColor: theme.palette.notification.errorBg,
                    borderColor: theme.palette.notification.errorIcon,
                    iconColor: theme.palette.notification.errorIcon,
                };
            case 'warning':
                return {
                    icon: <WarningIcon sx={{ fontSize: '20px' }} />,
                    bgColor: theme.palette.notification.warningBg,
                    borderColor: theme.palette.notification.warningBorder,
                    iconColor: theme.palette.notification.warningIcon,
                };
            case 'infor':
                return {
                    icon: <InfoIcon sx={{ fontSize: '20px' }} />,
                    bgColor: theme.palette.notification.inforBg,
                    borderColor: theme.palette.notification.inforIcon,
                    iconColor: theme.palette.notification.inforIcon,
                };
            default:
                return {
                    icon: <CheckCircleIcon sx={{ fontSize: '20px' }} />,
                    bgColor: theme.palette.notification.successBg,
                    borderColor: theme.palette.notification.successBorder,
                    iconColor: theme.palette.notification.successIcon,
                };
        }
    };

    const { icon, bgColor, borderColor, iconColor } = getNotificationStyles(msgType);

    return (
        <Box
            sx={{
                minHeight: '60px',
                width: '350px',
                padding: '4px',
                bgcolor: bgColor,
                // border: `2px solid ${borderColor}`,
                // borderRadius: 2,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                // [mobileScreen]: {
                //     width: '300px',
                // },
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <IconButton
                    sx={{
                        padding: '4px 8px',
                        color: iconColor,
                        '&:hover': {
                            bgcolor: 'transparent',
                        },
                    }}
                >
                    {icon}
                </IconButton>
                <Box>
                    {/* message title */}
                    <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        {msgTitle}
                    </Typography>
                    {/* message content */}
                    <Typography sx={{ fontSize: '14px' }}>{msgContent}</Typography>
                </Box>
            </Box>
            <IconButton sx={{ padding: 0 }} onClick={onClose}>
                <CloseIcon sx={{ fontSize: '20px' }} />
            </IconButton>
        </Box>
    );
}

export default NotificationMessageV2;
