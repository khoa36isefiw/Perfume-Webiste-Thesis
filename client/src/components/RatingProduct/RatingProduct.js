import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Grid, TextField, Rating, Stack } from '@mui/material';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import StarIcon from '@mui/icons-material/Star';
import { ratingData } from './ratingData';
import CustomizeButton from '../CustomizeButton/CustomizeButton';
import { useDispatch, useSelector } from 'react-redux';

import { saveComments } from '../../redux/feature/CommentsManagement/CommentsManagementSlice';

import StarBorderIcon from '@mui/icons-material/StarBorder';

function RatingProduct({ perfumeDetailData }) {
    const dispatch = useDispatch();
    const reviewInputRef = useRef(null);
    const [commentRights, setCommentRights] = useState(false);

    const loggedInAccount = useSelector((state) => state.accountManagement.loggedInAccount);
    const [comments, setComments] = useState([]);
    const [ratingValue, setRatingValue] = useState(0);
    // const []

    const [hasCommented, setHasCommented] = useState(false);
    const [useCommnted, setUseCommnted] = useState(false);
    const commentsList = useSelector(
        (state) => state.commentsManagement.listComments[perfumeDetailData.perfumeID] || [], // get data follow their productId
    );

    console.log('commentsList: ', commentsList);

    const findUser = commentsList.find((user) => user?.userId === loggedInAccount?.userId);
    // const findUser = commentsList.filter((user) => {
    //     return user?.userId === loggedInAccount.userId;
    // });

    console.log('findUser2:', findUser);

    const orderHistory = useSelector(
        // get for each user
        (state) => state.checkoutManagement.listOrders[loggedInAccount?.userId] || [],
    );

    useEffect(() => {
        console.log('orderHistory: ', orderHistory);
    }, [orderHistory]);
    // console.log('orderHistory: ', orderHistory);

    useEffect(() => {
        setHasCommented(false);
    }, [findUser?.isCommented, !hasCommented]);

    useEffect(() => {
        // check if the user bought this product?
        const purchaseCount = orderHistory.reduce((count, item) => {
            const isBought = item.purchaseInfo.products.some(
                (product) => product.productId === perfumeDetailData.perfumeID,
            );
            return isBought ? count + 1 : count;
        }, 0);

        // console.log('isBought: ', isBought);
        setCommentRights(purchaseCount > 0);
    }, [orderHistory, perfumeDetailData.perfumeID]);

    const handleFocusReview = () => {
        if (reviewInputRef.current) {
            reviewInputRef.current.focus();
        }
    };

    const handleComment = () => {
        const newComment = reviewInputRef.current.value; // value of textfield by ref

        const timeComment = new Date();

        // create date options with YYYY/MM/DD, AM/PM format
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true, // adds AM/PM to the time format
        };

        let currentDate = new Date(timeComment).toLocaleString('en-CA', options);

        if (newComment) {
            const userCommentInformation = {
                userId: loggedInAccount?.userId,
                userFullName: loggedInAccount.firstName + ' ' + loggedInAccount.lastName,
                userImage: loggedInAccount.userImage,
                userMail: loggedInAccount.email,
                userComment: newComment,
                isBought: true,
                isCommented: true,
                commentTime: currentDate,
                ratingValue,
            };

            const productId = perfumeDetailData.perfumeID;

            // // save userCommentInformation by [productId]
            setComments({
                ...comments,
                // [productId]: hold an array of userCommentInformation objects
                // check the current state of comments, if comment exist in the product
                //has id append the new comment to the existing array
                [productId]: comments[productId] //
                    ? [...comments[productId], userCommentInformation] // add new comment to existing array
                    : [userCommentInformation], // create a new array with the first comment
            });
            dispatch(saveComments({ productId, data: userCommentInformation }));
            reviewInputRef.current.value = ''; // remove text
            setCommentRights(false); // reset permissions
            setHasCommented(true);
        }
    };

    // console.log('current rights: ', commentRights);

    // returns the length of the list of comments based on the rating number
    // trả về độ dài của list comments dựa trên rating number
    const getRatingCount = (ratingNumber) => {
        // return the list of users based on ratingNumber
        return commentsList.filter((comment) => comment.ratingValue === ratingNumber).length;
    };

    // calculating the average rating
    const calculateAverageRating = () => {
        if (commentsList.length === 0) return 0; // doesn't have rating
        // calculate total of rating value from comment list
        const totalRating = commentsList.reduce((acc, comment) => acc + comment.ratingValue, 0);
        return (totalRating / commentsList.length).toFixed(1);
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
                                    {/* 5.0 */}
                                    {calculateAverageRating()}
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
                            {ratingData.map((rating, index) => {
                                const ratingCount = getRatingCount(rating.numberOfRating);
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
                                                    ratingCount > 0
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
                                            {ratingCount} đánh giá
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
                            textAction={'Đánh giá ngay'}
                            onHandleClick={handleFocusReview}
                        />
                    </Grid>
                </Grid>
                {/* {!findUser?.isCommented && commentRights && ( */}
                {!findUser?.isCommented && (
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <CustomizeTypography sx={{ fontSize: '18px', fontWeight: '600', mt: 4 }}>
                            Write your review at here...
                        </CustomizeTypography>
                    </Grid>
                )}
                {/* rating */}
                {/* {!findUser?.isCommented && commentRights && ( */}
                {!findUser?.isCommented && (
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
                )}

                {/*  check if the user has bought product, bought --> can comment
                -> commented --> hide the comment box region: !findUser?.isCommented
                 */}
                {/* {!findUser?.isCommented && commentRights && ( */}
                {!findUser?.isCommented && (
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
