import React, { useEffect, useState } from 'react';
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
    Divider,
} from '@mui/material';
import { AccountCircle, VpnKey, ExitToApp } from '@mui/icons-material';
import { CustomizeTypography } from '../components/CustomizeTypography/CustomizeTypography';
import NewHeader from '../components/Header/NewHeader';
import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../Theme/Theme';
import BackToTop from '../components/ScrollTop/ScrollTop';
import Footer from '../components/Footer/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import EmptyOrders from '../components/EmptyOrders/EmptyOrders';
import useOrderByUser from '../api/useOrderByUser';
import { authAPI } from '../api/authAPI';

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

function ProfileSettingsLayout({ children }) {
    const location = useLocation();
    const navigate = useNavigate();

    const userData = JSON.parse(window.localStorage.getItem('user_data')) || null;

    useEffect(() => {
        if (userData === null) {
            navigate('/');
        }
    }, [userData]);

    const { data: orders, isLoading, error } = useOrderByUser(userData?.userId);
    console.log('data: ', orders?.data);

    return (
        <Box sx={{ minHeight: '100vh', width: '100vw', bgcolor: '#000' }}>
            {/* pre-defined layout */}
            <NewHeader />
            {/* any components call this layout */}
            {location.pathname === '/my-purchase' && orders?.data?.length === 0 ? (
                <EmptyOrders />
            ) : (
                <ThemeProvider theme={darkTheme}>
                    <Layout children={children} />
                </ThemeProvider>
            )}

            <Divider sx={{ p: '2px', bgcolor: theme.palette.text.secondary, my: 10 }} />
            <BackToTop />
            <Footer />
        </Box>
    );
}

export default ProfileSettingsLayout;

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const userData = JSON.parse(localStorage.getItem('user_data')) || null;
    console.log('current location: ', location.pathname);
    const [activeButton, setActiveButton] = useState(null);
    // define logic for header location, when reload the page
    useEffect(() => {
        const currentPath = location.pathname; // get the current location path
        // check, if the current Path is the same as header.header Link
        setActiveButton(currentPath ? currentPath : null);
    }, [location.pathname]);

    const handleLogOut = async () => {
        try {
            const logout = await authAPI.logout(userData.email);

            if (logout) {
                window.localStorage.removeItem('user_data');

                console.log('Logged out successfully');

                // dispatch(logoutAccount());

                navigate('/sign-in');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('An error occurred during logout:', error);
        }
    };
    return (
        <Container
            sx={{
                display: 'flex',
                minHeight: '100vh',
                bgcolor: 'background.default',
                mt: 20,
                [ipadProScreen]: {
                    width: '90%',
                    mt: 15,
                },
                [tabletScreen]: {
                    // width: '80%',
                    width: '100%',
                    mt: 20,
                },
                [mobileScreen]: {
                    width: '100%',
                    mt: 16,
                },
            }}
        >
            <Grid container spacing={2}>
                {/* Sidebar */}
                <Grid item xs={12} sm={4} md={4} lg={3}>
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
                            sx={{
                                mb: 0,
                                color: 'text.primary',
                                fontWeight: 'bold',
                            }}
                        >
                            Profile Settings
                        </CustomizeTypography>

                        <List component="nav" sx={{ width: '100%' }}>
                            <ListItem button onClick={() => navigate('/profile-settings')}>
                                <ListItemIcon sx={{ color: 'text.primary' }}>
                                    <AccountCircle
                                        sx={{
                                            color:
                                                activeButton === '/profile-settings'
                                                    ? theme.palette.text.secondary
                                                    : '#fff',
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <CustomizeTypography
                                            sx={{
                                                fontSize: '14px',
                                                mb: 0,
                                                color:
                                                    activeButton === '/profile-settings'
                                                        ? theme.palette.text.secondary
                                                        : '#fff',
                                                fontWeight:
                                                    activeButton === '/profile-settings'
                                                        ? 'bold'
                                                        : null,
                                            }}
                                        >
                                            Account Info
                                        </CustomizeTypography>
                                    }
                                />
                            </ListItem>

                            <ListItem button onClick={() => navigate('/change-password')}>
                                <ListItemIcon sx={{ color: 'text.primary' }}>
                                    <VpnKey
                                        sx={{
                                            color:
                                                activeButton === '/change-password'
                                                    ? theme.palette.text.secondary
                                                    : '#fff',
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <CustomizeTypography
                                            sx={{
                                                fontSize: '14px',
                                                mb: 0,
                                                color:
                                                    activeButton === '/change-password'
                                                        ? theme.palette.text.secondary
                                                        : '#fff',
                                                fontWeight:
                                                    activeButton === '/change-password'
                                                        ? 'bold'
                                                        : null,
                                            }}
                                        >
                                            Change Password
                                        </CustomizeTypography>
                                    }
                                />
                            </ListItem>
                            <ListItem button onClick={() => navigate('/my-purchase')}>
                                <ListItemIcon sx={{ color: 'text.primary' }}>
                                    <AccountCircle
                                        sx={{
                                            color:
                                                activeButton === '/my-purchase'
                                                    ? theme.palette.text.secondary
                                                    : '#fff',
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <CustomizeTypography
                                            sx={{
                                                fontSize: '14px',
                                                mb: 0,
                                                color:
                                                    activeButton === '/my-purchase'
                                                        ? theme.palette.text.secondary
                                                        : '#fff',
                                                fontWeight:
                                                    activeButton === '/my-purchase' ? 'bold' : null,
                                            }}
                                        >
                                            My Purchase
                                        </CustomizeTypography>
                                    }
                                />
                            </ListItem>
                            <ListItem button onClick={handleLogOut}>
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
                <Grid container item xs={12} sm={8} md={8} lg={9}>
                    <Box sx={{ flexGrow: 1, bgcolor: 'background.default' }}>{children}</Box>
                </Grid>
            </Grid>
        </Container>
    );
};
