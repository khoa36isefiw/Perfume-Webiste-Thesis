import React, { useState } from 'react';
import {
    Box,
    FormHelperText,
    Paper,
    Typography,
    MenuItem,
    Button,
    TextField,
    Grid,
} from '@mui/material';

import { useLocation, useNavigate } from 'react-router-dom';
import AdminButtonBackPage from '../AdminButtonBackPage/AdminButtonBackPage';
import { AdminButtonDesign } from '../AdminCoupons/AdminCreateCoupon';
import { theme } from '../../Theme/Theme';
import useCategory from '../../api/useCategory';
import { categoriesAPI } from '../../api/categoriesAPI';

import { useSnackbarMessage } from '../../hooks/useSnackbarMessage';
import { AdminInputStyles } from '../AdminInputStyles/AdminInputStyles';

function AdminEditCategory() {
    const location = useLocation();
    const { showNotificationMessage } = useSnackbarMessage(); // multiple notification
    const { category } = location.state || [];
    const { data: categoriesData, isLoading } = useCategory();
    const responeCategoriesData = categoriesData?.data || [];
    console.log('categoriesData: ', categoriesData?.data);
    console.log('category: ', category);
    const [name, setName] = React.useState({
        value: category?.nameEn || '',
        message: '',
    });
    const [categories, setCategories] = React.useState(responeCategoriesData);
    const [description, setDescription] = React.useState({
        value: category?.descriptionEn || '',
        message: '',
    });
    const [selectedCategoryId, setSelectedCategoryId] = React.useState(category?._id);

    const navigate = useNavigate();

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
        console.log(selectedCategoryId);
        setSelectedCategoryId(e.target.value);
    };

    const handleUpdateCategory = async () => {
        const getCategoryById = await categoriesAPI.getCategoryById(selectedCategoryId);
        console.log('getCategoryById: ', getCategoryById);
        if (getCategoryById !== '' && name.value !== '' && description.value !== '') {
            const data = {
                nameVn: name.value,
                nameEn: name.value,
                parent: getCategoryById.data.parent,
                descriptionEn: description.value,
            };
            const editResponse = await categoriesAPI.updateCategory(category?._id, data);
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
                                    {categories.length > 0 && (
                                        <AdminInputStyles
                                            fullWidth
                                            select
                                            value={selectedCategoryId}
                                            onChange={handleSelectedCategory}
                                            label="Select Category"
                                            sx={{ fontSize: '14px' }}
                                        >
                                            <MenuItem value="" sx={{ fontSize: '14px' }}>
                                                <em>None</em>
                                            </MenuItem>
                                            {categories.map((category) => (
                                                <MenuItem
                                                    key={category._id}
                                                    value={category._id}
                                                    sx={{ fontSize: '14px' }}
                                                >
                                                    {category.nameEn}
                                                </MenuItem>
                                            ))}{' '}
                                            *
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
