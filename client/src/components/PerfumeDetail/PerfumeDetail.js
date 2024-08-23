import { Avatar, Box, Button, Container, Divider, Grid, Rating, Typography } from '@mui/material';
import React from 'react';
import CustomizeButton, { CustomizeButtonOutlined } from '../CustomizeButton/CustomizeButton';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';
import { TextFieldCustomize } from '../TextFieldCustomize/TextFieldCustomize';

function PerfumeDetail() {
    return (
        <Container sx={{ mt: 8 }}>
            <Grid container>
                <Grid
                    container
                    item
                    spacing={4}
                    md={8}
                    lg={8}
                    sx={{ height: '600px', overflowY: 'scroll', p: 1 }}
                >
                    <Grid item md={6} lg={6}>
                        <Box>
                            <Box
                                sx={{
                                    height: '400px',
                                    bgcolor: theme.palette.background.main,
                                    borderRadius: '8px',
                                    position: 'relative',
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '4%',
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
                                    - 15%
                                </Box>
                                <Box
                                    component={'img'}
                                    src={
                                        'https://res.cloudinary.com/dxulhqdp3/image/upload/v1724161759/perfumes/men/Homme_Intense_zw7zee.png'
                                    }
                                    sx={{
                                        height: '400px',
                                        objectFit: 'cover',
                                        '&:hover': {
                                            cursor: 'pointer',
                                        },
                                    }}
                                />
                            </Box>

                            <Box
                                component={'img'}
                                src={
                                    'https://res.cloudinary.com/dxulhqdp3/image/upload/v1724161759/perfumes/men/Homme_Intense_zw7zee.png'
                                }
                                sx={{
                                    p: 1,
                                    mt: 1,
                                    height: '100px',
                                    objectFit: 'cover',
                                    border: '1px solid #333',
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <CustomizeTypography sx={{ mb: 1, fontSize: '20px', fontWeight: 'bold' }}>
                            Maison Francis Kurkdjian Paris Baccarat Rouge 540 Extrait De Parfum
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ mb: 1 }}>
                            <strong>Thương hiệu: </strong>
                            <span>Maison Francis Kurkdjian Paris</span>
                        </CustomizeTypography>
                        <CustomizeTypography>
                            <strong>Tình trạng: </strong>
                            <span
                                style={{
                                    color: theme.palette.text.primary,
                                    fontWeight: 'bold',
                                }}
                            >
                                Còn hàng
                            </span>
                        </CustomizeTypography>

                        <CustomizeTypography>
                            Hương thơm sang trọng và độc đáo, lý tưởng cho những dịp đặc biệt và
                            tiệc tối đẳng cấp.
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
                            <Box sx={{ height: '20px', bgcolor: '#fff', width: '1px', ml: 1 }} />
                            <CustomizeTypography sx={{ ml: 1 }}>295 đã bán</CustomizeTypography>
                        </Box>

                        <Box sx={{ display: 'flex' }}>
                            <CustomizeTypography
                                fontBold={true}
                                sx={{ textDecoration: 'line-through' }}
                            >
                                10.500.000 ₫
                            </CustomizeTypography>
                            <CustomizeTypography
                                sx={{
                                    color: theme.palette.text.primary,
                                    fontWeight: 'bold',
                                    ml: 1,
                                }}
                            >
                                9.980.000 ₫
                            </CustomizeTypography>
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
                                sx={{ height: '15px', width: '15px', mr: 1 }}
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
                <Grid item md={4} lg={4} sx={{ bgcolor: '#fff' }}>
                    something is here?
                </Grid>
            </Grid>
        </Container>
    );
}

export default PerfumeDetail;
