import React from 'react';
import { Box, Typography, MenuItem, Button, TextField, Grid } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { useNavigate } from 'react-router-dom';
import { categoriesAPI } from '../../api/categoriesAPI';

function AddCategory() {
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
    const [selectedSubCategoryId, setSelectedSubCategoryId] = React.useState('');

    const [message, setMessage] = React.useState('');
    const [typeMessage, setTypeMessage] = React.useState('');
    const navigate = useNavigate();

    const fetchAllParentCategory = async () => {
        const listCategory = await categoriesAPI.getAllCategory();
        console.log('listCategory: ', listCategory.data);
        setCategories(listCategory.data);
    };
    const fetchCategoryByParentId = async (id) => {
        const listCategory = 'await categoryService.getChildCategoryByPId(id)';
        // setSubCategories(listCategory);
    };

    React.useEffect(() => {
        fetchAllParentCategory();
    }, []);
    React.useEffect(() => {
        fetchCategoryByParentId(selectedCategoryId);
    }, [selectedCategoryId]);

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
            const data = {
                nameEn: name.value,
                descriptionEn: description.value,
                parentId: selectedCategoryId,
            };
            const respone = await categoriesAPI.createCategory(data);

            // call api to create new user
            if (respone.status === 201) {
                console.log('respone: ', respone);
                setMessage('Tạo category thành công');
                setTypeMessage('success');
                setName({ value: '', message: '' });
                setDescription({ value: '', message: '' });
                setSelectedCategoryId('');
                setSelectedSubCategoryId('');
                // navigate('/manage-category');
            } else {
                setMessage('Tạo category thất bại');
                setTypeMessage('error');
            }
        } else {
            setMessage('Vui lòng kiểm tra các trường đã nhập');
            setTypeMessage('error');
        }
        setTimeout(() => {
            setMessage('');
            setTypeMessage('');
        }, 3000);
    };
    const handleBack = () => {
        window.history.back(); // Quay trở lại trang trước
    };

    const handleSelectedCategory = (e) => {
        console.log(selectedCategoryId);
        setSelectedCategoryId(e.target.value);
    };
    const handleSelectedSubCategory = (e) => {
        setSelectedSubCategoryId(e.target.value);
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
                        <Grid item lg={6}>
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
                        <Grid item lg={6}>
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
                        <Grid item lg={12}>
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
