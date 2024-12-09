import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Grid, TextField, Rating, Stack } from '@mui/material';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import StarIcon from '@mui/icons-material/Star';
import { ratingData } from './ratingData';
import CustomizeButton from '../CustomizeButton/CustomizeButton';
import { useDispatch, useSelector } from 'react-redux';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useTranslation } from 'react-i18next';
import { reviewsAPI } from '../../api/reviewsAPI';
import { useLocation } from 'react-router-dom';
import useUserReviewsProduct from '../../api/useUserReviewsProduct';

function RatingProduct({ perfumeDetailData }) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get('orderId');
    console.log('orderId: ', orderId);
    console.log('perfumeDetailData: ', perfumeDetailData);
    const { t, i18n } = useTranslation('translate');
    const reviewInputRef = useRef(null);
    const [commentRights, setCommentRights] = useState(false);
    
    const userData = JSON.parse(window.localStorage.getItem('user_data')) || '';
    const { data: userReviews, isLoading } = useUserReviewsProduct(userData?.userId);
    console.log('userReviews: ', userReviews?.data);

    const [ratingValue, setRatingValue] = useState(0);

    console.log('userData: ', userData);
    useEffect(() => {
        if (location?.state?.from === `/${i18n.language}/my-purchase` && reviewInputRef.current) {
            setTimeout(() => {
                if (reviewInputRef.current) {
                    reviewInputRef.current.focus(); // focus on textfield

                    reviewInputRef.current.scrollIntoView({
                        behavior: 'smooth', // scroll behavior
                        block: 'center', // scroll postion
                    });
                }
            }, 1000);
        }
    }, [location]);

    const handleComment = async () => {
        const newComment = reviewInputRef.current.value; // value of textfield by ref

        // userId, productId, orderId, comment, rating

        const data = {
            userId: userData?.userId,
            productId: perfumeDetailData?.product._id,
            orderId: orderId,
            rating: ratingValue,
            comment: newComment,
        };

        if (newComment && ratingValue) {
            const reviewProduct = await reviewsAPI.createReview(data);

            if (reviewProduct.status === 200) {
                console.log('reviewProduct: ', reviewProduct);
            }
        }
    };

    return (
        <Container
            sx={{
                mt: 2,
            }}
        >
            <CustomizeTypography
                sx={{ fontSize: '32px', fontWeight: 'bold', color: theme.palette.text.primary }}
            >
                {/* Đánh giá & Hỏi đáp về sản phẩm */}
                {t(`common.productDetails.reviews`)}
            </CustomizeTypography>
            {/* number of ratings */}
            <CustomizeTypography>
                {perfumeDetailData?.product.numReviews} {t(`common.productDetails.ratingFor`)}{' '}
                {perfumeDetailData?.product.nameEn}
            </CustomizeTypography>
            <Grid container>
                <Grid
                    container
                    item
                    xs={12}
                    sm={9}
                    md={9}
                    lg={9}
                    sx={{
                        border: '1px solid #333',
                        minHeight: '20px',
                        [mobileScreen]: {
                            p: 1,
                        },
                    }}
                >
                    <Grid item xs={12} sm={2} md={3} lg={3}>
                        <Box
                            sx={{
                                textAlign: 'center',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <CustomizeTypography
                                    sx={{
                                        fontSize: '32px',
                                        fontWeight: 'bold',
                                        color: theme.palette.text.primary,
                                        [ipadProScreen]: {
                                            fontSize: '28px',
                                        },
                                        [tabletScreen]: {
                                            fontSize: '24px',
                                        },
                                    }}
                                >
                                    {/* 5.0 */}
                                    {perfumeDetailData.product.rating.toFixed(1)}
                                </CustomizeTypography>
                                <StarIcon
                                    sx={{
                                        ml: 1,
                                        fontSize: '32px',
                                        color: theme.palette.text.primary,
                                        mb: 1,
                                        [ipadProScreen]: {
                                            fontSize: '28px',
                                        },
                                        [tabletScreen]: {
                                            fontSize: '24px',
                                        },
                                    }}
                                />
                            </Box>
                            <CustomizeTypography>
                                {t(`common.productDetails.averageRating`)}
                            </CustomizeTypography>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={7}
                        md={6}
                        lg={6}
                        sx={{
                            borderLeft: '1px solid #333',
                            borderRight: '1px solid #333',
                            p: 1,
                            [mobileScreen]: {
                                px: 2,
                                borderLeft: 'transparent',
                                borderRight: 'transparent',
                            },
                        }}
                    >
                        <Box>
                            {ratingData.map((rating, index) => {
                                const isGreaterThanZero =
                                    perfumeDetailData.reviewData[rating.numberOfRating];

                                console.log(
                                    `isGreaterThanZero with ${rating.numberOfRating}: `,
                                    isGreaterThanZero,
                                );

                                return (
                                    <Box sx={{ display: 'flex', alignItems: 'center' }} key={index}>
                                        <CustomizeTypography>
                                            {rating.numberOfRating}
                                        </CustomizeTypography>
                                        <StarIcon
                                            sx={{
                                                color: theme.palette.text.secondary,
                                                fontSize: '24px',
                                                mb: 1,
                                                ml: 1,
                                                [tabletScreen]: {
                                                    fontSize: '18px',
                                                },
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                mb: 1,
                                                ml: 1,
                                                width: '150px',
                                                height: '15px',
                                                borderRadius: '4px',
                                                bgcolor:
                                                    isGreaterThanZero > 0
                                                        ? theme.palette.text.secondary
                                                        : '#ccc', // rating

                                                [ipadProScreen]: {
                                                    width: '120px',
                                                },
                                                [tabletScreen]: {
                                                    width: '100px',
                                                },
                                            }}
                                        />

                                        <Box
                                            sx={{
                                                width: '4px',
                                                height: '1px',
                                                bgcolor: '#fff',
                                                mx: 2,
                                                mb: 1,
                                            }}
                                        />
                                        <CustomizeTypography>
                                            {perfumeDetailData.reviewData[rating.numberOfRating]}{' '}
                                            {t(`common.productDetails.rate`)}
                                        </CustomizeTypography>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={3}
                        md={3}
                        lg={3}
                        sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            [mobileScreen]: {
                                height: '10%',
                            },
                        }}
                    >
                        <CustomizeButton
                            textAction={t(`common.productDetails.ratingNow`)}
                            onHandleClick={'handleFocusReview'}
                        />
                    </Grid>
                </Grid>

                {/* comment region */}
                {/*  check if the user has bought product, bought --> can comment
                -> commented --> hide the comment box region: !findUser?.isCommented
                 */}

                <Grid item container lg={12}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <CustomizeTypography>
                            Give our your review about product {perfumeDetailData?.product.nameEn}
                        </CustomizeTypography>
                    </Grid>
                    {/* rating region*/}
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Rating
                            name="size-medium"
                            defaultValue={ratingValue}
                            sx={{
                                '&.MuiRating-root': {
                                    fontSize: '28px',
                                },
                            }}
                            // not rating --> emptyIcon
                            emptyIcon={
                                <StarBorderIcon fontSize="inherit" sx={{ color: '#faaf00' }} />
                            }
                            onChange={(event, newValue) => {
                                setRatingValue(newValue);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <TextField
                            fullWidth={true}
                            multiline={true}
                            maxRows={4}
                            placeholder="Review our product..."
                            inputRef={reviewInputRef}
                            sx={{
                                mb: 1,
                                '.MuiInputBase-root': {
                                    width: '400px',
                                    fontSize: '14px',
                                    height: '120px',
                                    color: 'white',
                                    borderRadius: '12px',
                                    [mobileScreen]: {
                                        width: '100%',
                                    },
                                },
                                '& .MuiFormHelperText-root': {
                                    fontSize: '12.5px',
                                    color: 'red',
                                    mx: 1,
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#333',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#333',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#333',
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} lg={2}>
                        <CustomizeButton textAction={'Publish'} onHandleClick={handleComment} />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default RatingProduct;
