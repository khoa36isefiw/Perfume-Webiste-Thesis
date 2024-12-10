import { Button, styled, Typography } from '@mui/material';
import React from 'react';
import { tabletScreen, theme } from '../../Theme/Theme';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';

function CustomizeButton({ onHandleClick, textAction, disabled }) {
    return (
        <Button
            disabled={disabled}
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
                [tabletScreen]: {
                    fontSize: '13px',
                },
                '&.Mui-disabled': {
                    color: theme.palette.secondaryText,
                    borderColor: '#ccc',
                    bgcolor: '#ccc',
                },
            }}
        >
            {textAction}
        </Button>
    );
}

export default CustomizeButton;

export const CustomizeButtonOutlined = ({ textAction, onHandleClick, disabled }) => {
    return (
        <Button
            disabled={disabled}
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
                '&.Mui-disabled': {
                    color: '#ccc',
                    borderColor: '#ccc',
                },
            }}
        >
            {textAction}
        </Button>
    );
};

export const CustomizeHoverButton = ({
    textAction,
    onHandleClick,
    color,
    borderColor,
    bgcolor,
}) => {
    return (
        <Button
            onClick={onHandleClick}
            sx={{
                position: 'relative',
                display: 'block',
                color: color ? color : '#fff',
                fontSize: '14px',
                textDecoration: 'none',
                // border: `2px solid ${theme.palette.text.secondary}`,
                border: `2px solid ${borderColor ? borderColor : '#fff'}`,
                padding: '8px 32px',
                textTransform: 'uppercase',
                overflow: 'hidden',
                transition: '1s all ease',
                zIndex: 1,
                '&::before': {
                    // backgroundColor: theme.palette.text.secondary,
                    backgroundColor: bgcolor ? bgcolor : '#fff',
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
            }}
        >
            <Typography
                sx={{
                    textTransform: 'initial',
                    position: 'relative',
                    zIndex: 2,
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: color ? color : theme.palette.text.secondary,
                }}
            >
                {textAction}
            </Typography>
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
                border: `1px solid ${theme.palette.text.secondary}`,
                color: '#fff',

                padding: '8px 32px',
                '&::before, &::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    height: '100%',
                    width: '150%',
                    background: theme.palette.text.secondary,
                    zIndex: 0,
                    transition: 'transform 1s ease',
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

export const CustomizeButtonV2 = styled(Button)(({ bgcolor }) => ({
    py: 1,
    borderRadius: '8px',
    borderColor: theme.palette.text.main,
    backgroundColor: bgcolor,
    fontSize: '14px',
    fontWeight: 'bold',
    textTransform: 'initial',
    color: '#fff',
    '&:hover': {
        backgroundColor: theme.palette.text.main,
        borderColor: theme.palette.text.main,
    },
}));
