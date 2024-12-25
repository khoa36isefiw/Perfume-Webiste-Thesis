import { Box, Container, Grid } from '@mui/material';
import React from 'react';
import {
    CustomizeProductDescriptionText,
    CustomizeTypography,
} from '../CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';
import { useTranslation } from 'react-i18next';

function ProductInformation({ productInformation }) {
    const { t, i18n } = useTranslation('translate');
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
                            text={productInformation?.content.originEn}
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
                            {i18n.language === 'en'
                                ? productInformation?.content.shortContentEn
                                : productInformation?.content.shortContentVn}
                        </CustomizeTypography>

                        <CustomizeTypography sx={{ mt: 2, textAlign: 'justify' }}>
                            <span style={{ color: theme.palette.text.primary }}>
                                <strong>{t(`common.productDetails.topNote`)}: </strong>
                            </span>
                            {i18n.language === 'en'
                                ? productInformation?.content.topNotesEn
                                : productInformation?.content.topNotesVn}
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ mt: 2, textAlign: 'justify' }}>
                            <span style={{ color: theme.palette.text.primary }}>
                                <strong>{t('common.productDetails.heartNote')}: </strong>
                            </span>
                            {i18n.language === 'en'
                                ? productInformation?.content.heartNotesEn
                                : productInformation?.content.heartNotesVn}
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ mt: 2, textAlign: 'justify' }}>
                            <span style={{ color: theme.palette.text.primary }}>
                                <strong>{t(`common.productDetails.basesNote`)}: </strong>
                            </span>
                            {i18n.language === 'en'
                                ? productInformation?.content.baseNotesEn
                                : productInformation?.content.baseNotesVn}
                        </CustomizeTypography>

                        <CustomizeTypography sx={{ mt: 2, textAlign: 'justify' }}>
                            {i18n.language === 'en'
                                ? productInformation?.content.mainContentEn
                                : productInformation?.content.mainContentVn}
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
