import { useState } from 'react';
import { ModalDesginV2 } from '../components/Modal/ModalDesgin';
import Loading from '../components/Loading/Loading';

const useLoadingV2 = () => {
    const [open, setOpen] = useState(true);
    const [animateStyle, setAnimateStyle] = useState('animate__fadeIn');
    const handleOpen = () => {
        setAnimateStyle('animate__fadeIn');
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const LoadingAPI = () => {
        return (
            <ModalDesginV2
                open={open}
                onHandleClose={handleClose}
                animateStyle={animateStyle}
                setAnimateStyle={setAnimateStyle}
            >
                <Loading />
            </ModalDesginV2>
        );
    };

    return {
        open,
        animateStyle,
        handleOpen,
        handleClose,
        setOpen,
        setAnimateStyle,
        LoadingAPI,
    };
};

export default useLoadingV2;
