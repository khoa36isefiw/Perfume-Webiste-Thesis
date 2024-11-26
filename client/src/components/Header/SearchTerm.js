import React, { useRef } from 'react';
import { Box, IconButton } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import { mobileScreen, tabletScreen, theme } from '../../Theme/Theme';

import { TextFieldCustomizeV2 } from '../TextFieldCustomize/TextFieldCustomize';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import useShowNotificationMessage from '../../hooks/useShowNotificationMessage';

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
        const params = new URLSearchParams(); // get current query string params
        if (searchValue !== '') {
            params.set('keyword', searchValue); // add to the current path with q=search value
            window.localStorage.setItem('search_query', searchValue);
            // window.localStorage.setItem('filter', JSON.stringify('')); // reset filter
            localStorage.removeItem('filter');
            localStorage.removeItem('sortBy');
            // navigate to update the URL with query params
            // navigate(`/products?${params.toString()}`); // href to shop with query string params
            navigate(`/${i18n.language}/shop?${params.toString()}`, { replace: true });
        } else {
            localStorage.removeItem('filter');
            localStorage.removeItem('sortBy');
            const currentQueryParams = new URLSearchParams(location.search);
            currentQueryParams.delete('keyword'); //// remove 'brand' filter from the URL
            currentQueryParams.delete('brand'); //// remove 'brand' filter from the URL
            showMessage('warning', 'Search', 'Please fill product name!');
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
        </Box>
    );
}

export default SearchTerm;
