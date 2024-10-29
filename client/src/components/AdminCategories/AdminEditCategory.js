import React from 'react';
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
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { useNavigate } from 'react-router-dom';
import AdminButtonBackPage from '../AdminButtonBackPage/AdminButtonBackPage';
import { AdminButtonDesign } from '../AdminCoupons/AdminCreateCoupon';
import { theme } from '../../Theme/Theme';

function AdminEditCategory() {
    const [name, setName] = React.useState({
        value: '',
        message: '',
    });
    const [categories, setCategories] = React.useState([
        {
            name: 'unisex',
            parentCategory: '...',
            description: 'men and women can use',
            isActive: true,
            _id: 1,
        },
        {
            name: 'men',
            parentCategory: '...',
            description: 'for men',
            isActive: true,
            _id: 1,
        },
        {
            name: 'women',
            parentCategory: '...',
            description: 'for women',
            isActive: true,
            _id: 1,
        },
    ]);
    const [subCategories, setSubCategories] = React.useState([
        {
            name: 'unisex',
            parentCategory: '...',
            description: 'test',
            isActive: true,
            _id: 1,
        },
    ]);

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
        const listCategory = 'await categoryService.getAllParentCategory()';
        // setCategories(listCategory);
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
                name: name.value,
                description: description.value,
                parentId: selectedSubCategoryId ? selectedSubCategoryId : selectedCategoryId,
            };
            const respone = await 'categoryService.createCategory(data)';

            // call api to create new user
            if (respone.status === 201) {
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

    const handleUpdateCategory = () => {};

    return (
        <Box sx={{ p: 3, height: '100vh' }}>
            <AdminButtonBackPage title={'List Categories'} />

            <Typography sx={{ fontSize: '3rem', fontWeight: 600 }}>Edit Category</Typography>
            <Box sx={{ bgcolor: '#fff', my: 4, p: 2, borderRadius: 2, minHeight: 200 }}>
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
                        <Grid item lg={6}>
                            {categories.length > 0 && (
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
                                            {category.name}
                                        </MenuItem>
                                    ))}{' '}
                                    *
                                </TextField>
                            )}
                        </Grid>
                        <Grid item lg={6}>
                            {subCategories?.length > 0 && (
                                <TextField
                                    select
                                    value={selectedSubCategoryId}
                                    onChange={handleSelectedSubCategory}
                                    label="Select Sub Category"
                                    sx={{ width: '100%', fontSize: '14px' }}
                                >
                                    {subCategories.map((category) => (
                                        <MenuItem
                                            key={category._id}
                                            value={category._id}
                                            sx={{ fontSize: '14px' }}
                                        >
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
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
    );
}

export default AdminEditCategory;
