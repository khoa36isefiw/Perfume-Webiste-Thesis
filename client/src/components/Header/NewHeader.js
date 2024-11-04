import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    IconButton,
    Badge,
    List,
    ListItem,
    Paper,
    Avatar,
    Tooltip,
    Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import { useSelector } from 'react-redux';
import AuthenticatedUser from '../AuthenticatedUser/AuthenticatedUser';
import CustomizeButton, { CustomizeButtonOutlined } from '../CustomizeButton/CustomizeButton';
import { TextFieldCustomizeV2 } from '../TextFieldCustomize/TextFieldCustomize';
import MobileBottomNavigation from './MobileBottomNavigation';
import { perfumeData } from '../PerfumesCard/perfumeData';
import { converToVND } from '../convertToVND/convertToVND';
import { backTop } from '../goBackTop/goBackTop';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import useUserById from '../../api/useUserById';

const headerData = [
    { headerText: 'Home', headerLink: '/' },
    { headerText: 'Shop', headerLink: '/shop' },
    { headerText: 'About Us', headerLink: '/about-us' },
    { headerText: 'Services', headerLink: '/our-services' },
    { headerText: 'Blog', headerLink: '/blog' },
];

function NewHeader() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState(localStorage.getItem('search_query') || null); // prevent lost data when reload the page
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 739);

    const [activeHeader, setActiveHeader] = useState('Home');
    const listSuggestions = suggestions.slice(0, 4); // just show 4 product items to UI

    // get product in cart
    const productListInCart = useSelector((state) => state.cartManagement.productInfor);
    const isLogged = useSelector((state) => state.accountManagement.loggedInAccount);
    const userData = JSON.parse(localStorage.getItem('user_data')) || null;

    const { data: products, mutate, isLoading, error } = useUserById(userData?.userId);

    function handleWindowSizeChange() {
        setIsMobile(window.innerWidth < 739);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    // define logic for header location, when reload the page
    useEffect(() => {
        const currentPath = location.pathname; // get the current location path
        // check, if the current Path is the same as header.header Link
        const currentHeader = headerData.find((header) => header.headerLink === currentPath);
        setActiveHeader(currentHeader ? currentHeader.headerText : 'Home');
    }, [location.pathname]);

    const handleHeaderClick = (header) => {
        setActiveHeader(header.headerText);
        navigate(header.headerLink);
        backTop();
    };

    // search
    const handleSearchChange = (e) => {
        const value = e.target.value;

        setSearchQuery(value);

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

    useEffect(() => {
        if (searchQuery === '') {
            window.localStorage.setItem('search_query', '');
            navigate('/shop');
        }
    }, [searchQuery]);

    // Parse URL parameters on mount to set initial searchQuery and filter values
    // Function to handle searching
    const handleSearch = async (search = searchQuery) => {
        console.log('search: ', search);
        const params = new URLSearchParams(); // get current query string params
        if (search !== '') {
            params.set('keyword', search); // add to the current path with q=search value
            window.localStorage.setItem('search_query', search);
            // window.localStorage.setItem('filter', JSON.stringify('')); // reset filter
            localStorage.removeItem('filter');
            localStorage.removeItem('sortBy');
            // navigate to update the URL with query params
            // navigate(`/products?${params.toString()}`); // href to shop with query string params
            navigate(`/shop?${params.toString()}`, { replace: true });
            setShowSuggestions(false); // hide the show suggestions
        }
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
                            cursor: 'pointer',
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
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onClick={() => setShowSuggestions(!!searchQuery)}
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
                                        // bgcolor: '#616161eb',
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
                                    bgcolor: theme.palette.text.main,
                                    borderTopLeftRadius: 1,
                                    borderBottomLeftRadius: 1,
                                    mr: 1,
                                    '&:hover': {
                                        bgcolor: theme.palette.text.main,
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                    },
                                    [tabletScreen]: {
                                        mr: 4,
                                    },
                                }}
                                onClick={() => handleSearch(searchQuery)}
                            >
                                <SearchIcon sx={{ fontSize: '24px', color: 'white' }} />
                            </IconButton>
                        </Box>
                    )}

                    {userData && !isMobile ? (
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
                            <CustomizeButtonOutlined
                                textAction={'Dashboard'}
                                onHandleClick={() => navigate('/admin/dashboard')}
                            />
                        </React.Fragment>
                    )}

                    <Box>
                        {isLogged && (
                            <Tooltip
                                title={
                                    <Typography
                                        sx={{
                                            fontSize: '13px',
                                            mb: 0,
                                        }}
                                    >
                                        Admin Dashboard
                                    </Typography>
                                }
                            >
                                <IconButton onClick={() => navigate('/admin/dashboard')}>
                                    <AdminPanelSettingsIcon
                                        sx={{ color: '#fff', fontSize: '28px' }}
                                    />
                                </IconButton>
                            </Tooltip>
                        )}
                        <Tooltip
                            title={
                                <Typography
                                    sx={{
                                        fontSize: '13px',
                                        mb: 0,
                                    }}
                                >
                                    Shopping Cart
                                </Typography>
                            }
                        >
                            <Badge
                                badgeContent={
                                    products?.data?.cart && products?.data?.cart?.length > 0
                                        ? products?.data?.cart?.length
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
                                            products?.data?.cart && products?.data?.cart?.length > 0
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
                        </Tooltip>
                    </Box>
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
                        <MobileBottomNavigation />
                    </Box>
                )}
            </Container>
        </Box>
    );
}

export default NewHeader;
