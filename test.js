import React, { useState, useEffect, useRef } from 'react';
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
import CouponRunning from '../CouponRunning/CouponRunning';
import VNFlag from '../../assets/images/VN-circle.png';
import UKFlag from '../../assets/images/UK-circle.png';
import useShowNotificationMessage from '../../hooks/useShowNotificationMessage';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';
import MobileHeader from './MobileHeader';

function NewHeader() {
    const navigate = useNavigate();

    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState(localStorage.getItem('search_query') || null); // prevent lost data when reload the page
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 739);

    // save keyword is searched by user
    const [searchHistory, setSearchHistory] = useState(
        JSON.parse(localStorage.getItem('search_history')) || [],
    );
    const [showSearchHistory, setShowSearchHistory] = useState(false);
    const timeoutRef = useRef(null);

    // search
    const handleSearchChange = (e) => {
        const value = e.target.value.trim();
        setSearchQuery(value);

        if (value) {
            const filteredSuggestions = perfumeData.filter((product) =>
                product.perfumeName.toLowerCase().includes(value.toLowerCase()),
            );

            setSuggestions(filteredSuggestions);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
            if (showSearchHistory) {
                window.localStorage.removeItem('search_query');
            }

            // const params = new URLSearchParams(location.search);
            // params.delete('keyword'); // Xóa tham số `keyword` khỏi URL
            navigate(`${location.pathname}`);
        }
    };

    // handle selecting a suggestion
    const handleSuggestionClick = (perfume) => {
        // hide the suggestions after selection
        setShowSuggestions(false);
        // navigate to product details page
        navigate(`/${i18n.language}/product/${perfume.perfumeID}`, { state: { perfume } });
    };

    useEffect(() => {
        if (searchQuery === '') {
            window.localStorage.removeItem('search_query');
            const currentQueryParams = new URLSearchParams(location.search);
            console.log('location.search: ', location.search);
            currentQueryParams.delete('keyword'); //// remove 'brand' filter from the URL
            currentQueryParams.delete('brand'); //// remove 'brand' filter from the URL
        }
    }, [searchQuery, location]);

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

            // Lấy lịch sử tìm kiếm từ localStorage
            let searchHistory = JSON.parse(localStorage.getItem('search_history')) || [];

            // Thêm giá trị mới vào lịch sử (nếu chưa tồn tại)
            if (!searchHistory.includes(searchQuery)) {
                searchHistory.push(searchQuery);

                // Giới hạn số lượng lịch sử tìm kiếm (tối đa 10 mục)
                if (searchHistory.length > 10) {
                    searchHistory = searchHistory.slice(-10); // Giữ 10 mục cuối cùng
                }

                // Lưu lịch sử cập nhật vào localStorage
                localStorage.setItem('search_history', JSON.stringify(searchHistory));
            }

            navigate(`/${i18n.language}/shop?${params.toString()}`, { replace: true });
            setShowSuggestions(false); // hide the show suggestions
        } else {
            localStorage.removeItem('filter');
            localStorage.removeItem('sortBy');
            const currentQueryParams = new URLSearchParams(location.search);
            currentQueryParams.delete('keyword'); //// remove 'brand' filter from the URL
            currentQueryParams.delete('brand'); //// remove 'brand' filter from the URL
            showMessage('warning', 'Search', 'Please fill product name!');
        }
    };

    // Initialize the app's language based on localStorage
    useEffect(() => {
        const savedLanguage = window.localStorage.getItem('language') || 'en';
        i18n.changeLanguage(savedLanguage); // Set the language for i18n
        setEnLanguage(savedLanguage === 'en'); // Update local state
    }, []);

    // handle for searching with search history
    const handleSearchFocus = () => {
        if (searchQuery === '') {
            setShowSearchHistory(true);
        }
    };
    const handleSearchBlur = () => {
        // Handle blur with delay - hide history after losing focus
        timeoutRef.current = setTimeout(() => {
            setShowSearchHistory(false); // Hide search history
        }, 200);
    };

    const handleSearchHistoryClicked = (search) => {
        clearTimeout(timeoutRef.current);
        window.localStorage.setItem('search_query', search);
        navigate(`/${i18n.language}/shop?keyword=${search}`);
    };

    return (
        <>
            {!isMobile && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',

                        position: 'relative',
                        [tabletScreen]: {
                            mt: 2,
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
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
                            // value={searchQuery}
                            value={searchQuery == null ? '' : searchQuery}
                            onChange={handleSearchChange}
                            onClick={() => setShowSuggestions(!!searchQuery)}
                            // enter key events
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            onFocus={handleSearchFocus}
                            onBlur={handleSearchBlur}
                        />
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

                    {searchHistory.length > 0 && showSearchHistory && (
                        <Paper
                            elevation={3}
                            style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                right: 0,
                                zIndex: 10,
                                maxHeight: '200px',
                                overflowY: 'auto',
                            }}
                        >
                            <List>
                                {searchHistory.map((search, index) => (
                                    <ListItem
                                        key={index}
                                        button
                                        onClick={() => handleSearchHistoryClicked(search)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {search}
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    )}
                </Box>
            )}
        </>
    );
}

export default NewHeader;
