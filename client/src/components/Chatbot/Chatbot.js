import React, { useState } from 'react';
import { Avatar, Box, TextField, Button, Typography, IconButton } from '@mui/material';
import ChatbotImage from '../../assets/images/chatbot.png';
import { mobileScreen, theme } from '../../Theme/Theme';
import RemoveIcon from '@mui/icons-material/Remove';

function Chatbot() {
    // control chat window visibility
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const toggleChatWindow = () => setIsOpen(!isOpen);

    const handleSend = () => {
        if (inputValue.trim()) {
            setMessages((prev) => [...prev, { type: 'user', text: inputValue }]);
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    { type: 'bot', text: `You said: "${inputValue}"` },
                ]);
            }, 1000);
            setInputValue('');
        }
    };

    return (
        <>
            {/* floating chat icon button */}
            <Box
                sx={{
                    cursor: 'pointer',
                    width: '60px',
                    height: '60px',
                    position: 'fixed',
                    bottom: '140px',
                    right: '60px',
                    color: 'white',
                    borderRadius: '50%',
                    fontSize: '2em',
                    textAlign: 'center',
                    zIndex: 99,
                    [mobileScreen]: {
                        right: '30px',
                    },
                }}
                onClick={toggleChatWindow}
            >
                <Avatar
                    src={ChatbotImage}
                    alt="Chatbot"
                    sx={{
                        width: '64px',
                        height: '64px',
                        cursor: 'pointer',
                        objectFit: 'cover',
                        p: 1,
                        backgroundColor: theme.palette.text.secondary,
                        border: '2px solid #ccc',
                    }}
                />
            </Box>

            {/* Chat Window */}
            {isOpen && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: '200px',
                        right: '60px',
                        width: '300px',
                        height: '400px',
                        border: '1px solid #ccc',
                        borderRadius: 2,
                        backgroundColor: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        zIndex: 100,
                        [mobileScreen]: {
                            right: '30px',
                            width: '260px',
                        },
                        // filter: 'drop-shadow(0 0 0.75rem #ccc)',
                    }}
                >
                    {/* chat header */}
                    <Box
                        sx={{
                            backgroundColor: '#ffffff',
                            color: '#000',
                            padding: '10px',
                            borderTopLeftRadius: '8px',
                            borderTopRightRadius: '8px',

                            textAlign: 'center',
                            fontWeight: 'bold',
                            borderBottom: '1px solid #ccc',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography sx={{ fontSize: '14px', flex: 1 }}>
                            Chat with Tomtoc AI
                        </Typography>
                        <IconButton>
                            <RemoveIcon sx={{ color: '#000', fontSize: '24px' }} />
                        </IconButton>
                    </Box>

                    {/* chat message */}
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '8px',
                            background: '#f6f6f7',
                        }}
                    >
                        {messages.map((message, index) => (
                            <Typography
                                key={index}
                                sx={{
                                    textAlign: message.type === 'user' ? 'right' : 'left',
                                    color: message.type === 'user' ? '#1976d2' : '#555',
                                    marginBottom: '8px',
                                }}
                            >
                                {message.text}
                            </Typography>
                        ))}
                    </Box>

                    {/* chat input message */}
                    <Box
                        sx={{
                            display: 'flex',
                            padding: '8px',
                            borderTop: '1px solid #ccc',
                        }}
                    >
                        <TextField
                            fullWidth
                            placeholder="Type a message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSend();
                            }}
                            sx={{ marginRight: '8px' }}
                        />
                        <Button variant="contained" color="primary" onClick={handleSend}>
                            Send
                        </Button>
                    </Box>
                </Box>
            )}
        </>
    );
}

export default Chatbot;
