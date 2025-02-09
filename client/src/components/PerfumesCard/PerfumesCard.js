import { Box, Container } from '@mui/material';
import React, { useState } from 'react';
import { mobileScreen, theme } from '../../Theme/Theme';

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
import RelatedProduct from '../RelatedProduct/RelatedProduct';
import i18n from '../../i18n';
import CustomizeButton from '../CustomizeButton/CustomizeButton';

function PerfumesCard() {
    const { t } = useTranslation('translate');
    const searchQuery = localStorage.getItem('search_query') || null;
    const brandFilter = JSON.parse(localStorage.getItem('filter')) || null;
    const sortingFilter = JSON.parse(localStorage.getItem('sortBy')) || null;
    const selectedCategory = JSON.parse(window.localStorage.getItem('category')) || '';
    console.log('selectedCategory: ', selectedCategory);

    const [visibleCount, setVisibleCount] = useState(8);
    const { open, animateStyle, handleClose, setAnimateStyle } = useLoading();
    const [cId, setCId] = useState(null);
    const {
        data: products,
        isLoading,
        mutate,
    } = useProduct(searchQuery, brandFilter, sortingFilter?.sortBy, sortingFilter?.sortType);
    useEffect(() => {
        mutate(); // render after choose params to filter
    }, [searchQuery, brandFilter, sortingFilter, mutate]);

    // console.log('productDataByCategory: ', productDataByCategory?.data);
    const [productData, setProductData] = useState([]);
    useEffect(() => {
        setProductData(products?.data);
    }, [products?.data]);

    const productFilteredByCategory = cId
        ? productData?.filter(
              (cId) =>
                  cId.category._id === selectedCategory._id ||
                  cId.category.parent === selectedCategory._id,
          )
        : products?.data;

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 8);
    };

    // const checkLocalStorage = typeof window.localStorage !== 'undefined';
    // console.log('checkLocalStorage: ', checkLocalStorage);

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
                        <CategoryFilter setCId={setCId} />
                    </Box>
                    {productFilteredByCategory?.length > 0 ? (
                        <>
                            <RelatedProduct
                                data={productFilteredByCategory.slice(0, visibleCount)}
                            />
                            {visibleCount < productFilteredByCategory.length && (
                                <Box sx={{ textAlign: 'center', mt: 4 }}>
                                    <CustomizeButton
                                        onHandleClick={handleLoadMore}
                                        textAction={
                                            i18n.language === 'en' ? 'Load More' : 'Tải thêm'
                                        }
                                    />
                                </Box>
                            )}
                        </>
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
