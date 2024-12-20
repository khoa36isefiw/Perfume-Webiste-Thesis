import { Box, Container, Grid } from '@mui/material';
import React from 'react';
import {
    CustomizeProductDescriptionText,
    CustomizeTypography,
} from '../CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';
import { useTranslation } from 'react-i18next';

function ProductInformation({ productInformation }) {
    const { t } = useTranslation('translate');
    // get the perfume data passed from navigation
    if (productInformation === null) return 'Loading...';
    return (
        <Container>
            <Grid container>
                <Grid item sm={8} md={9} lg={9}>
                    <Box>
                        <CustomizeTypography
                            sx={{
                                fontSize: '32px',
                                fontWeight: 'bold',
                                color: theme.palette.text.primary,
                            }}
                        >
                            {/* Chi tiết về sản phẩm */}
                            {t('common.productDetails.productDetails')}
                        </CustomizeTypography>

                        <CustomizeProductDescriptionText
                            title={t('common.productDetails.Origin')}
                            // get value through key
                            text={productInformation?.content.origin}
                        />
                        <CustomizeProductDescriptionText
                            title={t('common.productDetails.year')}
                            // get value through key
                            text={productInformation?.content.yearOfRelease}
                        />
                        <CustomizeProductDescriptionText
                            title={t('common.productDetails.Concentration')}
                            // get value through key
                            text={productInformation?.content.concentration}
                        />
                        <CustomizeProductDescriptionText
                            title={t(`common.productDetails.${'Fragrance group'}`)}
                            // get value through key
                            text={productInformation?.content.fragranceGroup}
                        />
                        <CustomizeProductDescriptionText
                            title={t(`common.productDetails.${'Manufacturer'}`)}
                            // get value through key
                            text={productInformation?.content.manufacturer}
                        />

                        <CustomizeTypography
                            sx={{
                                mt: 4,
                                fontSize: '32px',
                                fontWeight: 'bold',
                                color: theme.palette.text.primary,
                            }}
                        >
                            {t(`common.productDetails.${'pDes'}`)}
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ mt: 2, textAlign: 'justify' }}>
                            {t('common.productDetails.content.c1')}
                        </CustomizeTypography>

                        <CustomizeTypography sx={{ mt: 2, textAlign: 'justify' }}>
                            <span style={{ color: theme.palette.text.primary }}>
                                <strong>{t(`common.productDetails.topNote`)}: </strong>
                            </span>
                            {t(`common.productDetails.n1`)}
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ mt: 2, textAlign: 'justify' }}>
                            <span style={{ color: theme.palette.text.primary }}>
                                <strong>{t('common.productDetails.heartNote')}: </strong>
                            </span>
                            {t(`common.productDetails.n2`)}
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ mt: 2, textAlign: 'justify' }}>
                            <span style={{ color: theme.palette.text.primary }}>
                                <strong>{t(`common.productDetails.basesNote`)}: </strong>
                            </span>
                            {t(`common.productDetails.n3`)}
                        </CustomizeTypography>

                        <CustomizeTypography sx={{ mt: 2, textAlign: 'justify' }}>
                            {t('common.productDetails.content.c2')}
                        </CustomizeTypography>

                        <CustomizeTypography sx={{ mt: 2, textAlign: 'justify' }}>
                            <span style={{ color: theme.palette.text.primary }}>
                                <strong>
                                    {t(`common.productDetails.${`Fragrance lasting`}`)}:{' '}
                                </strong>
                            </span>
                            {productInformation?.content?.likability}/5
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ mt: 2, textAlign: 'justify' }}>
                            <span style={{ color: theme.palette.text.primary }}>
                                <strong>
                                    {t(`common.productDetails.${`Fragrance diffusion`}`)}:{' '}
                                </strong>
                            </span>
                            {productInformation?.content?.longevity}/5
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ mt: 2, textAlign: 'justify' }}>
                            <span style={{ color: theme.palette.text.primary }}>
                                <strong>{t(`common.productDetails.${`Nose pleasing`}`)}: </strong>
                            </span>
                            {productInformation?.content?.likability}/5
                        </CustomizeTypography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ProductInformation;
