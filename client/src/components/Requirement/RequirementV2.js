import React from 'react';
import { Box, Paper, Typography, IconButton, Fade } from '@mui/material';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import CloseIcon from '@mui/icons-material/Close';

export function RequirementV2({ onHandleOpen, onHandleClose, open }) {
    const handleClick = () => {
        onHandleOpen();

        // Hide tooltip after 6 seconds
        setTimeout(() => {
            onHandleClose();
        }, 6000);
    };

    return (
        <Box position="relative" display="inline-block">
            <IconButton onClick={handleClick} sx={{ padding: 0 }}>
                <HelpCenterIcon
                    disableTouchRipple
                    sx={{
                        fontSize: '24px',
                        color: '#fff',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    }}
                />
            </IconButton>
            {open && (
                <Fade in={open} timeout={350}>
                    <Paper
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: 'calc(100% + 8px)',
                            transform: 'translateY(-50%)',
                            width: '400px',
                            borderRadius: '8px',
                            border: '1px solid #d3d3d3',
                            zIndex: 1200,
                        }}
                    >
                        <Box sx={{ padding: 2, position: 'relative' }}>
                            <Typography sx={{ fontSize: '13px' }}>
                                <strong>Name:</strong> Should not contain numbers or special
                                characters.
                            </Typography>
                            <Typography sx={{ fontSize: '13px' }}>
                                <strong>Phone Number:</strong> Should contain only numbers.
                            </Typography>
                            <Typography sx={{ fontSize: '13px' }}>
                                <strong>Email:</strong> Must be a valid email.
                            </Typography>
                            <IconButton
                                onClick={onHandleClose}
                                size="large"
                                disableTouchRipple
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    opacity: 0.65,
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        cursor: 'pointer',
                                        opacity: 1,
                                    },
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Paper>
                </Fade>
            )}
        </Box>
    );
}
