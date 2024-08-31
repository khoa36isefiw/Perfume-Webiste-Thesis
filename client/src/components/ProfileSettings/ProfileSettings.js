import React, { useState } from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Container,
    Paper,
    createTheme,
    ThemeProvider,
    Grid,
} from '@mui/material';
import { AccountCircle, VpnKey, ExitToApp } from '@mui/icons-material';
import AccountInfo from './AccountInfo';
import ChangePassword from './ChangePassword';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import MyPurchase from './MyPurchase';

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

    const handleMenuClick = (component) => {
        setActiveComponent(component);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Container
                sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default', mt: 12 }}
            >
                <Grid container spacing={2}>
                    {/* Sidebar */}
                    <Grid item md={4} lg={3}>
                        <Paper
                            elevation={3}
                            sx={{
                                width: '100%',
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                bgcolor: 'background.paper',
                            }}
                        >
                            <CustomizeTypography
                                sx={{ mb: 0, color: 'text.primary', fontWeight: 'bold' }}
                            >
                                Profile Settings
                            </CustomizeTypography>

                            <List component="nav" sx={{ width: '100%' }}>
                                <ListItem button onClick={() => handleMenuClick('accountInfo')}>
                                    <ListItemIcon sx={{ color: 'text.primary' }}>
                                        <AccountCircle />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <CustomizeTypography sx={{ fontSize: '14px', mb: 0 }}>
                                                Account Info
                                            </CustomizeTypography>
                                        }
                                    />
                                </ListItem>

                                <ListItem button onClick={() => handleMenuClick('changePassword')}>
                                    <ListItemIcon sx={{ color: 'text.primary' }}>
                                        <VpnKey />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <CustomizeTypography sx={{ fontSize: '14px', mb: 0 }}>
                                                Change Password
                                            </CustomizeTypography>
                                        }
                                    />
                                </ListItem>
                                <ListItem button onClick={() => handleMenuClick('myPurchase')}>
                                    <ListItemIcon sx={{ color: 'text.primary' }}>
                                        <AccountCircle />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <CustomizeTypography sx={{ fontSize: '14px', mb: 0 }}>
                                                My Purchase
                                            </CustomizeTypography>
                                        }
                                    />
                                </ListItem>
                                <ListItem button onClick={() => console.log('Logout clicked')}>
                                    <ListItemIcon sx={{ color: 'text.primary' }}>
                                        <ExitToApp />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <CustomizeTypography sx={{ fontSize: '14px', mb: 0 }}>
                                                Logout
                                            </CustomizeTypography>
                                        }
                                    />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>

                    {/* Main content */}
                    <Grid container item md={8} lg={9}>
                        <Box sx={{ flexGrow: 1, p: 2, bgcolor: 'background.default' }}>
                            {activeComponent === 'accountInfo' && <AccountInfo />}
                            {activeComponent === 'changePassword' && <ChangePassword />}
                            {activeComponent === 'myPurchase' && <MyPurchase />}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default ProfileSettings;
