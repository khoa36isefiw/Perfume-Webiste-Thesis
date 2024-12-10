function PerfumesCard() {
    
    
    const selectedCategory = JSON.parse(window.localStorage.getItem('category')) || '';
    console.log('selectedCategory: ', selectedCategory);
    
    const [visibleCount, setVisibleCount] = useState(8);
    
    const [cId, setCId] = useState(null);
    const {
        data: products,
        isLoading,
        mutate,
        error,
    } = useProduct(searchQuery, brandFilter, sortingFilter?.sortBy, sortingFilter?.sortType);
    useEffect(() => {
        mutate(); // render after choose params to filter
    }, [searchQuery, brandFilter, sortingFilter]);
    // console.log('current data âhiahi: ', products);

    // console.log('productDataByCategory: ', productDataByCategory?.data);
    const [productData, setProductData] = useState(products?.data);


    useEffect(() => {
        const handleScroll = () => {
            // check if it doesn't load all product
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight &&
                visibleCount < products?.data?.length
            ) {
                setVisibleCount((prev) => prev + 8);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [selectedCategory._id]);

    useEffect(() => {
        if (selectedCategory !== '') {
            const fetchData = async () => {
                const responseData = await productAPI.getProductByCategory(selectedCategory._id);
                if (responseData) {
                    console.log('responseData: ', responseData);
                    setProductData(responseData?.data);
                }
            };
            fetchData();
        } else {
            setProductData(products?.data);
        }
    }, [selectedCategory, isLoading]);
    console.log('productData:', productData);

    return (
        <React.Fragment>
            
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
                        <CategoryFilter setCId={setCId} />
                    </Box>
                    {productData?.length ? (
                        <Grid container spacing={2}>
                            {/* loading product  */}
                            {/* {products?.data?.slice(0, visibleCount).map( */}
                            {productData.map(
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
                                                        <CustomizeTypography sx={{ mr: '0.5px' }}>
                                                            {perfume.rating.toFixed(1)}
                                                        </CustomizeTypography>
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
                                                            }}
                                                        />
                                                        {/* number of rating */}
                                                        <CustomizeTypography
                                                            sx={{
                                                                ml: 2,
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
                    ) 
                </Container>
            )}
        </React.Fragment>
    );
}