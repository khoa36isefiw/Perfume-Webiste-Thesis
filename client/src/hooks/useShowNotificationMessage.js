import { Box } from '@mui/material';
import { useState } from 'react';
import NotificationMessage from '../components/NotificationMessage/NotificationMessage';

const useShowNotificationMessage = () => {
    const [showNotification, setShowNotification] = useState(false);
    const [showAnimation, setShowAnimation] = useState('animate__bounceInRight');
    const [messageType, setMessageType] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [messageTitle, setMessageTitle] = useState('');

    const showMessage = (type, title, content) => {
        setMessageType(type);
        setMessageContent(content);
        setMessageTitle(title);
        setShowAnimation('animate__bounceInRight');
        setShowNotification(true);
    };

    const handleCloseNotification = () => {
        setShowAnimation('animate__fadeOut');
        setTimeout(() => {
            setShowNotification(false);
        }, 1000);
    };

    // auto show message
    const MessageShowed = () => {
        return (
            <>
                {showNotification && (
                    <Box
                        sx={{ position: 'fixed', top: '5%', right: '1%', zIndex: 9999999 }}
                        className={`animate__animated ${showAnimation}`}
                    >
                        <NotificationMessage
                            msgType={messageType}
                            msgTitle={messageTitle}
                            msgContent={messageContent}
                            autoHideDuration={3000} // Auto-hide after 5 seconds
                            onClose={handleCloseNotification}
                        />
                    </Box>
                )}
            </>
        );
    };

    return {
        showNotification,
        showAnimation,
        messageType,
        messageTitle,
        messageContent,
        showMessage,
        handleCloseNotification,
        MessageShowed,
    };
};

export default useShowNotificationMessage;
