import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Box, Avatar } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { theme } from '../../Theme/Theme';
import { AdminHeadingTypography } from '../CustomizeTypography/CustomizeTypography';
import { AdminTextField } from '../TextFieldCustomize/TextFieldCustomize';
import NotificationMessage from '../NotificationMessage/NotificationMessage';

export default function AddUsers() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [showAnimation, setShowAnimation] = useState('animate__bounceInRight');
    const [messageType, setMessageType] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [messageTitle, setMessageTitle] = useState('');

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const userInfor = { avatar: image, name, email, password, address, phoneNumber };

        // Send POST request to add user
        const response = await fetch(
            'https://66f50b829aa4891f2a23a097.mockapi.io/tomtoc/api/v1/users',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    avatar: image,
                    name,
                    email,
                    password,
                    address,
                    phoneNumber,
                }),
            },
        );

        if (response.ok) {
            alert('User added successfully!');
            setShowNotification(true);
            setShowAnimation('animate__bounceInRight');
            setMessageType('success');
            setMessageTitle('Add New User');
            setMessageContent('Add new user successfully!');
            setTimeout(() => {
                navigate('/admin/manage-users');
            }, 2800);
        } else {
            alert('Failed to add user');
            setShowNotification(true);
            setShowAnimation('animate__bounceInRight');
            setMessageType('error');
            setMessageTitle('Add New User');
            setMessageContent('Add new user failed!');
        }
    };

    const handleCloseNotification = () => {
        setShowAnimation('animate__fadeOut');
        setTimeout(() => {
            setShowNotification(false);
        }, 1000);
    };

    // file input for image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <Box sx={{ p: 4, height: '100vh' }}>
            <Button
                startIcon={<ArrowBackIos />}
                onClick={() => window.history.back(-1)}
                sx={{
                    // bgcolor: theme.palette.admin.bgColor,
                    color: 'black',
                    fontSize: '14px',
                    textTransform: 'initial',
                    fontWeight: 'bold',
                    '&:hover': {
                        bgcolor: 'transparent',
                        color: theme.palette.admin.bgColor,
                    },
                }}
            >
                List Users
            </Button>
            <AdminHeadingTypography>Add User</AdminHeadingTypography>
            <Box component={'form'} onSubmit={handleSubmit}>
                {/* Product Image Upload */}
                <Avatar
                    alt="Product Image"
                    src={image || 'https://via.placeholder.com/256'} // Default placeholder if no image
                    sx={{ width: 256, height: 256, marginBottom: 2, borderRadius: 0 }}
                />
                <Button
                    variant="outlined"
                    component="label"
                    sx={{
                        marginBottom: 2,
                        textTransform: 'initial',
                        padding: '10px 18px',
                        fontSize: '13px',
                    }}
                >
                    Upload Image
                    <input type="file" accept="image/*" hidden onChange={handleImageChange} />
                </Button>
                <Box sx={{ display: 'flex', gap: 4 }}>
                    <AdminTextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{
                            mb: 2,
                            '.MuiInputBase-root': {
                                height: '50px',
                            },
                        }}
                    />
                    <AdminTextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            mb: 2,
                            '.MuiInputBase-root': {
                                height: '50px',
                            },
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', gap: 4 }}>
                    <AdminTextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                            mb: 2,
                            '.MuiInputBase-root': {
                                height: '50px',
                            },
                        }}
                    />
                    <AdminTextField
                        fullWidth
                        label="Address"
                        variant="outlined"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        sx={{
                            mb: 2,
                            '.MuiInputBase-root': {
                                height: '50px',
                            },
                        }}
                    />
                </Box>

                <AdminTextField
                    fullWidth
                    label="Phone Number"
                    variant="outlined"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    sx={{
                        mb: 2,
                        '.MuiInputBase-root': {
                            height: '50px',
                        },
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                        marginTop: 2,
                        padding: '10px 18px',
                        fontSize: '14px',
                        textTransform: 'initial',
                        borderRadius: 2,
                        bgcolor: theme.palette.admin.bgColor,
                        '&:hover': {
                            bgcolor: theme.palette.admin.bgColor,
                        },
                    }}
                >
                    Add User
                </Button>
            </Box>
            {showNotification && (
                <Box
                    sx={{ position: 'fixed', top: '5%', right: '1%', zIndex: 9999999 }}
                    className={`animate__animated ${showAnimation}`}
                >
                    <NotificationMessage
                        msgType={messageType}
                        msgTitle={messageTitle}
                        msgContent={messageContent}
                        autoHideDuration={3000} // Auto-hide after 5 seconds
                        onClose={handleCloseNotification}
                    />
                </Box>
            )}
        </Box>
    );
}
