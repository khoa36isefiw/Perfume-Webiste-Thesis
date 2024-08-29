import { Button } from '@mui/material';
import React from 'react';
import { theme } from '../../Theme/Theme';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';

function CustomizeButton({ onHandleClick, textAction }) {
    return (
        <Button
            onClick={onHandleClick}
            variant="contained"
            sx={{
                py: 1,
                borderRadius: '8px',
                bgcolor: theme.palette.secondaryText,
                fontSize: '14px',
                fontWeight: 'bold',
                textTransform: 'initial',
                '&:hover': {
                    bgcolor: theme.palette.secondaryText,
                },
            }}
        >
            {textAction}
        </Button>
    );
}

export default CustomizeButton;

export const CustomizeButtonOutlined = ({ textAction, onHandleClick }) => {
    return (
        <Button
            onClick={onHandleClick}
            variant="outlined"
            sx={{
                py: 1,
                borderRadius: '8px',
                color: '#fff',
                // bgcolor: theme.palette.secondaryText,
                fontSize: '14px',
                fontWeight: 'bold',
                textTransform: 'initial',
                borderColor: theme.palette.text.main,
                '&:hover': {
                    cursor: 'pointer',
                    borderColor: theme.palette.text.main,
                },
            }}
        >
            {textAction}
        </Button>
    );
};

export const CustomizeHoverButton = ({ textAction, onHandleClick }) => {
    return (
        <Button
            onClick={onHandleClick}
            sx={{
                position: 'relative',
                display: 'block',
                color: '#fff',
                fontSize: '14px',
                textDecoration: 'none',

                margin: '30px 0',
                border: '2px solid #ff7675',
                padding: '14px 60px',
                textTransform: 'uppercase',
                overflow: 'hidden',
                transition: '1s all ease',
                zIndex: 1,
                '&::before': {
                    backgroundColor: '#ff7675',
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    //background is behind the text
                    zIndex: 0,
                    transition: 'all 0.6s ease',
                    width: '100%',
                    height: '0%',
                },
                '&:hover::before': {
                    height: '100%',
                },
                '&:hover': {
                    color: '#000',
                },
            }}
        >
            <CustomizeTypography
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    color: '#fff',
                }}
            >
                {textAction}
            </CustomizeTypography>
        </Button>
    );
};

export const CustomizeHoverButtonV2 = ({ textAction, onHandleClick }) => {
    return (
        <Button
            onClick={onHandleClick}
            sx={{
                position: 'relative',
                textTransform: 'initial',
                overflow: 'hidden',
                border: '1px solid #eeeeee',
                color: '#fff',
                '&::before, &::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    height: '100%',
                    width: '150%',
                    background: '#259f6c',
                    zIndex: 0,
                    transition: 'transform .8s ease',
                },
                '&::before': {
                    left: 0,
                    transformOrigin: '0 bottom',
                    transform: 'translateX(-100%) rotate(-30deg)',
                },
                '&::after': {
                    right: 0,
                    transformOrigin: 'right bottom',
                    transform: 'translateX(100%) rotate(-30deg)',
                },
                '&:hover::before': {
                    transform: 'translateX(0) rotate(0deg)',
                },
                '&:hover::after': {
                    transform: 'translateX(0) rotate(0deg)',
                },
                '&:hover': {
                    color: '#fff',
                },
            }}
        >
            <CustomizeTypography
                sx={{
                    mb: 0,
                    position: 'relative',
                    zIndex: 1,
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 'bold',
                }}
            >
                {textAction}
            </CustomizeTypography>
        </Button>
    );
};
