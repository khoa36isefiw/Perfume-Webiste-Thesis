import { Box, Grid, IconButton } from '@mui/material';
import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GradeIcon from '@mui/icons-material/Grade';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { AdminTypography } from '../CustomizeTypography/CustomizeTypography';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DashboardMenu from './DashboardMenu';
function Dashboard() {
    // user: linear-gradient(270deg,#4eda89,#1a9f53)
    // order: background: linear-gradient(270deg, #ed68ff, #be0ee1);
    // reviews: background: linear-gradient(270deg, #f4d02b, #e1940e);
    // product: background: linear-gradient(270deg, #64b3f6, #2b77e5);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ bgcolor: '#fff', p: 2, mt: 2 }}>
            <Grid container>
                <Grid item container spacing={4} lg={10}>
                    <Grid item lg={5}>
                        <Box
                            sx={{
                                background: 'linear-gradient(270deg,#4eda89,#1a9f53)',
                                height: '200px',
                                width: '100%',
                                borderRadius: '8px',
                                p: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box>
                                    <AdminTypography
                                        sx={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}
                                    >
                                        Total Users
                                    </AdminTypography>
                                    <AdminTypography
                                        sx={{ fontSize: 32, color: '#fff', fontWeight: 'bold' }}
                                    >
                                        277
                                    </AdminTypography>
                                    <TrendingUpIcon
                                        sx={{
                                            fontSize: '100px',
                                            padding: 0,
                                            marginTop: '-32px',
                                            // top: '50%',
                                            // left: 0,
                                            // bottom: 0,
                                            // position: 'absolute',
                                            color: '#1a9f53',
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <IconButton
                                        sx={{
                                            borderRadius: '12px',
                                            background: 'linear-gradient(#27bf68, #1a9f53)',
                                        }}
                                    >
                                        <AccountCircleIcon
                                            sx={{ fontSize: '32px', color: '#89ecb3' }}
                                        />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        flex: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexGrow: 1,
                                            // height: '50px',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                bgcolor: '#187d44',
                                                borderRadius: 1,
                                                width: '50px',
                                                height: '25px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',

                                                // height: '50px',
                                            }}
                                        >
                                            <AdminTypography
                                                sx={{
                                                    fontWeight: 'bold',
                                                    color: '#fff',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                + 95%
                                            </AdminTypography>
                                        </Box>
                                        <AdminTypography
                                            sx={{
                                                ml: 1,
                                                fontWeight: 'bold',
                                                color: '#fff',
                                            }}
                                        >
                                            Last Month
                                        </AdminTypography>
                                    </Box>
                                    {/* <IconButton sx={{ padding: 0 }} onClick={handleClick}>
                                        <MoreVertIcon sx={{ fontSize: '24px' }} />
                                    </IconButton> */}
                                    <DashboardMenu />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item lg={5}>
                        <Box
                            sx={{
                                background: 'linear-gradient(270deg, #ed68ff, #be0ee1)',
                                height: '200px',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                borderRadius: '8px',
                                p: 2,
                            }}
                        >
                            <Box>
                                <AdminTypography
                                    sx={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}
                                >
                                    Total Orders
                                </AdminTypography>
                                <AdminTypography
                                    sx={{ fontSize: 32, color: '#fff', fontWeight: 'bold' }}
                                >
                                    277
                                </AdminTypography>
                            </Box>
                            <IconButton
                                sx={{
                                    borderRadius: '12px',
                                    background: 'linear-gradient( #de2fff, #be0ee1)',
                                }}
                            >
                                <ShoppingCartIcon sx={{ fontSize: '32px', color: '#f3a0ff' }} />
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item lg={5}>
                        <Box
                            sx={{
                                background: 'linear-gradient(270deg, #64b3f6, #2b77e5)',
                                height: '200px',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                borderRadius: '8px',
                                p: 2,
                            }}
                        >
                            <Box>
                                <AdminTypography
                                    sx={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}
                                >
                                    Total Products
                                </AdminTypography>
                                <AdminTypography
                                    sx={{ fontSize: 32, color: '#fff', fontWeight: 'bold' }}
                                >
                                    277
                                </AdminTypography>
                            </Box>
                            <IconButton
                                sx={{
                                    background: 'linear-gradient(#4094f1, #2b77e5)',
                                    borderRadius: '12px',
                                }}
                            >
                                <ShoppingBagIcon sx={{ fontSize: '32px', color: '#96cefa' }} />
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item lg={5}>
                        <Box
                            sx={{
                                background: 'linear-gradient(270deg, #f4d02b, #e1940e)',
                                height: '200px',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                borderRadius: '8px',
                                p: 2,
                            }}
                        >
                            <Box>
                                <AdminTypography
                                    sx={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}
                                >
                                    Total Reviews
                                </AdminTypography>
                                <AdminTypography
                                    sx={{ fontSize: 32, color: '#fff', fontWeight: 'bold' }}
                                >
                                    277
                                </AdminTypography>
                            </Box>
                            <IconButton
                                sx={{
                                    background: 'linear-gradient(#edb213,#e1940e)',
                                    borderRadius: '12px',
                                }}
                            >
                                <GradeIcon sx={{ fontSize: '32px', color: '#f6e053' }} />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item lg={2}>
                    <Box sx={{ height: '100%', bgcolor: '#ccc' }}>ahiahai</Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Dashboard;
