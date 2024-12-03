import { Box, Grid, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GradeIcon from '@mui/icons-material/Grade';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { AdminTypography } from '../CustomizeTypography/CustomizeTypography';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

import DashboardMenu from './DashboardMenu';
import TopSales from './AdminLineChart';
import AdminBestSellingProducts from './AdminRecentAdded';
import RecentTransactions from './RecentTransactions';
import TopProductsSale from './TopProductsSale';
import useUsers from '../../api/useUsers';

const cardData = [
    {
        title: 'Total Users',
        value: 277,
        gradient: 'linear-gradient(270deg,#4eda89,#1a9f53)',
        icon: <AccountCircleIcon sx={{ fontSize: '32px', color: '#89ecb3' }} />,
        percentage: 95,
        percentageBg: '#187d44',
        trendingColor: '#1a9f53',
        moreIconColor: '#187d44',
        gradientIconColor: 'linear-gradient(#27bf68, #1a9f53)',
    },
    {
        title: 'Total Orders',
        value: 277,
        gradient: 'linear-gradient(270deg, #ed68ff, #be0ee1)',
        icon: <ShoppingCartIcon sx={{ fontSize: '32px', color: '#f3a0ff' }} />,
        percentage: 30,
        percentageBg: '#af0ac4',
        trendingColor: '#be0ee1',
        moreIconColor: '#a808c3',
        gradientIconColor: 'linear-gradient( #de2fff, #be0ee1)',
    },
    {
        title: 'Total Products',
        value: 277,
        gradient: 'linear-gradient(270deg, #64b3f6, #2b77e5)',
        icon: <ShoppingBagIcon sx={{ fontSize: '32px', color: '#96cefa' }} />,
        percentage: 25,
        percentageBg: '#2b77e5',
        trendingColor: '#2b77e5',
        moreIconColor: '#2262d3',
        gradientIconColor: 'linear-gradient(#4094f1, #2b77e5)',
    },
    {
        title: 'Total Reviews',
        value: 277,
        gradient: 'linear-gradient(270deg, #f4d02b, #e1940e)',
        icon: <GradeIcon sx={{ fontSize: '32px', color: '#f6e053' }} />,
        percentage: 45,
        percentageBg: '#e1940e',
        trendingColor: '#e1940e',
        moreIconColor: '#ae640f',
        gradientIconColor: 'linear-gradient(#edb213,#e1940e)',
    },
];

function Dashboard() {
    const { data: usersData, isLoading } = useUsers();
    const [userCounts, setUserCounts] = useState({});
    const [dailyChange, setDailyChange] = useState({ today: 0, yesterday: 0, percentageChange: 0 });
    useEffect(() => {
        if (usersData) {
            const counts = usersData?.data?.reduce((acc, user) => {
                const createdAtDate = new Date(user.createdAt).toISOString().split('T')[0]; // Extract date only
                if (acc[createdAtDate]) {
                    acc[createdAtDate]++;
                } else {
                    acc[createdAtDate] = 1;
                }
                return acc;
            }, {});
            setUserCounts(counts);

            // Calculate today's and yesterday's counts
            const todayDate = new Date().toISOString().split('T')[0];
            const yesterdayDate = new Date(Date.now() - 86400000).toISOString().split('T')[0]; // 86400000ms = 1 day

            const todayCount = counts[todayDate] || 0;
            const yesterdayCount = counts[yesterdayDate] || 0;
            const percentageChange = yesterdayCount
                ? ((todayCount - yesterdayCount) / yesterdayCount) * 100
                : 0;

            console.log('percentageChange: ', percentageChange);
            setDailyChange({
                today: todayCount,
                yesterday: yesterdayCount,
                percentageChange: percentageChange.toFixed(2),
            });
        }
    }, [usersData?.data]);

    console.log('userCounts: ', userCounts);
    console.log('dailyChange: ', dailyChange);

    if (!usersData) return <div>Loading...</div>;
    return (
        <Box sx={{ p: 2, mt: 2 }}>
            <Grid container spacing={4}>
                {cardData.map((card, index) => (
                    <Grid item lg={6} key={index}>
                        <Box
                            sx={{
                                background: card.gradient,
                                height: '200px',
                                width: '100%',
                                borderRadius: '8px',
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
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
                                        {card.title}
                                    </AdminTypography>
                                    <AdminTypography
                                        sx={{ fontSize: 32, color: '#fff', fontWeight: 'bold' }}
                                    >
                                        {card.value}
                                    </AdminTypography>
                                    {card.percentage > 40 ? (
                                        <TrendingUpIcon
                                            sx={{
                                                fontSize: '100px',
                                                padding: 0,
                                                marginTop: '-32px',
                                                // top: '50%',
                                                // left: 0,
                                                // bottom: 0,
                                                // position: 'absolute',
                                                color: card.trendingColor,
                                            }}
                                        />
                                    ) : (
                                        <TrendingDownIcon
                                            sx={{
                                                fontSize: '100px',
                                                padding: 0,
                                                marginTop: '-32px',
                                                // top: '50%',
                                                // left: 0,
                                                // bottom: 0,
                                                // position: 'absolute',
                                                color: card.trendingColor,
                                            }}
                                        />
                                    )}
                                </Box>
                                <IconButton
                                    sx={{
                                        borderRadius: '12px',
                                        // background: '#fff', // White background for the circle
                                        background: card.gradientIconColor,
                                        padding: '12px',
                                    }}
                                >
                                    {card.icon}
                                </IconButton>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            bgcolor: card.percentageBg,
                                            borderRadius: 1,
                                            width: '50px',
                                            height: '25px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <AdminTypography
                                            sx={{
                                                fontWeight: 'bold',
                                                color: '#fff',
                                                textAlign: 'center',
                                            }}
                                        >
                                            + {card.percentage}%
                                        </AdminTypography>
                                    </Box>
                                    <AdminTypography
                                        sx={{ ml: 1, fontWeight: 'bold', color: '#fff' }}
                                    >
                                        Last Month
                                    </AdminTypography>
                                </Box>
                                <DashboardMenu color={card.moreIconColor} />
                            </Box>
                        </Box>
                    </Grid>
                ))}
                <Grid item lg={12}>
                    <TopSales />
                </Grid>
                <Grid item lg={12}>
                    <AdminBestSellingProducts />
                </Grid>

                <Grid item container spacing={4} lg={12}>
                    <Grid item lg={6}>
                        <RecentTransactions />
                    </Grid>
                    <Grid item lg={6}>
                        <TopProductsSale />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
export default Dashboard;
