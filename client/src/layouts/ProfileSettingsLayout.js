import React from 'react';
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
import { useSelector } from 'react-redux';
import EmptyOrders from '../components/EmptyOrders/EmptyOrders';

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
    console.log('location: ', location.pathname);
    const loggedInAccount = useSelector((state) => state.accountManagement.loggedInAccount);
    const orderHistory = useSelector(
        // get for each user
        (state) => state.checkoutManagement.listOrders[loggedInAccount?.userId] || [],
    );
    return (
        <Box sx={{ minHeight: '100vh', width: '100vw', bgcolor: '#000' }}>
            {/* pre-defined layout */}
            <NewHeader />
            {/* any components call this layout */}
            {location.pathname === '/my-purchase' && orderHistory.length === 0 ? (
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

                            <ListItem button onClick={() => navigate('/change-password')}>
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
                            <ListItem button onClick={() => navigate('/my-purchase')}>
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
                <Grid container item xs={12} sm={8} md={8} lg={9}>
                    <Box sx={{ flexGrow: 1, bgcolor: 'background.default' }}>{children}</Box>
                </Grid>
            </Grid>
        </Container>
    );
};
