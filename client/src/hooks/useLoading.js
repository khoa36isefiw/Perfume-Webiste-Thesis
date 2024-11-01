import { useState } from 'react';

const useLoading = () => {
    const [open, setOpen] = useState(true);
    const [animateStyle, setAnimateStyle] = useState('animate__fadeIn');
    const handleOpen = () => {
        setAnimateStyle('animate__fadeIn');
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return {
        open,
        animateStyle,
        handleOpen,
        handleClose,
        setOpen,
        setAnimateStyle,
    };
};

export default useLoading;
