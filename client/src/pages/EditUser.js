import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Avatar, IconButton, InputAdornment, Box } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AdminHeadingTypography } from '../components/CustomizeTypography/CustomizeTypography';
import { ArrowBackIos } from '@mui/icons-material';

import { theme } from '../Theme/Theme';
import { AdminTextField } from '../components/TextFieldCustomize/TextFieldCustomize';
import NotificationMessage from '../components/NotificationMessage/NotificationMessage';

export default function EditUser() {
    const navigate = useNavigate();
    const location = useLocation();
    // get the perfume data passed from navigation
    const { userData } = location.state || {};
    const { id } = useParams(); // Get the user ID from the URL
    const [user, setUser] = useState(userData);
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [image, setImage] = useState(null);
    // notification message
    const [showNotification, setShowNotification] = useState(false);
    const [showAnimation, setShowAnimation] = useState('animate__bounceInRight');
    const [messageType, setMessageType] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [messageTitle, setMessageTitle] = useState('');

    console.log('user information: ', userData);

    useEffect(() => {
        // Fetch the user data based on the ID when the component loads
        const fetchUserData = async () => {
            const response = await fetch(
                `https://66f50b829aa4891f2a23a097.mockapi.io/tomtoc/api/v1/users/${userData.id}`,
            );
            const data = await response.json();
            setUser(data);
        };

        fetchUserData();
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission (saving the updated user)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updateUser = {
            ...user,
            // use the new image if uploaded, otherwise keep the current avatar
            avatar: image !== null ? image : user.avatar,
        };

        const response = await fetch(
            `https://66f50b829aa4891f2a23a097.mockapi.io/tomtoc/api/v1/users/${user.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateUser),
            },
        );

        console.log('update usser : ', updateUser);

        if (response.ok) {
            setShowNotification(true);
            setShowAnimation('animate__bounceInRight');
            setMessageType('success');
            setMessageTitle('Update User');
            setMessageContent('Update user information successfully!');
            setTimeout(() => {
                // navigate('/admin/manage-users');
            }, 1800);
        } else {
            setShowNotification(true);
            setShowAnimation('animate__bounceInRight');
            setMessageType('error');
            setMessageTitle('Update User');
            setMessageContent('Update user failed!');
        }
    };

    const handleCloseNotification = () => {
        setShowAnimation('animate__fadeOut');
        setTimeout(() => {
            setShowNotification(false);
        }, 1000);
    };

    // Handle toggle password visibility
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        // <Paper sx={{ padding: 3, maxWidth: 600, margin: 'auto', marginTop: 5, height: '100vh' }}>
        <Box sx={{ height: '100vh', p: 2 }}>
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
                    },
                }}
            >
                List Users
            </Button>
            <AdminHeadingTypography>Edit User</AdminHeadingTypography>
            <Box component={'form'} onSubmit={handleSubmit}>
                <Avatar
                    alt={user.name}
                    src={image !== null ? image : user.avatar}
                    sx={{ width: 200, height: 200, marginBottom: 2 }}
                    onChange={handleChange}
                />
                <Button
                    variant="outlined"
                    component="label"
                    sx={{
                        marginBottom: 2,
                        textTransform: 'initial',
                        padding: '10px 14px',
                        fontSize: '13px',
                    }}
                >
                    Change Image
                    <input type="file" accept="image/*" hidden onChange={handleUploadImage} />
                </Button>
                <Box sx={{ display: 'flex', gap: 4 }}>
                    <AdminTextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <AdminTextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        margin="normal"
                    />
                </Box>
                {/* Password field with show/hide functionality */}
                <Box sx={{ display: 'flex', gap: 4 }}>
                    <AdminTextField
                        fullWidth
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'} // Toggle between text and password
                        value={user.password}
                        onChange={handleChange}
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <AdminTextField
                        fullWidth
                        label="Address"
                        name="address"
                        value={user.address}
                        onChange={handleChange}
                        margin="normal"
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 4 }}>
                    <AdminTextField
                        fullWidth
                        label="City"
                        name="address.city"
                        value={user.address.city}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <AdminTextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        margin="normal"
                    />
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{
                        marginTop: 2,
                        padding: '10px 18px',
                        fontSize: '14px',
                        textTransform: 'initial',
                        bgcolor: theme.palette.admin.bgColor,
                        '&:hover': {
                            bgcolor: theme.palette.admin.bgColor,
                        },
                    }}
                >
                    Save Changes
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
