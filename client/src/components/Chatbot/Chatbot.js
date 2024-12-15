import React, { useState } from 'react';
import { Avatar, Box, TextField, Button, Typography, IconButton } from '@mui/material';
import ChatbotImage from '../../assets/images/chatbot.png';
import { mobileScreen, theme } from '../../Theme/Theme';
import RemoveIcon from '@mui/icons-material/Remove';
import SendIcon from '@mui/icons-material/Send';

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
                        mb: 1,
                        bottom: '200px',
                        right: '60px',
                        width: '300px',
                        height: '450px',
                        border: '1px solid #ccc',
                        borderRadius: 2,
                        backgroundColor: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        zIndex: 9999,
                        [mobileScreen]: {
                            right: '30px',
                            width: '260px',
                        },
                        filter: 'drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.2))',
                    }}
                >
                    {/* chat header */}
                    <Box
                        sx={{
                            backgroundColor: '#ffffff',
                            color: '#000',
                            padding: '4px',
                            borderRadius: 1,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            borderBottom: '1px solid #ccc',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '15px',
                                flex: 1,
                                fontWeight: 'bold',
                            }}
                        >
                            Chat with Tomtoc AI
                        </Typography>
                        <IconButton>
                            <RemoveIcon
                                sx={{
                                    color: '#000',
                                    fontSize: '28px',
                                    '&:hover': {
                                        color: theme.palette.text.secondary,
                                    },
                                }}
                            />
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
                        {messages.map((message, index) => {
                            return (
                                <Typography
                                    key={index}
                                    sx={{
                                        textAlign: message.type === 'user' ? 'right' : 'left',
                                        color: message.type === 'user' ? '#1976d2' : '#555',
                                        marginBottom: '8px',
                                        fontSize: '13.5px',
                                    }}
                                >
                                    {message.text}
                                </Typography>
                            );
                        })}
                    </Box>

                    {/* chat input message */}
                    <Box
                        sx={{
                            display: 'flex',
                            padding: '8px',
                            background: '#f6f6f7',
                            borderRadius: 1,
                        }}
                    >
                        <TextField
                            fullWidth
                            placeholder="Type a message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    // Prevent default form submission
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            sx={{
                                marginRight: '8px',

                                // config style of textfield
                                '.MuiInputBase-root': {
                                    fontSize: '14px',
                                    height: '40px',
                                    borderRadius: 4,
                                    [mobileScreen]: {
                                        width: '250px',
                                    },
                                },

                                // config focus of textfield
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        border: '1px solid #ccc',
                                        borderColor: '#333',
                                    },
                                    '&:hover fieldset': {
                                        border: '1px solid #ccc',
                                        borderColor: '#333',
                                    },
                                    '&.Mui-focused fieldset': {
                                        border: '1px solid #ccc',
                                        borderColor: '#333',
                                    },
                                },
                            }}
                        />
                        <Button
                            variant="text"
                            color="primary"
                            onClick={handleSend}
                            sx={{
                                fontSize: '13px',
                                textTransform: 'capitalize',
                                '&:hover': {
                                    bgcolor: 'transparent',
                                },
                            }}
                            endIcon={<SendIcon />}
                        >
                            Send
                        </Button>
                    </Box>
                </Box>
            )}
        </>
    );
}

export default Chatbot;
