import React, { useState, useEffect } from 'react';
import { Box, Container, IconButton, Badge, List, ListItem, Paper, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import { useSelector } from 'react-redux';
import AuthenticatedUser from '../AuthenticatedUser/AuthenticatedUser';
import CustomizeButton, { CustomizeButtonOutlined } from '../CustomizeButton/CustomizeButton';
import { TextFieldCustomizeV2 } from '../TextFieldCustomize/TextFieldCustomize';
import SimpleBottomNavigation from './BottomNavigation';

import { perfumeData } from '../PerfumesCard/perfumeData';
import { converToVND } from '../convertToVND/convertToVND';

const headerData = [
    { headerText: 'Home', headerLink: '/' },
    { headerText: 'Shop', headerLink: '/shop' },
    { headerText: 'About Us', headerLink: '/about-us' },
    { headerText: 'Services', headerLink: '/our-services' },
    { headerText: 'Blog', headerLink: '/blog' },
];

const headerActionButton = [
    {
        headerIcon: <SearchIcon sx={{ fontSize: '24px' }} />,
        headerIconDest: '/search',
        des: 'Search',
    },
    {
        headerIcon: <PersonIcon sx={{ fontSize: '24px' }} />,
        headerIconDest: '/sign-in',
        des: 'Sign In',
    },

    {
        headerIcon: <FavoriteIcon sx={{ fontSize: '24px' }} />,

        headerIconDest: '/favorite-list',
        des: 'Favorite',
    },
    {
        headerIcon: <ShoppingCartIcon sx={{ fontSize: '24px' }} />,
        headerIconDest: '/shopping-cart',
        des: 'Cart',
    },
];

function NewHeader() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const open = Boolean(anchorEl);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 739);
    const [isTablet, setIsTablet] = useState(window.innerWidth < 1024);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeHeader, setActiveHeader] = useState('Home');
    const listSuggestions = suggestions.slice(0, 4); // just show 4 product items to UI

    console.log('window: ', window.innerWidth);
    // get product in cart
    const productListInCart = useSelector((state) => state.cartManagement.productInfor);
    const isLogged = useSelector((state) => state.accountManagement.loggedInAccount);

    function handleWindowSizeChange() {
        setIsMobile(window.innerWidth < 739);
        setIsTablet(window.innerWidth < 1024);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    console.log('isMobile: ', isMobile);

    // open menu setting
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    // close menu setting
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // click into menu item
    const handleMenuClick = (path) => {
        navigate(path);
        handleMenuClose();
    };

    // open menu for mobile
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleHeaderClick = (header) => {
        setActiveHeader(header.headerText);
        navigate(header.headerLink);
    };

    const handleIconHeaderClick = (action, event) => {
        if (action.headerIconDest === '/sign-in') {
            // open the menu for "Sign In"
            setAnchorEl(event.currentTarget);
        } else {
            // close the menu if it's another icon
            setAnchorEl(null);
            // navigate to the icon's destination
            navigate(action.headerIconDest);
        }
        // set active header to the clicked icon
        setActiveHeader(action.des);
    };

    // search
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value) {
            const filteredSuggestions = perfumeData.filter((product) =>
                product.perfumeName.toLowerCase().includes(value.toLowerCase()),
            );
            setShowSuggestions(true);
            setSuggestions(filteredSuggestions);
        } else {
            setShowSuggestions(false);
        }
    };

    // handle selecting a suggestion
    const handleSuggestionClick = (perfume) => {
        // hide the suggestions after selection
        setShowSuggestions(false);
        // navigate to product details page
        navigate(`/product/${perfume.perfumeID}`, { state: { perfume } });
    };

    return (
        <Box
            sx={{
                minHeight: '120px',
                width: '100%',
                position: 'fixed',
                backgroundColor: 'black',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                [tabletScreen]: {
                    minHeight: '80px',
                },
                [mobileScreen]: {
                    width: '100%',
                    minHeight: '100px',
                },
            }}
        >
            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <CustomizeTypography
                        sx={{
                            mb: 0,
                            fontSize: '32px',
                            fontWeight: 'bold',
                            background: `linear-gradient(120deg, ${theme.palette.text.main}, ${theme.palette.text.secondary})`,
                            // chỉ hiển thị màu nền ở phần text
                            WebkitBackgroundClip: 'text',
                            // ẩn màu văn bản mặc định
                            WebkitTextFillColor: 'transparent',
                            [ipadProScreen]: {
                                fontSize: '26px',
                            },
                            [tabletScreen]: {
                                fontSize: '22px',
                                width: 120,
                                mt: 1,
                            },
                            [mobileScreen]: {
                                fontSize: '20px',
                            },
                        }}
                        onClick={() => navigate('/')}
                    >
                        Tomtoc Perfumes
                    </CustomizeTypography>
                    {!isMobile && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',

                                [tabletScreen]: {
                                    mt: 2,
                                },
                            }}
                        >
                            <TextFieldCustomizeV2
                                // default
                                placeholder={'Search here...'}
                                sx={{
                                    width: '360px',
                                    [tabletScreen]: { width: '260px' },
                                    [mobileScreen]: {
                                        width: '100%',
                                    },
                                }}
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onClick={() => setShowSuggestions(!!searchTerm)}
                            />
                            {/* Suggestions Dropdown */}
                            {showSuggestions && suggestions.length > 0 && (
                                <Paper
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        // width: '50%',
                                        left: '50%',
                                        right: '0',
                                        transform: 'translate(-50%, 0)',
                                        zIndex: 1,
                                    }}
                                >
                                    <List>
                                        {listSuggestions.map((product) => (
                                            <ListItem
                                                key={product.id}
                                                button
                                                onClick={() => handleSuggestionClick(product)}
                                            >
                                                <Avatar
                                                    src={product.perfumeImage}
                                                    sx={{
                                                        borderRadius: 0,
                                                        height: '80px',
                                                        width: '80px',
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                                <Box sx={{ flexDirection: 'column' }}>
                                                    <CustomizeTypography sx={{ color: '#000' }}>
                                                        {product.perfumeName}
                                                    </CustomizeTypography>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                        }}
                                                    >
                                                        <CustomizeTypography
                                                            sx={{
                                                                color: '#000',
                                                                fontSize: '14px',
                                                                mr: 2,
                                                                textDecoration: product.discount
                                                                    ? 'line-through'
                                                                    : '',
                                                            }}
                                                        >
                                                            {converToVND(product.perfumePriceVND)}
                                                        </CustomizeTypography>
                                                        <CustomizeTypography
                                                            sx={{
                                                                color: '#000',
                                                                fontSize: '14px',
                                                                color: theme.palette.text.secondary,
                                                                fontWeight: 'bold',
                                                            }}
                                                        >
                                                            {converToVND(
                                                                product.perfumePriceDiscount,
                                                            )}
                                                        </CustomizeTypography>
                                                    </Box>
                                                </Box>
                                            </ListItem>
                                        ))}
                                    </List>
                                    {suggestions.length - listSuggestions.length > 0 && (
                                        <CustomizeTypography
                                            sx={{
                                                textAlign: 'center',
                                                color: '#000',
                                                fontSize: 14,
                                                '&:hover': {
                                                    cursor: 'pointer',
                                                    fontWeight: 'bold',
                                                    color: theme.palette.text.secondary,
                                                },
                                            }}
                                        >
                                            Xem thêm {suggestions.length - listSuggestions.length}{' '}
                                            sản phẩm
                                        </CustomizeTypography>
                                    )}
                                </Paper>
                            )}

                            <IconButton
                                sx={{
                                    bgcolor: theme.palette.text.secondary,
                                    borderTopLeftRadius: 1,
                                    borderBottomLeftRadius: 1,
                                    mr: 1,
                                    '&:hover': {
                                        bgcolor: theme.palette.text.secondary,
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                    },
                                    [tabletScreen]: {
                                        mr: 4,
                                    },
                                }}
                            >
                                <SearchIcon sx={{ fontSize: '24px', color: 'white' }} />
                            </IconButton>
                        </Box>
                    )}

                    {isLogged ? (
                        <AuthenticatedUser />
                    ) : (
                        <React.Fragment>
                            <Box
                                sx={{
                                    [tabletScreen]: { mt: 2 },
                                    [mobileScreen]: {
                                        display: 'none',
                                    },
                                }}
                            >
                                <CustomizeButton
                                    textAction={'Sign In'}
                                    onHandleClick={() => navigate('/sign-in')}
                                />
                            </Box>
                            <Box
                                sx={{
                                    [tabletScreen]: { mt: 2 },
                                    [mobileScreen]: {
                                        display: 'none',
                                    },
                                }}
                            >
                                <CustomizeButtonOutlined
                                    textAction={'Register'}
                                    onHandleClick={() => navigate('/create-account')}
                                />
                            </Box>
                        </React.Fragment>
                    )}

                    <Badge
                        badgeContent={
                            productListInCart && productListInCart.length > 0
                                ? productListInCart.length
                                : ''
                        }
                        max={9}
                        sx={{
                            '& .MuiBadge-badge': {
                                fontSize: '10px',
                                // fontWeight: 'bold',
                                right: 4,
                                top: 4,
                                color: '#fff',
                                bgcolor:
                                    productListInCart && productListInCart.length > 0
                                        ? theme.palette.background.thirth
                                        : 'black',
                            },
                        }}
                        color="green"
                    >
                        <IconButton
                            onClick={() => navigate('/shopping-cart')}
                            sx={{
                                ml: 2,
                                // mr: 1,
                                '&:hover': {
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                },
                                [tabletScreen]: {
                                    mt: 2,
                                },
                            }}
                        >
                            <ShoppingCartIcon sx={{ fontSize: '24px', color: 'white' }} />
                        </IconButton>
                    </Badge>
                </Box>

                <Box
                    sx={{
                        mt: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // [mobileScreen]: {
                        //     overflowX: 'scroll',
                        // },
                    }}
                >
                    {headerData.map((header, index) => (
                        <CustomizeTypography
                            key={index}
                            onClick={() => handleHeaderClick(header)}
                            sx={{
                                fontSize: '16px',
                                color:
                                    activeHeader === header.headerText
                                        ? theme.palette.text.secondary
                                        : 'white',
                                margin: '0 32px',
                                fontWeight: activeHeader === header.headerText ? 'bold' : 'normal',
                                borderBottom:
                                    activeHeader === header.headerText
                                        ? `1px solid ${theme.palette.text.secondary}`
                                        : '1px solid transparent',
                                transition:
                                    'color 0.3s ease, font-weight 0.3s ease, border-bottom 0.3s ease',
                                '&:hover': {
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                },

                                // for mobile
                                [mobileScreen]: {
                                    fontSize: '14px',
                                    margin: '0 13px',
                                },
                            }}
                        >
                            {header.headerText}
                        </CustomizeTypography>
                    ))}
                </Box>

                {isMobile && (
                    <Box
                        sx={{
                            width: '100%',
                            position: 'fixed',
                            backgroundColor: 'black',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            zIndex: 1000,
                        }}
                    >
                        <SimpleBottomNavigation />
                    </Box>
                )}
            </Container>
        </Box>
    );
}

export default NewHeader;
