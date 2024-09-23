import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Grid, TextField } from '@mui/material';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import StarIcon from '@mui/icons-material/Star';
import { ratingData } from './ratingData';
import CustomizeButton from '../CustomizeButton/CustomizeButton';
import { useSelector } from 'react-redux';
import { productInformationData } from '../ProductInformation/productInformationData';

function RatingProduct({ perfumeDetailData }) {
    const reviewInputRef = useRef(null);
    const [commentRights, setCommentRights] = useState(false);
    const loggedInAccount = useSelector((state) => state.accountManagement.loggedInAccount);
    const [comments, setComments] = useState([]);

    const orderHistory = useSelector(
        // get for each user
        (state) => state.checkoutManagement.listOrders[loggedInAccount?.userId] || [],
    );

    useEffect(() => {
        // check if the user bought this product?
        const isBought = orderHistory.some((item) =>
            item.purchaseInfo.products.some(
                (product) => product.productId === perfumeDetailData.perfumeID,
            ),
        );
        console.log('isBought: ', isBought);
        setCommentRights(isBought);
    }, [orderHistory]);

    console.log('order ahaihaiai: ', orderHistory);

    const handleFocusReview = () => {
        if (reviewInputRef.current) {
            reviewInputRef.current.focus();
        }
    };

    console.log('list commnets: ', comments);

    const handleComment = () => {
        const newComment = reviewInputRef.current.value; // value of textfield by ref
        if (newComment) {
            setComments([...comments, newComment]); // add comment to list
            reviewInputRef.current.value = ''; // remove text
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
                Đánh giá & Hỏi đáp về sản phẩm
            </CustomizeTypography>
            {/* number of ratings */}
            <CustomizeTypography>
                2 đánh giá cho Maison Francis Kurkdjian Paris Baccarat Rouge 540 Extrait De Parfum
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
                                    5.0
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
                            <CustomizeTypography>Đánh giá trung bình</CustomizeTypography>
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
                            {ratingData.map((rating, index) => (
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
                                            bgcolor: theme.palette.text.secondary,
                                            [ipadProScreen]: {
                                                width: '120px',
                                            },
                                            [tabletScreen]: {
                                                width: '100px',
                                            },
                                        }}
                                    />
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <CustomizeTypography sx={{ ml: 1 }}>
                                            100%
                                        </CustomizeTypography>
                                        <Box
                                            sx={{
                                                height: '15px',
                                                width: '1px',
                                                bgcolor: '#fff',
                                                mx: 1,
                                                mb: 1,
                                            }}
                                        />
                                        <CustomizeTypography sx={{ ml: 1 }}>
                                            2 đánh giá
                                        </CustomizeTypography>
                                    </Box>
                                </Box>
                            ))}
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
                            textAction={'Đánh giá ngay'}
                            onHandleClick={handleFocusReview}
                        />
                    </Grid>
                </Grid>
                {commentRights && (
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <CustomizeTypography sx={{ fontSize: '18px', fontWeight: '600', mt: 4 }}>
                            Write your review at here...
                        </CustomizeTypography>
                    </Grid>
                )}

                {commentRights && (
                    <Grid item container lg={12}>
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
                )}
            </Grid>
        </Container>
    );
}

export default RatingProduct;
