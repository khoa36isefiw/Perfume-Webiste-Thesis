import React, { useRef } from 'react';
import { Box, IconButton } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import { mobileScreen, tabletScreen, theme } from '../../Theme/Theme';

import { TextFieldCustomizeV2 } from '../TextFieldCustomize/TextFieldCustomize';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import useShowNotificationMessage from '../../hooks/useShowNotificationMessage';
import NotificationMessage from '../NotificationMessage/NotificationMessage';

function SearchTerm() {
    const { t, i18n } = useTranslation('translate');
    const location = useLocation();

    const {
        showNotification,
        showAnimation,
        messageType,
        messageTitle,
        messageContent,
        showMessage,
        handleCloseNotification,
    } = useShowNotificationMessage();
    const navigate = useNavigate();
    const searchRef = useRef(null);

    const handleSearch = async () => {
        const searchValue = searchRef.current.value.trim();
        console.log('searchValue: ', searchValue);
        if (searchValue !== '') {
            const params = new URLSearchParams(); // get current query string params
            params.set('keyword', searchValue); // add to the current path with q=search value
            window.localStorage.setItem('search_query', searchValue);
            // window.localStorage.setItem('filter', JSON.stringify('')); // reset filter
            localStorage.removeItem('filter');
            localStorage.removeItem('sortBy');

            // Lấy lịch sử tìm kiếm từ localStorage
            let searchHistory = JSON.parse(localStorage.getItem('search_history')) || [];

            // Thêm giá trị mới vào lịch sử (nếu chưa tồn tại)
            if (!searchHistory.includes(searchValue)) {
                searchHistory.push(searchValue);

                // Giới hạn số lượng lịch sử tìm kiếm (tối đa 10 mục)
                if (searchHistory.length > 10) {
                    searchHistory = searchHistory.slice(-10); // Giữ 10 mục cuối cùng
                }

                // Lưu lịch sử cập nhật vào localStorage
                localStorage.setItem('search_history', JSON.stringify(searchHistory));
            }
            navigate(`/${i18n.language}/shop?${params.toString()}`, { replace: true });
        } else {
            localStorage.removeItem('search_query');
            localStorage.removeItem('filter');
            localStorage.removeItem('sortBy');
            const currentQueryParams = new URLSearchParams(location.search);
            currentQueryParams.delete('keyword'); //// remove 'brand' filter from the URL
            currentQueryParams.delete('brand'); //// remove 'brand' filter from the URL

            navigate(`/${i18n.language}/shop`);
        }
    };
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 16,
                p: 2,
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
                inputRef={searchRef}
                // onChange={handleSearchChange}
                // onClick={() => setShowSuggestions(!!searchTerm)}
            />

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
                onClick={handleSearch}
            >
                <SearchIcon sx={{ fontSize: '24px', color: 'white' }} />
            </IconButton>
            {showNotification && (
                <Box
                    sx={{ position: 'fixed', top: '5%', right: '1%', zIndex: 9999999 }}
                    className={`animate__animated ${showAnimation}`}
                >
                    <NotificationMessage
                        msgType={messageType}
                        msgTitle={messageTitle}
                        msgContent={messageContent}
                        autoHideDuration={3000} // Auto-hide after 5 seconds
                        onClose={handleCloseNotification}
                    />
                </Box>
            )}
        </Box>
    );
}

export default SearchTerm;
