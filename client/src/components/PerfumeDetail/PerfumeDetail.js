import { Avatar, Box, Button, Container, Divider, Grid, IconButton, Rating } from '@mui/material';
import React from 'react';
import CustomizeButton, { CustomizeButtonOutlined } from '../CustomizeButton/CustomizeButton';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { theme } from '../../Theme/Theme';
import { TextFieldCustomize } from '../TextFieldCustomize/TextFieldCustomize';
import { quickViewImage } from './perfumeDetailData';
import { useLocation } from 'react-router-dom';

function PerfumeDetail() {
    const location = useLocation();
    // get the perfume data passed from navigation
    const { perfume } = location.state || {};

    console.log('length of list: ', quickViewImage.length);
    const [selectedImage, setSelectedImage] = React.useState(0);

    // Handle Previous button click
    const handlePrevious = () => {
        setSelectedImage(
            (prevIndex) => (prevIndex - 1 + quickViewImage.length) % quickViewImage.length,
        );
    };

    // Handle Next button click
    const handleNext = () => {
        setSelectedImage((prevIndex) => (prevIndex + 1) % quickViewImage.length);
    };

    console.log('setSelectedImage', selectedImage);
    console.log('perfume: ', perfume);

    return (
        <Container sx={{ mt: 16 }}>
            <Grid container>
                <Grid
                    container
                    item
                    spacing={4}
                    md={8}
                    lg={12}
                    sx={{ height: '600px', overflowY: 'scroll', p: 1 }}
                >
                    <Grid item md={6} lg={6}>
                        <Box>
                            <Box
                                sx={{
                                    height: '400px',
                                    // width: '400px',
                                    bgcolor: theme.palette.background.main,
                                    borderRadius: '8px',
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {/* discount must !== 0 */}
                                {perfume.perfumeDiscount !== 0 && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: '10%',
                                            left: '10%',
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
                                        {/* - 15% */}- {perfume.perfumeDiscount}%
                                    </Box>
                                )}

                                <IconButton onClick={handlePrevious}>
                                    <ArrowBackIosIcon
                                        sx={{
                                            fontSize: '28px',
                                            color: '#fff',
                                            '&:hover': {
                                                color: theme.palette.text.primary.primary,
                                            },
                                        }}
                                    />
                                </IconButton>
                                <Box
                                    component={'img'}
                                    // src={perfume.perfumeImage}
                                    src={perfume.quickViewImage[selectedImage]}
                                    sx={{
                                        height: '100%',
                                        objectFit: 'cover',
                                        '&:hover': {
                                            cursor: 'pointer',
                                        },
                                    }}
                                />
                                <IconButton onClick={handleNext}>
                                    <ArrowForwardIosIcon
                                        sx={{
                                            fontSize: '28px',
                                            color: '#fff',
                                            '&:hover': {
                                                color: theme.palette.text.primary,
                                            },
                                        }}
                                    />
                                </IconButton>
                            </Box>

                            <Box sx={{ display: 'flex', overflowX: 'scroll' }}>
                                {perfume.quickViewImage.map((image, index) => (
                                    <Box
                                        key={index}
                                        alt="Quick View Image"
                                        component={'img'}
                                        src={
                                            // 'https://res.cloudinary.com/dxulhqdp3/image/upload/v1724161759/perfumes/men/Homme_Intense_zw7zee.png'
                                            image
                                        }
                                        sx={{
                                            p: 1,
                                            mt: 1,
                                            ml: 1,
                                            height: '100px',
                                            objectFit: 'cover',
                                            border:
                                                selectedImage === index
                                                    ? `2px solid ${theme.palette.text.primary}`
                                                    : '',
                                            // border: '1px solid #333',
                                            transition: 'border 0.3s ease',
                                            '&:hover': {
                                                cursor: 'pointer',
                                            },
                                        }}
                                        onClick={() => setSelectedImage(index)}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={6} lg={6}>
                        {/* product name */}
                        <CustomizeTypography sx={{ mb: 1, fontSize: '20px', fontWeight: 'bold' }}>
                            {/* Maison Francis Kurkdjian Paris Baccarat Rouge 540 Extrait De Parfum */}
                            {perfume.perfumeName}
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ mb: 1 }}>
                            <strong>Thương hiệu: </strong>
                            <span>{perfume.brand}</span>
                            {/* <span>Maison Francis Kurkdjian Paris</span> */}
                        </CustomizeTypography>
                        <CustomizeTypography>
                            <strong>Tình trạng: </strong>
                            <span
                                style={{
                                    color:
                                        perfume.perfumeQuantity !== 0
                                            ? theme.palette.text.verified
                                            : theme.palette.text.primary,
                                    fontWeight: 'bold',
                                }}
                            >
                                {perfume.perfumeQuantity !== 0 ? 'Còn hàng' : 'Hết Hàng'}
                            </span>
                        </CustomizeTypography>

                        <CustomizeTypography>
                            {/* Hương thơm sang trọng và độc đáo, lý tưởng cho những dịp đặc biệt và
                            tiệc tối đẳng cấp. */}
                            {perfume.shortDescription}
                        </CustomizeTypography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                // justifyContent: 'space-between',
                            }}
                        >
                            <CustomizeTypography>5.0</CustomizeTypography>
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
                                    ml: 1,
                                    mb: 1,
                                }}
                            />
                            <CustomizeTypography
                                sx={{
                                    ml: 1,
                                    textDecoration: 'underline',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        color: theme.palette.text.primary,
                                        fontWeight: 'bold',
                                    },
                                }}
                                // handle for showing comments and reviews
                                // onClick={}
                            >
                                (2 đánh giá)
                            </CustomizeTypography>
                            <Box
                                sx={{
                                    height: '20px',
                                    bgcolor: '#fff',
                                    width: '1px',
                                    ml: 1,
                                    mb: 1,
                                }}
                            />
                            <CustomizeTypography sx={{ ml: 1 }}>295 đã bán</CustomizeTypography>
                        </Box>

                        <Box sx={{ display: 'flex' }}>
                            {/* original price */}
                            <CustomizeTypography
                                fontBold={true}
                                sx={{ textDecoration: perfume.discount ? 'line-through' : null }}
                            >
                                {/* 10.500.000 ₫ */}
                                {perfume.perfumePriceVND}đ
                            </CustomizeTypography>
                            {/* price sale off */}
                            {perfume.discount && perfume.perfumePriceDiscount !== null && (
                                <CustomizeTypography
                                    sx={{
                                        color: theme.palette.text.primary,
                                        fontWeight: 'bold',
                                        ml: 2,
                                    }}
                                >
                                    {/* 9.980.000 ₫ */}
                                    {perfume.perfumePriceDiscount}đ
                                </CustomizeTypography>
                            )}
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                            <CustomizeButtonOutlined textAction={'Add to cart'} />
                            {/* <CustomizeButton textAction={'Add to cart'} /> */}
                            <Box sx={{ ml: 2 }}>
                                <CustomizeButton textAction={'Buy Now'} />
                            </Box>
                        </Box>
                        <Divider sx={{ bgcolor: '#fff', my: 4 }} />
                        {/* for membership */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {/* ..... don't know what is it :) */}
                            <Avatar
                                sx={{ height: '15px', width: '15px', mr: 1, mb: 1 }}
                                src={'https://orchard.vn/wp-content/uploads/2018/04/red-dot.gif'}
                            />
                            <CustomizeTypography>
                                <strong
                                    style={{
                                        textTransform: 'uppercase',
                                        textDecoration: 'underline',
                                        color: theme.palette.text.main,
                                    }}
                                >
                                    membership:
                                </strong>
                                <span> Giá đặc biệt dành cho khách hàng thân thiết</span>
                            </CustomizeTypography>
                        </Box>
                        <Box sx={{ my: 2 }}>
                            <TextFieldCustomize placeholder={'Enter phone number...'} />
                            <Button
                                variant="contained"
                                sx={{
                                    py: 1,
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,

                                    bgcolor: theme.palette.secondaryText,
                                    fontSize: '14px',
                                    textTransform: 'initial',
                                    '&:hover': {
                                        bgcolor: theme.palette.secondaryText,
                                    },
                                }}
                            >
                                Check
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default PerfumeDetail;
