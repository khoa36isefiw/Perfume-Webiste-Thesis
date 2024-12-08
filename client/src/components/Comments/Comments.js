import { Avatar, Box, Container, Divider, IconButton, Rating } from '@mui/material';
import React from 'react';
import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';

import { commentsData } from './commentsData';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useReviewOnProduct from '../../api/useReviewOnProduct';
import { formatDate, formatDateWithTime } from '../FormatDate/formatDate';

function Comments({ perfumeDetailData, reference }) {
    // const commentsList =
    //     useSelector((state) => state.commentsManagement.listComments[perfumeDetailData.perfumeID] || [], // get data follow their productId);
    const commentsList = [];
    const { t } = useTranslation('translate');

    const { data: reviewData, isLoading } = useReviewOnProduct(perfumeDetailData?._id);
    console.log('reviewData: ', reviewData?.data);

    return (
        <Container
            sx={{
                mt: 4,
                [mobileScreen]: {
                    px: 1,
                },
            }}
            ref={reference}
        >
            <SampleCommentData commentsData={commentsData} />
            <CommentOnProductData commentsData={reviewData?.data} />
        </Container>
    );
}

export default Comments;

const ShopResponse = () => {
    return (
        <Box
            sx={{
                width: '100%',
                minheight: '50px',
                bgcolor: '#333',
                borderRadius: '8px',
                p: 1,
            }}
        >
            <CustomizeTypography sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
                Shop's Response
            </CustomizeTypography>
            <CustomizeTypography>Cảm ơn bạn đã mua hàng ủng hộ shop!</CustomizeTypography>
        </Box>
    );
};

const SampleCommentData = ({ commentsData }) => {
    return (
        <>
            {commentsData.map((comment, index) => (
                <Box key={index} sx={{ display: 'flex', mt: 2 }}>
                    {/* user image */}
                    <Avatar alt="user image" src={comment.userImage} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                        {/* name */}
                        <Box sx={{ ml: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CustomizeTypography
                                    sx={{
                                        fontSize: '16px',
                                        [ipadProScreen]: {
                                            width: '120px',
                                        },
                                        [tabletScreen]: {
                                            width: '120px',
                                        },
                                        [mobileScreen]: {
                                            fontSize: '14px',
                                            width: '100px',
                                        },
                                    }}
                                >
                                    {comment.userName}
                                </CustomizeTypography>
                                <IconButton>
                                    <VerifiedIcon
                                        sx={{
                                            fontSize: '18px',
                                            color: theme.palette.text.verified,
                                            mb: 1,
                                        }}
                                    />
                                </IconButton>
                                <CustomizeTypography
                                    sx={{
                                        fontSize: '14px',
                                        fontStyle: 'italic',
                                        color: theme.palette.text.verified,
                                        [mobileScreen]: {
                                            fontSize: '12px',
                                        },
                                    }}
                                >
                                    Đã mua hàng tại Tomtoc Perfumes
                                </CustomizeTypography>
                            </Box>
                            {/* stars, rating */}
                            <Rating
                                readOnly
                                value={5}
                                // MuiRating-root MuiRating-sizeMedium css-1qqgbpl-MuiRating-root
                                sx={{
                                    fontSize: '18px',
                                    // change border color
                                    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
                                        color: theme.palette.thirth.main,
                                    },
                                    mb: 1,
                                }}
                            />
                            <CustomizeTypography sx={{ fontSize: '14px', color: '#d9d9d9' }}>
                                {comment.timeCommented}
                            </CustomizeTypography>
                            {/* content */}
                            <CustomizeTypography>{comment.content}</CustomizeTypography>
                            <ShopResponse />
                        </Box>
                        {index !== commentsData.length - 1 && (
                            <Divider sx={{ bgcolor: '#fff', my: 1 }} />
                        )}
                    </Box>
                </Box>
            ))}
        </>
    );
};

const CommentOnProductData = ({ commentsData }) => {
    return (
        <>
            {Array.isArray(commentsData) &&
                commentsData.length > 0 &&
                commentsData.map((comment, index) => (
                    <Box key={index} sx={{ display: 'flex', mt: 2 }}>
                        {/* user image */}
                        <Avatar alt="user image" src={comment.user.imagePath} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            {/* name */}
                            <Box sx={{ ml: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CustomizeTypography
                                        sx={{
                                            fontSize: '16px',
                                            [ipadProScreen]: {
                                                width: '120px',
                                            },
                                            [tabletScreen]: {
                                                width: '120px',
                                            },
                                            [mobileScreen]: {
                                                fontSize: '14px',
                                                width: '100px',
                                            },
                                        }}
                                    >
                                        {comment.user.firstName + ' ' + comment.user.lastName}
                                    </CustomizeTypography>
                                    <IconButton>
                                        <VerifiedIcon
                                            sx={{
                                                fontSize: '18px',
                                                color: theme.palette.text.verified,
                                                mb: 1,
                                            }}
                                        />
                                    </IconButton>
                                    <CustomizeTypography
                                        sx={{
                                            fontSize: '14px',
                                            fontStyle: 'italic',
                                            color: theme.palette.text.verified,
                                            [mobileScreen]: {
                                                fontSize: '12px',
                                            },
                                        }}
                                    >
                                        Đã mua hàng tại Tomtoc Perfumes
                                    </CustomizeTypography>
                                </Box>
                                {/* stars, rating */}
                                <Rating
                                    readOnly
                                    value={comment.rating}
                                    // MuiRating-root MuiRating-sizeMedium css-1qqgbpl-MuiRating-root
                                    sx={{
                                        fontSize: '18px',
                                        // change border color
                                        '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
                                            color: theme.palette.thirth.main,
                                        },
                                        mb: 1,
                                    }}
                                />
                                <CustomizeTypography sx={{ fontSize: '14px', color: '#d9d9d9' }}>
                                    {formatDateWithTime(comment.createdAt)}
                                </CustomizeTypography>
                                {/* content */}
                                <CustomizeTypography>{comment.comment}</CustomizeTypography>
                                <ShopResponse />
                            </Box>
                            {index !== commentsData.length - 1 && (
                                <Divider sx={{ bgcolor: '#fff', my: 1 }} />
                            )}
                        </Box>
                    </Box>
                ))}
        </>
    );
};
