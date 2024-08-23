import { Avatar, Box, Container, Divider, Grid } from '@mui/material';
import React from 'react';
import {
    CustomizeListText,
    CustomizeProductDescriptionText,
    CustomizeTypography,
} from '../CustomizeTypography/CustomizeTypography';
import { policyData, productInformationData } from './productInformationData';
import { theme } from '../../Theme/Theme';

function ProductInformation() {
    return (
        <Container>
            <Grid container>
                <Grid item lg={9}>
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

                        {productInformationData.map((product, index) => (
                            <Box key={index}>
                                {[
                                    'Thương hiệu',
                                    'Xuất xứ',
                                    'Năm sản xuất',
                                    'Nồng độ',
                                    'Nhóm hương',
                                    'Nhà chế tác',
                                ].map((title, i) => (
                                    <CustomizeProductDescriptionText
                                        key={i}
                                        title={title}
                                        // get value through key
                                        text={product[Object.keys(product)[i]]}
                                    />
                                ))}

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
                                <CustomizeTypography sx={{ mt: 2 }}>
                                    {product.content.description}
                                </CustomizeTypography>

                                <ul
                                    style={{
                                        listStyleType: 'disc',
                                        paddingLeft: '20px',
                                    }}
                                >
                                    {[
                                        'Top note (hương đầu)',
                                        'Heart note (hương giữa)',
                                        'Base note (hương cuối)',
                                    ].map((title, i) => (
                                        <li
                                            key={i}
                                            style={{ display: 'flex', alignItems: 'center' }}
                                        >
                                            <Box
                                                sx={{
                                                    height: '10px',
                                                    width: '10px',
                                                    bgcolor: '#fff',
                                                    borderRadius: '50%',
                                                    mb: 1,
                                                    mr: 2,
                                                }}
                                            />
                                            <CustomizeListText
                                                title={title}
                                                text={product.content.notes[
                                                    Object.keys(product.content.notes)[i]
                                                ].join(', ')}
                                            />
                                        </li>
                                    ))}
                                </ul>

                                <CustomizeTypography sx={{ mt: 2 }}>
                                    {product.content.scentProfile}
                                </CustomizeTypography>

                                <CustomizeTypography sx={{ mt: 2 }}>
                                    {product.content.impression}
                                </CustomizeTypography>

                                <CustomizeTypography sx={{ mt: 2 }}>
                                    {product.content.targetAudience}
                                </CustomizeTypography>

                                <CustomizeTypography sx={{ mt: 2 }}>
                                    {product.content.usage}
                                </CustomizeTypography>
                                <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                                    <li>
                                        <Ratings
                                            title={'Độ lưu hương'}
                                            text={`${product.content.ratings.longevity}/5`}
                                        />
                                    </li>
                                    <li>
                                        <Ratings
                                            title={'Độ tỏa hương'}
                                            text={`${product.content.ratings.sillage}/5`}
                                        />
                                    </li>
                                    <li>
                                        <Ratings
                                            title={'Nịnh mũi'}
                                            text={`${product.content.ratings.likability}/5`}
                                        />
                                    </li>
                                    <li>
                                        <Ratings
                                            title={'Thời điểm'}
                                            text={`${product.content.occasion}`}
                                        />
                                    </li>
                                </ul>
                            </Box>
                        ))}
                    </Box>
                </Grid>
                <Grid item lg={3}>
                    {policyData.map((policy, index) => (
                        <Box sx={{ width: '300px' }}>
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    py: 1,
                                    // justifyContent: 'center',
                                }}
                            >
                                <Avatar
                                    src={policy.image}
                                    alt="Policy Image"
                                    sx={{
                                        height: '24px',
                                        width: '24px',
                                        borderRadius: 0,
                                        mr: 1,
                                    }}
                                />
                                <CustomizeTypography>{policy.policyText}</CustomizeTypography>
                            </Box>
                            <Divider sx={{ bgcolor: '#fff', width: '250px' }} />
                        </Box>
                    ))}
                </Grid>
            </Grid>
        </Container>
    );
}

export default ProductInformation;

const Ratings = ({ title, text }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
                sx={{
                    height: '10px',
                    width: '10px',
                    bgcolor: '#fff',
                    borderRadius: '50%',
                    mb: 1,

                    mr: 2,
                }}
            />
            <CustomizeListText title={title} text={text} />
        </Box>
    );
};
