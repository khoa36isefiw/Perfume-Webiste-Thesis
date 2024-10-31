import { Box, Button, Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { perfumeData } from './perfumeData';
import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import { backTop } from '../goBackTop/goBackTop';
import BoltIcon from '@mui/icons-material/Bolt';
import { converToVND } from '../convertToVND/convertToVND';
import SortProducts from '../SortProducts/SortProducts';
import PerfumeBrands from '../PerfumeBrands/PerfumeBrands';
import EmptyCart from '../EmptyCart/EmptyCart';
import notFound from '../../assets/images/no-results.png';
import useProduct from '../../api/useProduct';
import ModalDesgin, { ModalDesginV2 } from '../Modal/ModalDesgin';
import Loading from '../Loading/Loading';
import useLoading from '../../hooks/useLoading';

function PerfumesCard() {
    const navigate = useNavigate();
    const { open, animateStyle, handleOpen, handleClose, setOpen, setAnimateStyle } = useLoading();
    const [sortedList, setSortedList] = useState([]);
    const [selectedBrandList, setSelectedBrandList] = useState([]);

    const handleNavigationProductDetail = (perfume) => {
        // navigate to the product detail page and pass the perfume data as state
        navigate(`/product/${perfume._id}`, { state: { perfume } });
        backTop();
    };

    const mixedFilter =
        sortedList.length > 0
            ? sortedList
            : selectedBrandList.length > 0
            ? selectedBrandList
            : perfumeData;
    const { data: products, isLoading, error } = useProduct();

    console.log('products from api: ', products?.data);

    return (
        <React.Fragment>
            {isLoading ? (
                <ModalDesginV2
                    open={open}
                    onHandleClose={handleClose}
                    animateStyle={animateStyle}
                    setAnimateStyle={setAnimateStyle}
                >
                    <Loading />
                </ModalDesginV2>
            ) : (
                <Container
                    sx={{
                        my: theme.spacingAxis.boxVerticalAxis,
                        [mobileScreen]: {
                            paddingLeft: 0,
                            paddingRight: 0,
                        },
                    }}
                >
                    <PerfumeBrands
                        listData={products?.data}
                        setSelectedBrandList={setSelectedBrandList}
                    />
                    <SortProducts listData={products?.data} setSortedList={setSortedList} />
                    {products?.data?.length ? (
                        <Grid container spacing={2}>
                            {products?.data.map((perfume, index) => (
                                <Grid item xs={6} sm={4} md={3} lg={3} key={index}>
                                    <Box
                                        sx={{
                                            height: '350px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            // alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '8px',
                                            bgcolor: theme.palette.bestSelling,
                                            py: 1,
                                            position: 'relative',
                                            '&:hover': {
                                                cursor: 'pointer',
                                            },
                                            [mobileScreen]: {
                                                // width: '200px',
                                                p: 1,
                                                py: 0,
                                            },
                                        }}
                                        onClick={() => handleNavigationProductDetail(perfume)}
                                    >
                                        {perfume.discount && (
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
                                                - {perfume.perfumeDiscount}%
                                            </Box>
                                        )}

                                        {perfume.flashSale && (
                                            <Button
                                                sx={{
                                                    position: 'absolute',
                                                    top: '4%',
                                                    right: 0,
                                                    height: '30px',
                                                    width: '80px',
                                                    // bgcolor: 'red',
                                                    backgroundColor: theme.palette.flashSale.bg,
                                                    borderRadius: '8px',
                                                    fontSize: '14px',
                                                    // color: '#fff',
                                                    fontWeight: 'bold',
                                                    textAlign: 'center',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: theme.palette.flashSale.icon,
                                                    '&:hover': {
                                                        bgcolor: theme.palette.flashSale.bg,
                                                    },
                                                }}
                                                startIcon={<BoltIcon sx={{ fontSize: '24px' }} />}
                                            >
                                                - {perfume.flashSaleNumber}%
                                            </Button>
                                        )}

                                        <Box
                                            component={'img'}
                                            src={perfume.imagePath[0]}
                                            sx={{
                                                height: '180px',
                                                width: '180px',
                                                objectFit: 'cover',
                                                margin: 'auto',
                                                // display: 'flex',
                                                // alignItems: 'center',
                                                // justifyContent: 'center',

                                                [tabletScreen]: {
                                                    mt: 2,
                                                },
                                                [mobileScreen]: {
                                                    mt: 2,
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
                                                {perfume.brand.nameEn}
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
                                                }}
                                            >
                                                <Rating
                                                    readOnly={true}
                                                    value={perfume.rating}
                                                    // MuiRating-root MuiRating-sizeMedium css-1qqgbpl-MuiRating-root
                                                    sx={{
                                                        fontSize: '18px',
                                                        // change border color
                                                        '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
                                                            color: theme.palette.thirth.main,
                                                        },
                                                        mb: 1,
                                                        [mobileScreen]: {
                                                            mb: 0,
                                                        },
                                                    }}
                                                />
                                                {/* number of rating */}
                                                <CustomizeTypography
                                                    sx={{
                                                        ml: 1,
                                                    }}
                                                >
                                                    ({perfume.numReviews})
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
                                                {perfume.variants[0]?.priceSale && (
                                                    <CustomizeTypography
                                                        sx={{
                                                            fontWeight: 'bold',
                                                            zIndex: 99,
                                                            textDecoration: perfume.discount
                                                                ? 'line-through'
                                                                : 'null',
                                                            [ipadProScreen]: {
                                                                mb: 0,
                                                            },
                                                            [tabletScreen]: {
                                                                fontSize:
                                                                    theme.fontSize.mobile.text14,
                                                            },
                                                            [mobileScreen]: {
                                                                fontSize:
                                                                    theme.fontSize.mobile.text14,
                                                                mb: 0,
                                                            },
                                                        }}
                                                    >
                                                        {/* 3.280.000 */}
                                                        {converToVND(
                                                            perfume.variants[0]?.priceSale,
                                                        )}
                                                    </CustomizeTypography>
                                                )}

                                                <CustomizeTypography
                                                    sx={{
                                                        color: perfume.discount
                                                            ? theme.palette.thirth.main
                                                            : 'transparent',
                                                        fontWeight: 'bold',
                                                        zIndex: 99,
                                                        ml: 2,
                                                        [ipadProScreen]: {
                                                            ml: 0,
                                                        },
                                                        [tabletScreen]: {
                                                            fontSize: theme.fontSize.tablet.text14,
                                                            ml: 0,
                                                        },

                                                        [mobileScreen]: {
                                                            fontSize: theme.fontSize.mobile.text14,
                                                            ml: 0,
                                                        },
                                                    }}
                                                >
                                                    {/* 2.280.000 */}
                                                    {perfume.discount
                                                        ? converToVND(perfume.perfumePriceDiscount)
                                                        : '-'}
                                                </CustomizeTypography>
                                            </Box>
                                        </Box>

                                        {/* flash sale, discount, chương trình khuyến mãi */}
                                        {/* {perfume.flashSale && ( */}
                                        {/* <Box
                                    sx={{
                                        px: 1,
                                        visibility: perfume.flashSale ? 'visible' : 'hidden',
                                        [ipadProScreen]: {
                                            mb: 2,
                                        },
                                        [tabletScreen]: {
                                            mb: 2,
                                        },
                                        [mobileScreen]: {
                                            mb: 4,
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: '20px',
                                            borderRadius: '12px',
                                            bgcolor: '#ffbda6',
                                            position: 'relative',
                                        }}
                                    >
                                        <Box
                                            src={
                                                'https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/flashsale/c5316dd01de2b0d41d26.png'
                                            }
                                            alt="Flash Sale"
                                            component={'img'}
                                            sx={{
                                                height: '25px',
                                                width: '25px',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                transform: 'translateY(-15px)',
                                            }}
                                        />

                                        <Box
                                            sx={{
                                                width: '50%',
                                                overflow: 'hidden',
                                                background:
                                                    'linear-gradient(270deg, #ffb000, #eb1717)',
                                                height: '100%',
                                                borderRadius: '12px',
                                            }}
                                        />

                                        <CustomizeTypography
                                            sx={{
                                                position: 'absolute',
                                                textAlign: 'center',
                                                fontSize: '14px',
                                                fontWeight: 'bold',
                                                // color: '#555',
                                                borderRadius: '12px',
                                                top: 0,
                                                left: '10%',
                                                zIndex: 99,
                                                mb: 0,
                                                [mobileScreen]: {
                                                    fontSize: theme.fontSize.mobile.text12,
                                                },
                                            }}
                                        >
                                            Flash Sale
                                        </CustomizeTypography>
                                    </Box>
                                </Box> */}
                                        {/* )} */}
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <EmptyCart
                            imgCart={notFound}
                            title={'Sorry, no result found'}
                            subTitle={
                                'What you searched was unfortunately not found or does not exist'
                            }
                            isShowButton={false}
                        />
                    )}
                </Container>
            )}
        </React.Fragment>
    );
}

export default PerfumesCard;
