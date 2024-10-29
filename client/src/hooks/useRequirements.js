import React, { useState } from 'react';
import { Box, Typography, IconButton, Popper, Paper, Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const useRequirements = (externalOpen, setExternalOpen) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const open = externalOpen !== null ? externalOpen : internalOpen;
    const setOpen = setExternalOpen || setInternalOpen;

    const handleOpen = () => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
        // Automatically close after 6 seconds
        setTimeout(() => {
            setOpen(false);
        }, 6000);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function RequirementContent() {
        <Popper
            sx={{ zIndex: 1200 }}
            open={open}
            anchorEl={anchorEl}
            placement={'right'}
            transition
        >
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper
                        sx={{
                            width: '400px',
                            borderRadius: '8px',
                            border: '1px solid #d3d3d3',
                            ml: 1,
                        }}
                    >
                        <Box
                            sx={{
                                padding: 2,
                                position: 'relative',
                            }}
                        >
                            <Typography sx={{ fontSize: '13px' }}>
                                <strong>Name:</strong> Not contain number and specail characters.
                            </Typography>
                            <Typography sx={{ fontSize: '13px' }}>
                                <strong>Phone Number:</strong> Not contain number.
                            </Typography>
                            <Typography sx={{ fontSize: '13px' }}>
                                <strong>Email:</strong> Must be a mail. Use mail that you can
                                recover the password
                            </Typography>
                            <IconButton
                                onClick={handleClose}
                                size="large"
                                disableTouchRipple
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    opacity: '0.65',
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
        </Popper>;
    }

    return { handleOpen, handleClose, anchorEl, RequirementContent };
};

export default useRequirements;
