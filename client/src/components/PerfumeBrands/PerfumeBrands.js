import { Box, Container } from '@mui/material';
import React, { useState } from 'react';

import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import useBrand from '../../api/useBrand';
import { useLocation, useNavigate } from 'react-router-dom';

function PerfumeBrands({ listData, brandSelected, setBrandSelected }) {
    console.log('listData: ', listData);
    const { data: brands, isLoading, error } = useBrand();
    const location = useLocation();
    const navigate = useNavigate();
    console.log('âhiahihi');

    const handleSelectBrand = (brand) => {
        setBrandSelected(brand.nameEn);
        window.localStorage.setItem('filter', JSON.stringify(brand.nameEn));
        // lấy query hiện tại mà không làm thay đổi mã hóa của nó
        const currentQueryParams = new URLSearchParams(location.search);
        // Xóa thương hiệu cũ (nếu có) và thêm thương hiệu mới
        currentQueryParams.set('brand', brand.nameEn);
        console.log('currentQueryParams.toString(): ', currentQueryParams.toString());

        // Cập nhật URL với `navigate` mà không mã hóa thêm
        navigate(`/shop?${currentQueryParams.toString()}`);
    };

    console.log('brandSelected: ', brandSelected);

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
            {brands?.data.map((brand) => (
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
