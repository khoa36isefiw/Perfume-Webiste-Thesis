import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { tabletScreen, theme } from '../../Theme/Theme';
import { blue } from '@mui/material/colors';
import useCategory from '../../api/useCategory';
import { useTranslation } from 'react-i18next';

function CategoryFilter({ setCId }) {
    const [categorySelected, setCategorySelected] = useState(
        JSON.parse(window.localStorage.getItem('category')) || '',
    );
    const { data: categoryData, isLoading, mutate } = useCategory();
    const { t, i18n } = useTranslation('translate');

    const selectedCategory = JSON.parse(window.localStorage.getItem('category'));

    const handleSelect = (category) => {
        if (categorySelected.nameEn === category.nameEn) {
            window.localStorage.removeItem('category');
            setCId(null);
        } else {
            setCId(category._id);
            setCategorySelected(category);
            window.localStorage.setItem('category', JSON.stringify(category));
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomizeTypography
                sx={{ fontWeight: 'bold', mb: 0, color: blue[400], fontSize: '18px' }}
            >
                Categories
            </CustomizeTypography>
            {categoryData?.data.map((category) => {
                const isActive = selectedCategory && selectedCategory._id === category._id;
                return (
                    <Button
                        key={category._id}
                        sx={{
                            py: 1,
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            textTransform: 'initial',
                            color: isActive ? 'black' : 'white',
                            bgcolor: isActive ? blue[100] : 'transparent',
                            '&:hover': {
                                bgcolor: theme.palette.background.thirth,
                            },
                            [tabletScreen]: {
                                fontSize: '13px',
                            },
                        }}
                        onClick={() => handleSelect(category)}
                    >
                        {i18n.language === 'en' ? category.nameEn : category.nameVn}
                    </Button>
                );
            })}
        </Box>
    );
}

export default React.memo(CategoryFilter);
