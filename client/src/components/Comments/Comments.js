import {
    Avatar,
    Box,
    Container,
    Divider,
    IconButton,
    Rating,
    Button,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';

import VerifiedIcon from '@mui/icons-material/Verified';

import { useTranslation } from 'react-i18next';
import useReviewOnProduct from '../../api/useReviewOnProduct';
import { formatDateWithTime } from '../FormatDate/formatDate';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';

function Comments({ perfumeDetailData, reference }) {
    console.log('perfumeDetailData: ', perfumeDetailData);

    const { data: reviewData, isLoading } = useReviewOnProduct(perfumeDetailData?.product?._id);
    console.log('reviewData: ', reviewData?.data);
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const itemsPerPage = 5; // Number of comments per page

    // Calculate the total number of pages
    const totalPages = Math.ceil(reviewData?.data?.length / itemsPerPage);
    const currentComments =
        !isLoading && Array.isArray(reviewData?.data)
            ? reviewData?.data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            : [];

    // Handler for page navigation
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

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
            {/* <SampleCommentData commentsData={commentsData} /> */}
            <CommentOnProductData commentsData={currentComments} />

            {/* Pagination Controls */}
            {reviewData?.data?.length > 0 && (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 2,
                            mt: 3,
                        }}
                    >
                        {/* Previous Button */}
                        <Button
                            variant="text"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            startIcon={<SkipPreviousIcon />}
                            sx={{
                                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                color: theme.palette.background.thirth,
                                textTransform: 'initial',
                                fontSize: 12.5,
                                '&.Mui-disabled': {
                                    color: '#EBEBE4',
                                },
                                '&:hover': {
                                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                },
                            }}
                        >
                            Prev
                        </Button>

                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, index) => (
                            <Button
                                key={index + 1}
                                variant={currentPage === index + 1 ? 'contained' : 'outlined'}
                                onClick={() => handlePageChange(index + 1)}
                                sx={{
                                    borderRadius: '50%',
                                    minWidth: 40,
                                    height: 40,
                                    width: 40,
                                    fontSize: 13,
                                    borderColor: 'white',
                                    color: 'white',
                                    bgcolor:
                                        currentPage === index + 1
                                            ? theme.palette.background.thirth
                                            : '',
                                    '&:hover': {
                                        borderColor: 'white',
                                        bgcolor: theme.palette.background.thirth,
                                    },
                                }}
                            >
                                {index + 1}
                            </Button>
                        ))}

                        {/* Next Button */}
                        <Button
                            variant="text"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            endIcon={<SkipNextIcon />}
                            sx={{
                                color: theme.palette.background.thirth,
                                textTransform: 'initial',
                                fontSize: 12.5,
                                '&.Mui-disabled': {
                                    color: '#EBEBE4',
                                },
                                '&:hover': {
                                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                },
                            }}
                        >
                            Next
                        </Button>
                    </Box>

                    {/* Current Page Info */}
                    <Typography
                        sx={{
                            textAlign: 'center',
                            mt: 2,
                            color: 'gray',
                        }}
                    >
                        Page {currentPage} of {totalPages}
                    </Typography>
                </>
            )}
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

const CommentOnProductData = ({ commentsData }) => {
    const { t } = useTranslation('translate');
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
                                        {t('common.review.bought')}
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
