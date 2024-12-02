import { useState } from 'react';
import { Box } from '@mui/material';
import NotificationMessage from '../components/NotificationMessage/NotificationMessage';

const useShowNotificationMessageV2 = () => {
    const [notifications, setNotifications] = useState([]);

    // Thêm thông báo mới
    const showMessage = (type, title, content) => {
        const id = Date.now(); // create id
        const newNotification = { id, type, title, content, animation: 'animate__bounceInRight' };
        setNotifications((prev) => [...prev, newNotification]);
    };

    // Xóa thông báo sau khi ẩn
    const handleCloseNotification = (id) => {
        setNotifications((prev) =>
            prev.map((notification) =>
                notification.id === id
                    ? { ...notification, animation: 'animate__fadeOut' } // Đổi animation để ẩn
                    : notification,
            ),
        );
        setTimeout(() => {
            setNotifications((prev) => prev.filter((notification) => notification.id !== id));
        }, 4000);
    };

    const MessageShowed = () => (
        <>
            {notifications.map((notification, index) => (
                <Box
                    key={notification.id}
                    sx={{
                        position: 'fixed',
                        top: `${5 + index * 10}%`, // Vị trí thông báo, mỗi thông báo cách nhau 10%
                        right: '1%',
                        zIndex: 9999,
                    }}
                    className={`animate__animated ${notification.animation}`}
                >
                    <NotificationMessage
                        msgType={notification.type}
                        msgTitle={notification.title}
                        msgContent={notification.content}
                        onClose={() => handleCloseNotification(notification.id)}
                    />
                </Box>
            ))}
        </>
    );

    return {
        showMessage,
        MessageShowed,
    };
};

export default useShowNotificationMessageV2;
