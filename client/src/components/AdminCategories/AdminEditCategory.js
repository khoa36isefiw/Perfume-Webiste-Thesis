import React, { useEffect, useMemo } from 'react';
import { Box, Typography, MenuItem, Grid } from '@mui/material';

import { useLocation, useNavigate } from 'react-router-dom';
import AdminButtonBackPage from '../AdminButtonBackPage/AdminButtonBackPage';
import { AdminButtonDesign } from '../AdminCoupons/AdminCreateCoupon';
import { theme } from '../../Theme/Theme';
import useCategory from '../../api/useCategory';
import { categoriesAPI } from '../../api/categoriesAPI';

import { useSnackbarMessage } from '../../hooks/useSnackbarMessage';
import { AdminInputStyles } from '../AdminInputStyles/AdminInputStyles';
import { getId } from '../../utils/getIdByLocation';
import useCategoryById from '../../api/useCategoryById';

function AdminEditCategory() {
    const navigate = useNavigate();
    const location = useLocation();
    const { showNotificationMessage } = useSnackbarMessage(); // multiple notification
    const categoryId = getId(location); // get category id from location
    const { data: categoryData, isLoading } = useCategoryById(categoryId); // get data of category by id
    const { data: categoriesData } = useCategory();
    console.log('categoryId: ', categoryId);
    console.log('categoryData: ', categoryData?.data);

    const [name, setName] = React.useState({
        value: '',
        message: '',
    });

    const [description, setDescription] = React.useState({
        value: '',
        message: '',
    });
    const [selectedCategoryId, setSelectedCategoryId] = React.useState({
        value: '',
        message: '',
    });

    console.log('before selectedCategoryId: ', selectedCategoryId);
    useEffect(() => {
        if (categoryData) {
            console.log('chay vo day');
            setName({
                ...name,
                value: categoryData?.data?.nameEn,
            });
            setDescription({
                ...description,
                value: categoryData?.data?.descriptionEn,
            });
            setSelectedCategoryId({
                ...selectedCategoryId,
                value:
                    categoryData?.data?.parent !== ''
                        ? categoryData?.data?.parent
                        : categoryData?.data?._id,
            });
        }
        console.log('selectedCategoryId: ', selectedCategoryId);
    }, [categoryData, setName, setDescription, setSelectedCategoryId]);

    const validateName = () => {
        if (name.value.trim() === '') {
            setName({
                ...name,
                message: 'Vui lòng nhập category name',
            });
        }
        setName({ ...name, message: '' });
    };

    const validateDescription = () => {
        if (description.value.trim() === '') {
            setDescription({
                ...description,
                message: 'Vui lòng nhập description',
            });
        }
        setDescription({ ...description, message: '' });
    };

    const handleSelectedCategory = (e) => {
        const selectedCategory = e.target.value;
        console.log('Selected Category ID:', selectedCategory);

        setSelectedCategoryId({
            ...selectedCategoryId,
            value: selectedCategory,
        });
    };

    const handleUpdateCategory = async () => {
        if (name.value !== '' && description.value !== '') {
            const data = {
                nameVn: name.value,
                nameEn: name.value,
                parent: selectedCategoryId.value,
                descriptionEn: description.value,
            };
            const editResponse = await categoriesAPI.updateCategory(categoryData?.data?._id, data);
            console.log('editResponse: ', editResponse?.data);
            if (editResponse.status === 200) {
                showNotificationMessage('success', 'Edit Category', 'Edit Category Successfully');
                setTimeout(() => {
                    // window.history.back(); // return the previous page
                    navigate('/admin/manage-categories');
                }, 2800);
            }
            console.log('editResponse: ', editResponse);
        } else {
            showNotificationMessage('error', 'Edit Category', 'Please fill all fields');
        }
    };

    const activeCategories = useMemo(() => {
        return categoriesData?.data?.filter((category) => category.status === 'active') || [];
    }, [categoriesData]);

    console.log('activeCategories: ', activeCategories);

    return (
        <React.Fragment>
            {isLoading ? (
                <Typography>Loading...</Typography>
            ) : (
                <Box sx={{ p: 3, height: '100vh' }}>
                    <AdminButtonBackPage title={'List Categories'} />

                    <Typography sx={{ fontSize: '3rem', fontWeight: 600 }}>
                        Edit Category
                    </Typography>
                    <Box sx={{ bgcolor: '#fff', my: 4, p: 2, borderRadius: 2, minHeight: 200 }}>
                        <form onSubmit={handleUpdateCategory}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <AdminInputStyles
                                        label="Category Name"
                                        required
                                        fullWidth
                                        value={name.value}
                                        error={name.message ? true : false}
                                        variant="outlined"
                                        placeholder="Enter Category Name"
                                        onBlur={validateName}
                                        onChange={(e) =>
                                            setName({ ...name, value: e.target.value })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <AdminInputStyles
                                        sx={{ width: '100%' }}
                                        label="Description"
                                        required
                                        fullWidth
                                        value={description.value}
                                        error={description.message ? true : false}
                                        variant="outlined"
                                        placeholder="Enter Description"
                                        onBlur={validateDescription}
                                        onChange={(e) =>
                                            setDescription({
                                                ...description,
                                                value: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    {/* {categoriesData?.data && ( */}
                                    {activeCategories && (
                                        <AdminInputStyles
                                            fullWidth
                                            select
                                            value={selectedCategoryId?.value}
                                            onChange={handleSelectedCategory}
                                            label="Select Category"
                                            sx={{
                                                fontSize: '14px',
                                            }}
                                        >
                                            <MenuItem value="" sx={{ fontSize: '14px' }}>
                                                <em>None</em>
                                            </MenuItem>
                                            {/* {categoriesData?.data.length > 0 &&
                                                categoriesData?.data.map( */}
                                            {activeCategories.length > 0 &&
                                                activeCategories.map(
                                                    (category) =>
                                                        category.status === 'active' && (
                                                            <MenuItem
                                                                key={category._id}
                                                                value={category._id}
                                                                sx={{ fontSize: '14px' }}
                                                            >
                                                                {category.nameEn}
                                                            </MenuItem>
                                                        ),
                                                )}
                                        </AdminInputStyles>
                                    )}
                                </Grid>
                            </Grid>

                            <Box sx={{ mb: 2, mt: 2 }}>
                                <AdminButtonDesign
                                    title={'Update Category'}
                                    bgcolor={theme.palette.admin.bgColor}
                                    onHandleClick={handleUpdateCategory}
                                    type={'contained'}
                                    textColor={'white'}
                                />
                            </Box>
                        </form>
                    </Box>
                </Box>
            )}
        </React.Fragment>
    );
}

export default AdminEditCategory;
