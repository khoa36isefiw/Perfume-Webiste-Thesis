import { Button } from '@mui/material';
import React from 'react';
import { theme } from '../../Theme/Theme';

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
