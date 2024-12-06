import React from 'react';
import { Box, Typography, MenuItem, Button, TextField, Grid } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { useNavigate } from 'react-router-dom';
import { categoriesAPI } from '../../api/categoriesAPI';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { useSnackbarMessage } from '../../hooks/useSnackbarMessage';

function AddCategory() {
    const { showNotificationMessage } = useSnackbarMessage(); // multiple notification
    const [name, setName] = React.useState({
        value: '',
        message: '',
    });
    const [categories, setCategories] = React.useState(null);

    const [description, setDescription] = React.useState({
        value: '',
        message: '',
    });
    const [selectedCategoryId, setSelectedCategoryId] = React.useState('');

    const navigate = useNavigate();

    const fetchAllParentCategory = async () => {
        const listCategory = await categoriesAPI.getAllParentCategory();
        console.log('listCategory: ', listCategory.data);
        setCategories(listCategory.data);
    };

    React.useEffect(() => {
        fetchAllParentCategory();
    }, []);

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

    const checkError = () => {
        if (name.message !== '' || description.message !== '') {
            return true;
        }
        return false;
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!checkError()) {
            console.log('selectedCategoryId: ', selectedCategoryId);
            const data = {
                nameEn: name.value,
                nameVn: name.value,
                descriptionEn: description.value,
                parentId: selectedCategoryId,
            };
            const respone = await categoriesAPI.createCategory(data);

            // call api to create new user
            if (respone.status === 201) {
                setName({ value: '', message: '' });
                setDescription({ value: '', message: '' });
                setSelectedCategoryId('');
                showNotificationMessage('success', 'Create Category', 'Tạo category thành công');
                setTimeout(() => {
                    navigate('/admin/manage-categories');
                }, 2800);
            } else {
                showNotificationMessage('error', 'Create Category', 'Tạo category thất bại');
            }
        } else {
            showNotificationMessage('error', 'Create Category', 'Vui lòng kiểm tra các trường đã nhập');
        }
    };
    const handleBack = () => {
        window.history.back(); // return the previous page
    };

    const handleSelectedCategory = (e) => {
        console.log(selectedCategoryId);
        setSelectedCategoryId(e.target.value);
    };

    return (
        <Box sx={{ p: 3, height: '100vh' }}>
            <Button
                startIcon={<ArrowBackIosNewIcon />}
                sx={{ display: 'inline-flex', padding: '10px 30px 10px 0px', mb: '16px' }}
                onClick={handleBack}
            >
                Back
            </Button>
            <Typography sx={{ fontSize: '3rem', fontWeight: 600 }}>New Category</Typography>
            <Box sx={{ bgcolor: '#fff', mt: 4, px: 2, borderRadius: 2, minHeight: 200 }}>
                <form onSubmit={handleCreate}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <TextField
                                label="Category Name"
                                required
                                fullWidth
                                value={name.value}
                                error={name.message ? true : false}
                                variant="outlined"
                                placeholder="Enter Category Name"
                                onBlur={validateName}
                                onChange={(e) => setName({ ...name, value: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <TextField
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
                                    setDescription({ ...description, value: e.target.value })
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            {categories?.length > 0 && (
                                <TextField
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
                                </TextField>
                            )}
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ textTransform: 'initial', fontSize: '14px', my: 4 }}
                    >
                        Create Category
                    </Button>
                </form>
            </Box>
        </Box>
    );
}

export default AddCategory;
