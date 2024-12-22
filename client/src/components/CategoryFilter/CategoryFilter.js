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
    const { data: categoryData } = useCategory();
    const { i18n } = useTranslation('translate');

    const selectedCategory = JSON.parse(window.localStorage.getItem('category'));

    const handleSelect = (category) => {
        if (categorySelected.nameEn === category.nameEn) {
            setCategorySelected('');
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
                return (
                    <>
                        {category.status === 'active' && (
                            <Button
                                key={category._id}
                                sx={{
                                    py: 1,
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    textTransform: 'initial',
                                    color:
                                        selectedCategory?._id === category._id
                                            ? theme.palette.text.secondary
                                            : 'white',

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
                        )}
                    </>
                );
            })}
        </Box>
    );
}

export default CategoryFilter;
