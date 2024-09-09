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

const filterPriceLists = [
    {
        priceText: 'Low to High',
        priceSubtitle: 'See all Prices, from newest to oldest over time',
        priceIcon: <AttachMoneyIcon sx={{ fontSize: '24px', color: '#333' }} />,
    },
    {
        priceText: 'High to Low',
        priceSubtitle: 'See all Prices over time',
        priceIcon: <AttachMoneyIcon sx={{ fontSize: '24px', color: '#333' }} />,
    },
];

function SortProducts() {
    const [getFilterPrice, setGetFilterPrice] = React.useState(null);
    // Default to the first item
    const [selectedOptionFilter, setSelectedOptionFilter] = React.useState('Price');

    const openSortMenu = Boolean(getFilterPrice);

    const handleSortMenuClick = (event) => {
        setGetFilterPrice(event.currentTarget);
    };

    const handleSortMenuClose = () => {
        setGetFilterPrice(null);
    };

    const handleGetFilterPrice = (item) => {
        setSelectedOptionFilter(item);
        setGetFilterPrice(null);
    };

    return (
        <Container sx={{ my: theme.spacingAxis.boxVerticalAxis }}>
            <Box
                sx={{
                    width: '100%',
                    p: '12px',
                    bgcolor: theme.palette.background.main,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
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
        </Container>
    );
}

export default SortProducts;
