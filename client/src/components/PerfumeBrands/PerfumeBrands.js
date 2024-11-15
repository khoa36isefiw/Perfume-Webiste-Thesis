import { Box, Container } from '@mui/material';
import React, { useState } from 'react';

import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import useBrand from '../../api/useBrand';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

// function PerfumeBrands({ listData, brandSelected, setBrandSelected }) {
function PerfumeBrands({ listData }) {
    const [brandSelected, setBrandSelected] = useState('');
    const { t, i18n } = useTranslation();
    console.log('current language: ', i18n.language); // get the current language

    const { data: brands, isLoading, error } = useBrand();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const currentBrand = JSON.parse(localStorage.getItem('filter'));

        setBrandSelected(currentBrand);
    }, [JSON.parse(localStorage.getItem('filter'))]);
    console.log('current filter: ', brandSelected);

    const handleSelectBrand = (brand) => {
        // remove the brand selected when user clicks on it again
        if (brandSelected === brand.nameEn) {
            window.localStorage.removeItem('filter'); // delete key from the local storage
            const currentQueryParams = new URLSearchParams(location.search);
            currentQueryParams.delete('brand'); //// remove 'brand' filter from the URL
            navigate(`/shop?${currentQueryParams.toString()}`);
        } else {
            setBrandSelected(brand.nameEn);
            window.localStorage.setItem('filter', JSON.stringify(brand.nameEn));
            // get the current search query
            const currentQueryParams = new URLSearchParams(location.search);
            // remove the old brand and add new brand selected
            currentQueryParams.set('brand', brand.nameEn);
            console.log('currentQueryParams.toString(): ', currentQueryParams.toString());

            // update url
            navigate(`/shop?${currentQueryParams.toString()}`);
        }
    };

    return (
        // <Container
        <Box
            sx={{
                mt: 16,
                display: 'flex',
                // Wrap items into multiple lines
                flexWrap: 'wrap',
            }}
        >
            {brands?.data?.map((brand) => (
                <Box
                    key={brand._id}
                    onClick={() => handleSelectBrand(brand)}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        bgcolor: '#fff',
                        height: '60px',
                        width: '140px',
                        borderRadius: '8px',
                        border:
                            brandSelected === brand?.nameEn
                                ? `4px solid ${theme.palette.secondaryText}`
                                : '1px solid #333',
                        ml: 1,
                        mb: 2,
                        p: '4px',
                        objectFit: 'contain',
                        transition: 'border 0.3s ease',
                        '&:hover': {
                            cursor: 'pointer',
                            border: `4px solid ${theme.palette.secondaryText}`,
                        },
                        // Set fixed width for larger screens
                        flexBasis: '140px',
                        [ipadProScreen]: {
                            width: '20%',
                            flexBasis: '20%',
                            marginLeft: '4%',
                        },
                        [tabletScreen]: {
                            width: '20%',
                            flexBasis: '20%',
                            marginLeft: '4%',
                        },
                        [mobileScreen]: {
                            // Set width to 45% for mobile to display 2 items per row
                            width: '45%',
                            flexBasis: '45%',
                            // Center items on mobile screens
                            marginLeft: '3.5%',
                        },
                    }}
                >
                    {brand.nameEn}
                </Box>
            ))}
        </Box>
    );
}

export default PerfumeBrands;
