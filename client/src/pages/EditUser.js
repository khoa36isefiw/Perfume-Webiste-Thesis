import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Paper, Avatar, IconButton, InputAdornment, Box } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AdminHeadingTypography } from '../components/CustomizeTypography/CustomizeTypography';
import { ArrowBackIos } from '@mui/icons-material';

import { theme } from '../Theme/Theme';
import { AdminTextField } from '../components/TextFieldCustomize/TextFieldCustomize';

export default function EditUser() {
    const navigate = useNavigate();
    const location = useLocation();
    // get the perfume data passed from navigation
    const { userData } = location.state || {};
    const { id } = useParams(); // Get the user ID from the URL
    const [user, setUser] = useState(userData);
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

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
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // Handle form submission (saving the updated user)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(
            `https://66f50b829aa4891f2a23a097.mockapi.io/tomtoc/api/v1/users/${user.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            },
        );
        if (response.ok) {
            alert('User updated successfully!');
            setTimeout(() => {
                navigate('/admin/manage-users');
            }, 200);
        }
    };

    // Handle toggle password visibility
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
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
                    src={user.avatar}
                    sx={{ width: 128, height: 128, marginBottom: 2 }}
                />
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
        </Box>
    );
}
