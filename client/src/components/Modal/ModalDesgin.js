import React from 'react';
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

const style = {
    modalStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        bgcolor: 'rgba(0,0,0,0.25)',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    },
    modalStyleV2: {
        height: '100%',

        width: '100%',
        bgcolor: 'rgba(0,0,0,0.25)',
    },
};

export default function ModalDesgin({
    open,
    onHandleClose,
    animateStyle,
    setAnimateStyle,
    children,
}) {
    const handleCloseModal = () => {
        setAnimateStyle('animate__fadeOut');
        // deplay closing the modal to allow the animation to play
        setTimeout(() => {
            onHandleClose();
        }, 10000);
    };
    return (
        <Modal
            open={open}
            onClose={handleCloseModal}
            className={`animate__animated ${animateStyle}`}
        >
            <Box sx={style.modalStyle}>
                <IconButton
                    sx={{ position: 'absolute', top: '10%', right: '30%' }}
                    onClick={handleCloseModal}
                >
                    <CloseIcon sx={{ color: '#fff', fontSize: '28px' }} />
                </IconButton>
                {children}
            </Box>
        </Modal>
    );
}

export function ModalDesginV2({ open, onHandleClose, animateStyle, setAnimateStyle, children }) {
    const handleCloseModal = () => {
        setAnimateStyle('animate__fadeOut');
        // deplay closing the modal to allow the animation to play
        setTimeout(() => {
            onHandleClose();
        }, 200);
    };
    return (
        <Modal
            open={open}
            onClose={handleCloseModal}
            className={`animate__animated ${animateStyle}`}
        >
            <Box sx={style.modalStyleV2}>{children}</Box>
        </Modal>
    );
}
