import React from 'react';
import { Box, Button, IconButton, styled } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import { theme } from '../../Theme/Theme';

// Styled components
const Container = styled(Box)({
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
});

const StyledButton = styled(Button)(({}) => ({
    margin: '20px auto',
    border: 'none',
    padding: '4px 64px',
    fontSize: '16px',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        transition: 'all 0.85s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        content: '""',
        width: '50%',
        height: '100%',
        background: 'black',
        position: 'absolute',
        top: 0,
        left: 0,
    },

    '&:hover::before': {
        width: '100%',
    },
    '&.rounded': {
        borderRadius: '50px',
        '& .text-green': {
            color: '#fff',
            // color: theme.palette.text.secondary,
            mixBlendMode: 'difference',
        },
        '&::before': {
            borderRadius: '50px',
            width: '25%',
            background: '#fff',
            background: theme.palette.text.secondary,
        },
        '&:hover::before': {
            width: '100%',
            // background: '#fff',
            background: theme.palette.text.secondary,
        },
    },
}));


const ButtonComponent = ({ textAction, onHandleClick, onHandleKeyEvent }) => {
    return (
        <Container onClick={onHandleClick}>
            <StyledButton className="btn rounded" onKeyDown={onHandleKeyEvent}>
                <span className="text-green">{textAction}</span>
            </StyledButton>
        </Container>
    );
};

export default ButtonComponent;
