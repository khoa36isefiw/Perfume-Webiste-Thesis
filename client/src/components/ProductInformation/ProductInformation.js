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
    console.log('data: ', perfume);
    return (
        <Container>
            <Grid container>
                <Grid item md={9} lg={9}>
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
                            text={perfume.brand}
                        />
                        <CustomizeProductDescriptionText
                            title={'Xuất xứ'}
                            // get value through key
                            text={perfume.origin}
                        />
                        <CustomizeProductDescriptionText
                            title={'Năm sản xuất'}
                            // get value through key
                            text={perfume.yearOfRelease}
                        />
                        <CustomizeProductDescriptionText
                            title={'Nồng độ'}
                            // get value through key
                            text={perfume.concentration}
                        />
                        <CustomizeProductDescriptionText
                            title={'Nhóm hương'}
                            // get value through key
                            text={perfume.fragranceGroup}
                        />
                        <CustomizeProductDescriptionText
                            title={'Nhà chế tác'}
                            // get value through key
                            text={perfume.manufacturer}
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
                            {perfume.content.description}
                        </CustomizeTypography>

                        {/* loop object */}
                        {Object.entries(perfume.content.notes).map(([noteType, notes], index) => (
                            // noteType: key
                            // notes: value
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 1,
                                    pl: '20px',
                                }}
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
                                    title={`${
                                        noteType?.includes('topNotes')
                                            ? 'Top note (hương đầu)'
                                            : noteType?.includes('heartNotes')
                                            ? 'Top note (hương giữa)'
                                            : 'Base note (hương cuối)'
                                    }`}
                                    text={notes.join(', ')}
                                />
                            </Box>
                        ))}

                        <CustomizeTypography sx={{ mt: 2, textAlign: 'justify' }}>
                            {perfume.content.scentProfile}
                        </CustomizeTypography>

                        <CustomizeTypography sx={{ mt: 2, textAlign: 'justify' }}>
                            {perfume.content.impression}
                        </CustomizeTypography>

                        <CustomizeTypography sx={{ mt: 2, textAlign: 'justify' }}>
                            {perfume.content.targetAudience}
                        </CustomizeTypography>

                        <CustomizeTypography sx={{ mt: 2, textAlign: 'justify' }}>
                            {perfume.content.usage}
                        </CustomizeTypography>

                        <Box sx={{ paddingLeft: '20px' }}>
                            <Ratings
                                title={'Độ lưu hương'}
                                text={`${perfume.content.ratings.longevity}/5`}
                            />
                            <Ratings
                                title={'Độ tỏa hương'}
                                text={`${perfume.content.ratings.sillage}/5`}
                            />
                            <Ratings
                                title={'Nịnh mũi'}
                                text={`${perfume.content.ratings.likability}/5`}
                            />
                            <Ratings title={'Thời điểm'} text={`${perfume.content.occasion}`} />
                        </Box>
                    </Box>
                </Grid>
                <Grid item md={3} lg={3}>
                    {policyData.map((policy, index) => (
                        <Box sx={{ width: '100%' }}>
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
