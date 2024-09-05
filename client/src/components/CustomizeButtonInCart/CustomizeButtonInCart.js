import { Button } from '@mui/material';
import React from 'react';
import { theme } from '../../Theme/Theme';
export const CustomizeButtonInCart = ({
    textAction,
    onHandleClick,
    variant = 'contained',
    isReverseAnimation,
    fullWidth = true,
    width,
}) => {
    return (
        <Button
            onClick={onHandleClick}
            variant={variant}
            fullWidth={fullWidth}
            sx={{
                fontWeight: 'bold',
                mb: 1,
                position: 'relative',
                width: fullWidth ? '100%' : width,
                height: '40px',
                fontFamily: 'Lato, sans-serif',
                fontSize: '14px',
                backgroundColor: theme.palette.text.secondary,
                color: isReverseAnimation ? '#fff' : theme.palette.text.secondary,
                cursor: 'pointer',
                overflow: 'hidden',
                borderRadius: '8px',
                transition: '0.7s steps(22)',
                textTransform: 'initial',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage:
                        'url("https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/nature-sprite.png")',
                    backgroundSize: '2300% 100%',
                    animation: isReverseAnimation
                        ? 'ani 0.7s steps(22) forwards'
                        : 'ani2 0.7s steps(22) forwards',
                    WebkitAnimation: isReverseAnimation
                        ? 'ani 0.7s steps(22) forwards'
                        : 'ani2 0.7s steps(22) forwards',
                    zIndex: 1,
                },
                '&:hover::before': {
                    animation: isReverseAnimation
                        ? 'ani2 0.7s steps(22) forwards'
                        : 'ani 0.7s steps(22) forwards',
                    WebkitAnimation: isReverseAnimation
                        ? 'ani2 0.7s steps(22) forwards'
                        : 'ani 0.7s steps(22) forwards',
                },
                '&:hover': {
                    fontWeight: 'bold',
                    // backgroundColor: '#555',
                    color: isReverseAnimation ? theme.palette.text.secondary : '#fff',
                    backgroundColor: theme.palette.text.secondary,
                    borderColor: theme.palette.text.secondary,
                    zIndex: 2,
                },

                // define animation
                '@keyframes ani': {
                    from: {
                        backgroundPosition: '0 0',
                        maskPosition: '0 0',
                    },
                    to: {
                        backgroundPosition: '100% 0',
                        maskPosition: '100% 0',
                    },
                },
                '@keyframes ani2': {
                    from: {
                        backgroundPosition: '100% 0',
                        maskPosition: '0 0',
                    },
                    to: {
                        backgroundPosition: '0 0',
                        maskPosition: '100% 0',
                    },
                },
            }}
        >
            <span
                style={{
                    position: 'relative',
                    zIndex: 2,
                    fontSize: '14px',
                }}
            >
                {textAction}
            </span>
        </Button>
    );
};
