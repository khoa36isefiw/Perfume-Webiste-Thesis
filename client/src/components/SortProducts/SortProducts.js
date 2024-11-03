import React from 'react';
import {
    Box,
    Button,
    Container,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { theme } from '../../Theme/Theme';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { useLocation, useNavigate } from 'react-router-dom';

const filterPriceLists = [
    {
        priceText: 'Low to High',
        priceSubtitle: 'See all products, with price from low to high',
        priceIcon: <AttachMoneyIcon sx={{ fontSize: '24px', color: '#333' }} />,
    },
    {
        priceText: 'High to Low',
        priceSubtitle: 'See all products, with price from high to low',
        priceIcon: <AttachMoneyIcon sx={{ fontSize: '24px', color: '#333' }} />,
    },
];

function SortProducts({ listData, sortingSelected, setSortingSelected }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [getFilterPrice, setGetFilterPrice] = React.useState(null);
    // Default to the first item
    const [selectedOptionFilter, setSelectedOptionFilter] = React.useState('Price');
    // console.log('list data in sort: ', listData);

    const openSortMenu = Boolean(getFilterPrice);

    const handleSortMenuClick = (event) => {
        setGetFilterPrice(event.currentTarget);
    };

    const handleSortMenuClose = () => {
        setGetFilterPrice(null);
    };

    const handleGetFilterPrice = (item) => {
        //  this list to avoid mutating original data
        // let sortedList = [...listData];
        // if (item === 'Low to High') {
        //     sortedList = sortedList.sort((a, b) => a.perfumePriceVND - b.perfumePriceVND);
        // } else {
        //     sortedList = sortedList.sort((a, b) => b.perfumePriceVND - a.perfumePriceVND);
        // }
        setSelectedOptionFilter(item);
        setSortingSelected(item);

        setGetFilterPrice(null); // close menu

        const currentQueryParams = new URLSearchParams(location.search); // get the current search params
        currentQueryParams.set('sorting', item);
        navigate(`/shop?${currentQueryParams.toString()}`);
    };

    return (
        <Box
            sx={{
                width: '100%',
                p: '12px',
                bgcolor: theme.palette.background.main,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                my: theme.spacingAxis.boxVerticalAxis,
                // justifyContent: 'space-between',
            }}
        >
            <CustomizeTypography
                sx={{ color: theme.palette.normalText, fontWeight: 'bold', mb: 0 }}
            >
                Sort by
            </CustomizeTypography>
            <Button
                disableTouchRipple
                endIcon={<ArrowDropDownIcon sx={{ color: theme.palette.headerTextColor }} />}
                sx={{
                    textTransform: 'initial',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: theme.palette.text.secondary,
                    '&:hover': {
                        backgroundColor: 'transparent',
                    },
                }}
                onClick={handleSortMenuClick}
            >
                {selectedOptionFilter}
            </Button>
            <Menu
                anchorEl={getFilterPrice}
                open={openSortMenu}
                onClose={handleSortMenuClose}
                sx={{
                    '.MuiList-root': { p: 0 },
                    '.MuiPaper-rounded': { borderRadius: '12px' },
                    '.MuiPaper-root': {
                        // boxShadow: '2px 4px 4px #b3b3b3',
                        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.75)',
                    },
                }}
            >
                {filterPriceLists.map((filterPrice, index) => (
                    <MenuItem
                        onClick={() => handleGetFilterPrice(filterPrice.priceText)}
                        key={index}
                        sx={{ display: 'flex', alignItems: 'flex-start' }}
                    >
                        {/* <Box > */}
                        <ListItemIcon>{filterPrice.priceIcon}</ListItemIcon>
                        <ListItemText
                            sx={{
                                p: 0,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                    color: theme.palette.headerTextColor,
                                    fontWeight: 'bold',
                                }}
                            >
                                {filterPrice.priceText}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '13px',
                                    color: theme.palette.headerTextColor,
                                    width: '200px',
                                    overflow: 'hidden',
                                    whiteSpace: 'wrap',
                                }}
                            >
                                {filterPrice.priceSubtitle}
                            </Typography>
                        </ListItemText>
                        {/* </Box> */}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}

export default SortProducts;
