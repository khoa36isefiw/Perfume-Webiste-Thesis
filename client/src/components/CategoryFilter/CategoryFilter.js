import { Box, Button } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { tabletScreen, theme } from '../../Theme/Theme';
import { blue } from '@mui/material/colors';
import useCategory from '../../api/useCategory';
import { useTranslation } from 'react-i18next';

function CategoryFilter() {
    const { data: categoryData, isLoading, mutate } = useCategory();
    const handleSelect = (category) => {
        console.log('category: ', category.nameEn);
        console.log('category_id: ', category._id);
    };
    console.log('categoryData: ', categoryData?.data);
    const { t, i18n } = useTranslation('translate');
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomizeTypography
                sx={{ fontWeight: 'bold', mb: 0, color: blue[400], fontSize: '18px' }}
            >
                Categories
            </CustomizeTypography>
            {categoryData?.data.map((category) => (
                <Button
                    key={category._id}
                    sx={{
                        py: 1,
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textTransform: 'initial',
                        color: 'white',
                        '&:hover': {
                            bgcolor: theme.palette.background.thirth,
                        },
                        [tabletScreen]: {
                            fontSize: '13px',
                        },
                    }}
                    onClick={() => handleSelect(category)}
                >
                    {/* {i18n.language === 'en' ? category.nameEn === '' ? '' : ''} */}
                    {i18n.language === 'en' ? category.nameEn : category.nameVn}
                </Button>
            ))}
        </Box>
    );
}

export default CategoryFilter;
