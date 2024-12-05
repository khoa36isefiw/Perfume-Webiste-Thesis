import { Box, Container, Grid } from '@mui/material';
import React from 'react';

import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import { backTop } from '../goBackTop/goBackTop';

import { converToVND } from '../convertToVND/convertToVND';
import SortProducts from '../SortProducts/SortProducts';
import PerfumeBrands from '../PerfumeBrands/PerfumeBrands';
import EmptyCart from '../EmptyCart/EmptyCart';
import notFound from '../../assets/images/no-results.png';
import useProduct from '../../api/useProduct';
import { ModalDesginV2 } from '../Modal/ModalDesgin';
import Loading from '../Loading/Loading';
import useLoading from '../../hooks/useLoading';
import { useEffect } from 'react';
import CategoryFilter from '../CategoryFilter/CategoryFilter';
import { useTranslation } from 'react-i18next';

function PerfumesCard() {
    const { t } = useTranslation('translate');
    const navigate = useNavigate();
    const language = window.localStorage.getItem('language');
    console.log('language222: ', language);

    const { open, animateStyle, handleClose, setAnimateStyle } = useLoading();
    // const [sortingSelected, setSortingSelected] = useState('');
    // const [brandSelected, setBrandSelected] = useState('');

    const handleNavigationProductDetail = (perfume) => {
        // navigate to the product detail page and pass the perfume data as state
        // navigate(`/${language}/product/${perfume._id}`, { state: { perfume } }); // old playground

        // new playground
        navigate(`/${language}/${perfume.nameEn}?pId=${perfume._id}`); // new playground

        window.localStorage.setItem('productInfor', JSON.stringify(perfume));
        backTop();
    };

    const searchQuery = localStorage.getItem('search_query') || null;
    // JSON.parse(localStorage.getItem('user_data')) || null;
    const brandFilter = JSON.parse(localStorage.getItem('filter')) || null;
    const sortingFilter = JSON.parse(localStorage.getItem('sortBy')) || null;
    console.log('searchQuery: ', searchQuery);

    const {
        data: products,
        isLoading,
        mutate,
        error,
    } = useProduct(searchQuery, brandFilter, sortingFilter?.sortBy, sortingFilter?.sortType);
    useEffect(() => {
        mutate(); // render after choose params to filter
    }, [searchQuery, brandFilter, sortingFilter]);
    console.log('current data âhiahi: ', products);

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
                    <PerfumeBrands />
                    <Box
                        sx={{
                            p: '12px',
                            bgcolor: theme.palette.background.main,
                            borderRadius: 2,
                            // display: 'flex',
                            // alignItems: 'center',

                            my: theme.spacingAxis.boxVerticalAxis,
                        }}
                    >
                        <SortProducts
                            listData={products?.data}
                            // sortingSelected={sortingSelected}
                            // setSortingSelected={setSortingSelected}
                        />
                        <CategoryFilter />
                    </Box>
                    {products?.data?.length ? (
                        <Grid container spacing={2}>
                            {products?.data.map(
                                (perfume, index) =>
                                    perfume.status !== 'inactive' && (
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
                                                onClick={() =>
                                                    handleNavigationProductDetail(perfume)
                                                }
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
                                                                fontSize:
                                                                    theme.fontSize.tablet.text14,
                                                                mb: 0,
                                                                mt: 0,
                                                            },
                                                            [mobileScreen]: {
                                                                fontSize:
                                                                    theme.fontSize.mobile.text14,
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
                                                                fontSize:
                                                                    theme.fontSize.tablet.text14,
                                                                mb: 0,
                                                            },
                                                            [mobileScreen]: {
                                                                fontSize:
                                                                    theme.fontSize.mobile.text14,
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
                                                                '& .MuiRating-iconEmpty .MuiSvgIcon-root':
                                                                    {
                                                                        color: theme.palette.thirth
                                                                            .main,
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
                                                        {perfume.variants[0]?.priceSale !==
                                                            undefined &&
                                                            perfume.variants[0]?.priceSale !==
                                                                null && ( // check data for case price sale === original price --> 0
                                                                <CustomizeTypography
                                                                    sx={{
                                                                        fontWeight: 'bold',
                                                                        zIndex: 99,
                                                                        textDecoration:
                                                                            perfume.discount
                                                                                ? 'line-through'
                                                                                : 'none', // Changed 'null' to 'none'
                                                                        [ipadProScreen]: {
                                                                            mb: 0,
                                                                        },
                                                                        [tabletScreen]: {
                                                                            fontSize:
                                                                                theme.fontSize
                                                                                    .mobile.text14,
                                                                        },
                                                                        [mobileScreen]: {
                                                                            fontSize:
                                                                                theme.fontSize
                                                                                    .mobile.text14,
                                                                            mb: 0,
                                                                        },
                                                                    }}
                                                                >
                                                                    {converToVND(
                                                                        perfume.variants[0]
                                                                            .priceSale,
                                                                    )}
                                                                </CustomizeTypography>
                                                            )}
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    ),
                            )}
                        </Grid>
                    ) : (
                        <EmptyCart
                            imgCart={notFound}
                            title={t('common.searchNo.title')}
                            subTitle={t('common.searchNo.content')}
                            isShowButton={false}
                        />
                    )}
                </Container>
            )}
        </React.Fragment>
    );
}

export default PerfumesCard;
