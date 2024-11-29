import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';

function SubscribeModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Check if the modal was previously closed and the time has passed
        const lastClosedTime = localStorage.getItem('subscribe_modal_last_closed');
        const currentTime = new Date().getTime();
        // const timeLimit = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        const timeLimit = 4000; // 24 hours in milliseconds

        if (!lastClosedTime || currentTime - lastClosedTime > timeLimit) {
            setIsModalOpen(true); // Open the modal if the time limit has passed
        }
    }, []);

    const handleSubscribe = () => {
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        // Simulate API call
        console.log('Subscribed email:', email);
        setError('');
        closeAndStoreTime();
    };

    const handleClose = () => {
        closeAndStoreTime();
    };

    const closeAndStoreTime = () => {
        setIsModalOpen(false);
        const currentTime = new Date().getTime();
        localStorage.setItem('subscribe_modal_last_closed', currentTime.toString()); // Save close time
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <Modal
            open={isModalOpen}
            onClose={handleClose}
            aria-labelledby="subscribe-modal-title"
            aria-describedby="subscribe-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'white',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    maxWidth: 600,
                    width: '90%',
                }}
            >
                <Typography
                    id="subscribe-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ mb: 2, fontSize: '14px' }}
                >
                    Subscribe to our Newsletter
                </Typography>
                <Typography
                    id="subscribe-modal-description"
                    sx={{ mb: 2, fontSize: '14px', color: 'gray' }}
                >
                    Enter your email address to receive the latest updates and offers.
                </Typography>
                <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!error}
                    helperText={error}
                    sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" color="primary" onClick={handleSubscribe}>
                        Subscribe
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default SubscribeModal;
