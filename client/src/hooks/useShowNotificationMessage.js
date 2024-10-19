import { useState } from 'react';

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

    return {
        showNotification,
        showAnimation,
        messageType,
        messageContent,
        messageTitle,
        showMessage,
        handleCloseNotification,
    };
};

export default useShowNotificationMessage;
