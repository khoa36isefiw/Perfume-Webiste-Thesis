import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { mobileScreen, theme } from '../../Theme/Theme';

export default function BackToTop() {
    const [showsScrolBtn, setShowScrolBtn] = useState({
        show: false,
        animation: '',
    });

    useEffect(() => {
        const handleButtonVisibility = () => {
            if (window.pageYOffset > 300) {
                setShowScrolBtn({
                    show: true,
                    animation: 'animate__zoomIn',
                });
            } else if (showsScrolBtn.show) {
                setShowScrolBtn({
                    ...showsScrolBtn,
                    animation: 'animate__fadeOutRight',
                });
                // delay time to hide the button when animation is occurring
                setTimeout(() => {
                    setShowScrolBtn({
                        show: false,
                        animation: '',
                    });
                }, 500);
            }
        };

        window.addEventListener('scroll', handleButtonVisibility);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleButtonVisibility);
        };
    }, [showsScrolBtn]);

    return (
        <>
            {(showsScrolBtn.show || showsScrolBtn.animation === 'animate__fadeOutRight') && (
                <Box
                    id="scrolToTop"
                    onClick={() => {
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'smooth',
                        });
                    }}
                    sx={{
                        position: 'fixed',
                        bottom: '60px',
                        right: '60px',
                        color: 'white',
                        backgroundColor: theme.palette.text.secondary,
                        padding: '4px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        fontSize: '2em',
                        textAlign: 'center',
                        zIndex: 99,
                        [mobileScreen]: {
                            right: '30px',
                        },
                    }}
                    className={`animate__animated ${showsScrolBtn.animation}`}
                >
                    <IconButton>
                        <KeyboardArrowUpIcon
                            sx={{
                                fontSize: '32px',
                                color: '#fff',
                                [mobileScreen]: {
                                    fontSize: '24px',
                                },
                            }}
                        />
                    </IconButton>
                </Box>
            )}
        </>
    );
}
