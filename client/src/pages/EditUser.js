import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Paper, Avatar, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function EditUser() {
    const { id } = useParams(); // Get the user ID from the URL
    const [user, setUser] = useState(null);
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    useEffect(() => {
        // Fetch the user data based on the ID when the component loads
        const fetchUserData = async () => {
            const response = await fetch(
                `https://66f50b829aa4891f2a23a097.mockapi.io/tomtoc/api/v1/users/${id}`,
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
            `https://66f50b829aa4891f2a23a097.mockapi.io/tomtoc/api/v1/users/${id}`,
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
        }
    };

    // Handle toggle password visibility
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    if (!user) return <div>Loading...</div>;

    return (
        <Paper sx={{ padding: 3, maxWidth: 600, margin: 'auto', marginTop: 5 }}>
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <Avatar
                    alt={user.name}
                    src={user.avatar}
                    sx={{ width: 100, height: 100, marginBottom: 2 }}
                />
                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    margin="normal"
                />

                {/* Password field with show/hide functionality */}
                <TextField
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
                <TextField
                    fullWidth
                    label="Street"
                    name="address.street"
                    value={user.address.street}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="City"
                    name="address.city"
                    value={user.address.city}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{ marginTop: 2 }}
                >
                    Save Changes
                </Button>
            </form>
        </Paper>
    );
}
