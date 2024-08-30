import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    InputAdornment,
    Container,
    Paper,
    createTheme,
    ThemeProvider,
    Grid,
} from '@mui/material';
import {
    AccountCircle,
    Edit,
    VpnKey,
    ExitToApp,
    Visibility,
    VisibilityOff,
} from '@mui/icons-material';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import AccountInfo from './AccountInfo';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        background: {
            paper: '#1e1e1e',
            default: '#121212',
        },
        text: {
            primary: '#ffffff',
            secondary: '#bbbbbb',
        },
    },
});

const ProfileSettings = () => {
    const [activeComponent, setActiveComponent] = useState('accountInfo');
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

    const handleMenuClick = (component) => {
        setActiveComponent(component);
    };

    const EditAccount = () => (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Edit Account
            </Typography>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="hisalim.ux@gmail.com"
                margin="normal"
            />
            <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                defaultValue="Muhammad"
                margin="normal"
            />
            <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                defaultValue="Salim"
                margin="normal"
            />
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Update
            </Button>
        </Box>
    );

    const ChangePassword = () => (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Change Password
            </Typography>
            <TextField
                fullWidth
                label="Current Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                margin="normal"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                fullWidth
                label="New Password"
                type={showNewPassword ? 'text' : 'password'}
                variant="outlined"
                margin="normal"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleClickShowNewPassword} edge="end">
                                {showNewPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                fullWidth
                label="Confirm New Password"
                type={showNewPassword ? 'text' : 'password'}
                variant="outlined"
                margin="normal"
            />
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Change Password
            </Button>
        </Box>
    );

    return (
        <ThemeProvider theme={darkTheme}>
            <Container
                sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default', mt: 12 }}
            >
                <Grid container spacing={0}>
                    {/* Sidebar */}
                    <Grid item md={4} lg={4}>
                        <Paper
                            elevation={3}
                            sx={{
                                width: 240,
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                bgcolor: 'background.paper',
                            }}
                        >
                            <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
                                Profile Settings
                            </Typography>

                            <List component="nav" sx={{ width: '100%' }}>
                                <ListItem button onClick={() => handleMenuClick('accountInfo')}>
                                    <ListItemIcon sx={{ color: 'text.primary' }}>
                                        <AccountCircle />
                                    </ListItemIcon>
                                    <ListItemText primary="Account Info" />
                                </ListItem>
                                <ListItem button onClick={() => handleMenuClick('editAccount')}>
                                    <ListItemIcon sx={{ color: 'text.primary' }}>
                                        <Edit />
                                    </ListItemIcon>
                                    <ListItemText primary="Edit Account" />
                                </ListItem>
                                <ListItem button onClick={() => handleMenuClick('changePassword')}>
                                    <ListItemIcon sx={{ color: 'text.primary' }}>
                                        <VpnKey />
                                    </ListItemIcon>
                                    <ListItemText primary="Change Password" />
                                </ListItem>
                                <ListItem button onClick={() => handleMenuClick('accountInfo')}>
                                    <ListItemIcon sx={{ color: 'text.primary' }}>
                                        <AccountCircle />
                                    </ListItemIcon>
                                    <ListItemText primary="My Purchase" />
                                </ListItem>
                                <ListItem button onClick={() => console.log('Logout clicked')}>
                                    <ListItemIcon sx={{ color: 'text.primary' }}>
                                        <ExitToApp />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>

                    {/* Main content */}
                    <Grid container item md={8} lg={8}>
                        <Box sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default' }}>
                            {activeComponent === 'accountInfo' && <AccountInfo />}
                            {activeComponent === 'editAccount' && <EditAccount />}
                            {activeComponent === 'changePassword' && <ChangePassword />}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default ProfileSettings;
