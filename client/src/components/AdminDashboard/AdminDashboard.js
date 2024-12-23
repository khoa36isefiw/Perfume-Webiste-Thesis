import { Box, Grid, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GradeIcon from '@mui/icons-material/Grade';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { AdminTypography } from '../CustomizeTypography/CustomizeTypography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
import { mobileScreen } from '../../Theme/Theme';
import RestoreIcon from '@mui/icons-material/Restore';
import { adminAPI } from '../../api/adminAPI';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TopSales from './AdminLineChart';
import RecentTransactions from './RecentTransactions';
import TopProductsSale from './TopProductsSale';
import AdminRecentAddedV2 from './AdminRecentAddedV2';

const cardData = [
    {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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

const filterDate = ['Last Day', 'Last Week', 'Last Month'];

function AdminDashboard() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [listData, setListData] = useState(
        JSON.parse(localStorage.getItem('dashboard_statistics')) || {},
    );
    const [defaultValue, setDefaultValue] = useState({}); // Set default value as 'Last Day'
    const [selectedCardId, setSelectedCardId] = useState(null);

    // console.log('defaultValue: ', defaultValue);
    const open = Boolean(anchorEl);
    console.log('listData: ', listData);
    useEffect(() => {
        // console.log('at here, chạy vô đây');
        const fetchData = async () => {
            const userData = await adminAPI.getStatisticUser('day');
            const productData = await adminAPI.getStatisticOrder('day');
            const orderData = await adminAPI.getStatisticProduct('day');
            const reviewData = await adminAPI.getStatisticReview('day');
            setDefaultValue({
                1: {
                    timeFrame: 'day',
                    value: userData.data,
                    whichDashboard: 'Total Reviews',
                },
                2: {
                    timeFrame: 'day',
                    value: productData.data,
                    whichDashboard: 'Total Reviews',
                },
                3: {
                    timeFrame: 'day',
                    value: orderData.data,
                    whichDashboard: 'Total Reviews',
                },
                4: {
                    timeFrame: 'day',
                    value: reviewData.data,
                    whichDashboard: 'Total Reviews',
                },
            });
        };
        fetchData();
    }, []);

    const handleClick = (event, cardId) => {
        setAnchorEl(event.currentTarget); // Hiển thị menu (nếu có)
        setSelectedCardId(cardId); // Lưu id của card đã click
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelectStatistics = async (date) => {
        try {
            const timeframeMap = {
                'Last Month': 'month',
                'Last Day': 'day',
                'Last Week': 'week',
            };
            const which = {
                1: 'Total Users',
                2: 'Total Products',
                3: 'Total Orders',
                4: 'Total Reviews',
            };
            const timeFrame = timeframeMap[date] || 'day';
            const getPath =
                selectedCardId === 1
                    ? 'user'
                    : selectedCardId === 2
                    ? 'product'
                    : selectedCardId === 3
                    ? 'order'
                    : selectedCardId === 4
                    ? 'review'
                    : null;
            const statisticsResponse = await adminAPI.getStatitics(getPath, timeFrame);

            if (statisticsResponse.status === 200) {
                // console.log('Statistics Response:', statisticsResponse);

                // create object to save to local storage
                const updatedData = {
                    ...listData,
                    [selectedCardId]: {
                        timeFrame,
                        value: statisticsResponse.data,
                        whichDashboard: which[selectedCardId],
                    },
                };

                setListData(updatedData);

                localStorage.setItem('dashboard_statistics', JSON.stringify(updatedData));

                // console.log('Updated Data:', updatedData);
            } else {
                console.error('Failed to fetch statistics');
            }
        } catch (error) {
            console.error('Error fetching statistics:', error);
        } finally {
            setAnchorEl(null);
        }
    };

    return (
        <Box
            sx={{
                p: 2,
                mt: 2,
                [mobileScreen]: {
                    padding: 0,
                },
            }}
        >
            <Grid container spacing={4}>
                {cardData.map((card, index) => (
                    <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
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
                                        {listData && listData[card.id]?.value
                                            ? listData[card.id].value
                                            : defaultValue[card.id]?.value}
                                    </AdminTypography>
                                    {card.percentage > 40 ? (
                                        <TrendingUpIcon
                                            sx={{
                                                fontSize: '100px',
                                                padding: 0,
                                                marginTop: '-32px',
                                                color: card.trendingColor,
                                            }}
                                        />
                                    ) : (
                                        <TrendingDownIcon
                                            sx={{
                                                fontSize: '100px',
                                                padding: 0,
                                                marginTop: '-32px',
                                                color: card.trendingColor,
                                            }}
                                        />
                                    )}
                                </Box>
                                <IconButton
                                    sx={{
                                        borderRadius: '12px',
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
                                            minWidth: '50px',
                                            p: 1,
                                            boxShadow: '4px 4px 5px 2px rgba(0, 0, 255, .2)',
                                            height: '25px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <AdminTypography
                                            sx={{
                                                ml: 1,
                                                fontWeight: 'bold',
                                                color: '#fff',
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            Last{' '}
                                            {listData && listData[card.id]?.timeFrame
                                                ? listData[card.id]?.timeFrame
                                                : defaultValue[card.id]?.timeFrame}
                                        </AdminTypography>
                                    </Box>
                                </Box>
                                <React.Fragment>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Tooltip
                                            title={
                                                <AdminTypography sx={{ fontSize: '13px', mb: 0 }}>
                                                    Filter By Day
                                                </AdminTypography>
                                            }
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    '&:hover': {
                                                        cursor: 'pointer',
                                                    },
                                                }}
                                                key={card.id}
                                                onClick={(event) => handleClick(event, card.id)}
                                            >
                                                <MoreVertIcon
                                                    size="small"
                                                    sx={{
                                                        fontSize: '24px',
                                                        color: card.moreIconColor,
                                                    }}
                                                />
                                            </Box>
                                        </Tooltip>
                                    </Box>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="filter-by-day-menu"
                                        sx={{
                                            '& .MuiPaper-root': {
                                                bgcolor: 'white',
                                                minWidth: '100px',
                                                filter: 'drop-shadow(0px 1px 4px rgba(0,0,0,0.02))',
                                                mt: 1.5,
                                                '&::before': {
                                                    content: '""',
                                                    bgcolor: 'white',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                    >
                                        {filterDate.map((date, index) => (
                                            <MenuItem
                                                key={index}
                                                onClick={() => handleSelectStatistics(date)}
                                                sx={{
                                                    mx: '2px',
                                                    '&:hover': {
                                                        color: 'text.primary',
                                                        bgcolor: '#d9d9d9',
                                                        borderRadius: 2,
                                                    },
                                                }}
                                            >
                                                <Box sx={{ display: 'flex' }}>
                                                    <ListItemIcon>
                                                        <RestoreIcon fontSize="large" />
                                                    </ListItemIcon>
                                                    <AdminTypography
                                                        sx={{ mb: 0, fontSize: '14px' }}
                                                    >
                                                        {date}
                                                    </AdminTypography>
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </React.Fragment>
                            </Box>
                        </Box>
                    </Grid>
                ))}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TopSales />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <AdminRecentAddedV2 />
                </Grid>

                <Grid item container spacing={4} lg={12}>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <RecentTransactions />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <TopProductsSale />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AdminDashboard;
