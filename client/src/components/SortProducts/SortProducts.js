import React, { useEffect, useState } from 'react';
import { Box, Button, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { theme } from '../../Theme/Theme';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { useLocation, useNavigate } from 'react-router-dom';
import AbcIcon from '@mui/icons-material/Abc';
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
    {
        priceText: 'Name: A -> Z',
        priceSubtitle: 'See all products, with name from A to Z',
        priceIcon: <AbcIcon sx={{ fontSize: '28px', color: '#333' }} />,
    },
    {
        priceText: 'Name: Z -> A',
        priceSubtitle: 'See all products, with name from Z to A',
        priceIcon: <AbcIcon sx={{ fontSize: '28px', color: '#333' }} />,
    },
];

// function SortProducts({ listData, sortingSelected, setSortingSelected }) {
function SortProducts({ listData }) {
    const location = useLocation();
    const navigate = useNavigate();
    const savedLanguage = localStorage.getItem('language');

    const [getFilterPrice, setGetFilterPrice] = useState(null);
    // Default to the first item
    const [sortingSelected, setSortingSelected] = useState('');
    // console.log('list data in sort: ', listData);

    const openSortMenu = Boolean(getFilterPrice);
    console.log('selectedOptionFilter: ', sortingSelected);

    useEffect(() => {
        const currentSorting = JSON.parse(localStorage.getItem('sortBy'));
        setSortingSelected(currentSorting);
    }, [JSON.parse(localStorage.getItem('sortBy'))]);

    const handleSortMenuClick = (event) => {
        setGetFilterPrice(event.currentTarget);
    };

    const handleSortMenuClose = () => {
        setGetFilterPrice(null);
    };

    const handleGetFilterPrice = (item) => {
        setGetFilterPrice(null); // close menu
        const currentQueryParams = new URLSearchParams(location.search); // get the current search params
        if (item === 'High to Low' || item === 'Low to High') {
            const data = {
                sortBy: 'price',
                sortText: item,
                sortType: item === 'High to Low' ? 'desc' : 'asc',
            };
            setSortingSelected(data);
            window.localStorage.setItem('sortBy', JSON.stringify(data));
            currentQueryParams.set('sortBy', 'price');
        } else {
            const data = {
                sortBy: 'name',
                sortText: item,
                sortType: item === 'Name: Z -> A' ? 'desc' : 'asc',
            };
            setSortingSelected(data);
            window.localStorage.setItem('sortBy', JSON.stringify(data));
            currentQueryParams.set('sortBy', 'name');
        }

        navigate(`/${savedLanguage}/shop?${currentQueryParams.toString()}`);
    };

    return (
        <Box
            sx={{
                width: '100%',
                // p: '12px',
                // bgcolor: theme.palette.background.main,
                // borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                // my: theme.spacingAxis.boxVerticalAxis,
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
                {sortingSelected !== null ? sortingSelected?.sortText : 'Price'}
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
