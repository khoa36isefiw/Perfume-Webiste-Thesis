import { Box, Container, Grid } from '@mui/material';
import React, { useState } from 'react';

import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import { backTop } from '../goBackTop/goBackTop';

import { converToVND } from '../convertToVND/convertToVND';
import { useTranslation } from 'react-i18next';

function RelatedProduct({ data }) {
    const { t, i18n } = useTranslation('translate');
    const navigate = useNavigate();

    const handleNavigateProductDetails = (perfume) => {
        // navigate to the product detail page and pass the perfume data as state
        navigate(`/${i18n.language}/${perfume.nameEn}/${perfume._id}`);
        backTop();
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={4}>
                {data?.map((perfume) => (
                    <Grid item xs={6} sm={4} md={3} lg={3} key={perfume._id}>
                        <Box
                            key={perfume._id}
                            sx={{
                                height: '350px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '8px',
                                bgcolor: theme.palette.bestSelling,
                                py: 1,
                                position: 'relative',
                                '&:hover': {
                                    cursor: 'pointer',
                                },
                                [mobileScreen]: {
                                    p: 1,
                                    py: 0,
                                },
                            }}
                            onClick={() => handleNavigateProductDetails(perfume)}
                        >
                            {perfume?.variants[0]?.discountPercent !== 0 && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '4%',
                                        left: 0,
                                        height: '30px',
                                        width: '60px',
                                        // bgcolor: 'red',
                                        backgroundImage: `linear-gradient(-60deg, #b31217 0%, #e52d27 100%)`,
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    - {perfume?.variants[0]?.discountPercent}%
                                </Box>
                            )}

                            <Box
                                component={'img'}
                                src={perfume.imagePath[0]}
                                sx={{
                                    height: '180px',
                                    width: '180px',
                                    objectFit: 'cover',
                                    my: '16px',
                                    [tabletScreen]: {
                                        mt: 2,
                                    },
                                    [mobileScreen]: {
                                        mt: 2,
                                        width: '100%',
                                    },
                                }}
                            />
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                {/* brand */}
                                <CustomizeTypography
                                    sx={{
                                        fontWeight: 'bold',
                                        mt: 1,
                                        [ipadProScreen]: {
                                            // fontSize: theme.fontSize.tablet.text14,
                                            mb: 0,
                                            mt: 0,
                                        },
                                        [tabletScreen]: {
                                            fontSize: theme.fontSize.tablet.text14,
                                            mb: 0,
                                            mt: 0,
                                        },
                                        [mobileScreen]: {
                                            fontSize: theme.fontSize.mobile.text14,
                                        },
                                    }}
                                >
                                    {/* Dior */}
                                    {perfume.brand?.nameEn}
                                </CustomizeTypography>
                                {/* perfume name */}
                                <CustomizeTypography
                                    sx={{
                                        width: '220px',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        [ipadProScreen]: {
                                            mb: 0,
                                        },
                                        [tabletScreen]: {
                                            fontSize: theme.fontSize.tablet.text14,
                                            mb: 0,
                                        },
                                        [mobileScreen]: {
                                            fontSize: theme.fontSize.mobile.text14,
                                            width: '150px',
                                        },
                                    }}
                                >
                                    {/* Homme Intense */}
                                    {perfume.nameEn}
                                </CustomizeTypography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        // justifyContent: 'space-between',
                                        alignItems: 'center',
                                        // mb: 1,
                                        [mobileScreen]: {
                                            flexDirection: 'column',
                                        },
                                    }}
                                >
                                    <Rating
                                        readOnly={true}
                                        // value={+perfume?.rating.toFixed(1)}
                                        value={+perfume?.rating.toFixed(1)}
                                        // MuiRating-root MuiRating-sizeMedium css-1qqgbpl-MuiRating-root
                                        sx={{
                                            fontSize: '18px',
                                            // change bo    rder color
                                            '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
                                                color: theme.palette.thirth.main,
                                            },
                                            mb: 1,
                                        }}
                                    />
                                    {/* number of rating */}
                                    <CustomizeTypography
                                        sx={{
                                            ml: 1,
                                            [mobileScreen]: {
                                                ml: 0,
                                            },
                                        }}
                                    >
                                        ({perfume.unitsSold}) đã bán
                                    </CustomizeTypography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        // justifyContent: 'space-between',
                                        alignItems: 'center',
                                        [ipadProScreen]: {
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        },
                                        [tabletScreen]: {
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        },
                                        [mobileScreen]: {
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        },
                                    }}
                                >
                                    {perfume.variants[0]?.priceSale !== undefined &&
                                        perfume.variants[0]?.priceSale !== null && ( // check data for case price sale === original price --> 0
                                            <CustomizeTypography
                                                sx={{
                                                    fontWeight: 'bold',
                                                    zIndex: 99,
                                                    textDecoration: perfume.discount
                                                        ? 'line-through'
                                                        : 'none', // Changed 'null' to 'none'
                                                    [ipadProScreen]: {
                                                        mb: 0,
                                                    },
                                                    [tabletScreen]: {
                                                        fontSize: theme.fontSize.mobile.text14,
                                                    },
                                                    [mobileScreen]: {
                                                        fontSize: theme.fontSize.mobile.text14,
                                                        mb: 0,
                                                    },
                                                }}
                                            >
                                                {converToVND(perfume.variants[0].priceSale)}
                                            </CustomizeTypography>
                                        )}
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default RelatedProduct;
