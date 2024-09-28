import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Box } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { theme } from '../../Theme/Theme';
import { AdminHeadingTypography } from '../CustomizeTypography/CustomizeTypography';
import { AdminTextField } from '../TextFieldCustomize/TextFieldCustomize';

export default function AddUsers() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Send POST request to add user
        const response = await fetch(
            'https://66f50b829aa4891f2a23a097.mockapi.io/tomtoc/api/v1/users',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, address, phoneNumber }),
            },
        );

        if (response.ok) {
            alert('User added successfully!');
            navigate('/admin/manage-users');
        } else {
            alert('Failed to add user');
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
        </Box>
    );
}
