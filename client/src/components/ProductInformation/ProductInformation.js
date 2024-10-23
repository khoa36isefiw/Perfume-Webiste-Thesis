import { Avatar, Box, Container, Divider, Grid } from '@mui/material';
import React from 'react';
import {
    CustomizeListText,
    CustomizeProductDescriptionText,
    CustomizeTypography,
} from '../CustomizeTypography/CustomizeTypography';
import { policyData } from './productInformationData';
import { theme } from '../../Theme/Theme';
import { useLocation } from 'react-router-dom';

function ProductInformation() {
    const location = useLocation();
    // get the perfume data passed from navigation
    const { perfume } = location.state || {};
    console.log('perfume: ', perfume);

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
                            Chi tiết về sản phẩm
                        </CustomizeTypography>

                        <CustomizeProductDescriptionText
                            title={'Thương hiệu'}
                            // get value through key
                            text={perfume.brand.nameEn}
                        />
                        <CustomizeProductDescriptionText
                            title={'Xuất xứ'}
                            // get value through key
                            text={perfume.content.origin}
                        />
                        <CustomizeProductDescriptionText
                            title={'Năm sản xuất'}
                            // get value through key
                            text={perfume.content.yearOfRelease}
                        />
                        <CustomizeProductDescriptionText
                            title={'Nồng độ'}
                            // get value through key
                            text={perfume.content.concentration}
                        />
                        <CustomizeProductDescriptionText
                            title={'Nhóm hương'}
                            // get value through key
                            text={perfume.content.fragranceGroup}
                        />
                        <CustomizeProductDescriptionText
                            title={'Nhà chế tác'}
                            // get value through key
                            text={perfume.content.manufacturer}
                        />

                        <CustomizeTypography
                            sx={{
                                mt: 4,
                                fontSize: '32px',
                                fontWeight: 'bold',
                                color: theme.palette.text.primary,
                            }}
                        >
                            Mô tả sản phẩm
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ mt: 2, textAlign: 'justify' }}>
                            {perfume?.content.shortContent}
                        </CustomizeTypography>

                        <CustomizeTypography sx={{ mt: 2, textAlign: 'justify' }}>
                            <span style={{ color: theme.palette.text.primary }}>
                                <strong>Top note: </strong>
                            </span>
                            {perfume.content?.topNotes}
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ mt: 2, textAlign: 'justify' }}>
                            <span style={{ color: theme.palette.text.primary }}>
                                <strong>Heart note: </strong>
                            </span>
                            {perfume.content?.heartNotes}
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ mt: 2, textAlign: 'justify' }}>
                            <span style={{ color: theme.palette.text.primary }}>
                                <strong>Bases note: </strong>
                            </span>
                            {perfume.content?.baseNotes}
                        </CustomizeTypography>

                        <CustomizeTypography sx={{ mt: 2, textAlign: 'justify' }}>
                            {perfume?.content.mainContent}
                        </CustomizeTypography>

                        <CustomizeTypography sx={{ mt: 2, textAlign: 'justify' }}>
                            <span style={{ color: theme.palette.text.primary }}>
                                <strong>Độ lưu hương: </strong>
                            </span>
                            {perfume.content?.likability}/5
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ mt: 2, textAlign: 'justify' }}>
                            <span style={{ color: theme.palette.text.primary }}>
                                <strong>Toả hương: </strong>
                            </span>
                            {perfume.content?.longevity}/5
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ mt: 2, textAlign: 'justify' }}>
                            <span style={{ color: theme.palette.text.primary }}>
                                <strong>Nịnh mũi: </strong>
                            </span>
                            {perfume.content?.likability}/5
                        </CustomizeTypography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ProductInformation;
