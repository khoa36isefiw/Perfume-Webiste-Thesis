import React from 'react';
import { Box, FormHelperText, Paper, Typography, MenuItem, Button, TextField } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { useNavigate } from 'react-router-dom';

function AddCategory() {
    const [name, setName] = React.useState({
        value: '',
        message: '',
    });
    const [categories, setCategories] = React.useState([
        {
            name: 'unisex',
            parentCategory: '...',
            description: 'test',
            isActive: true,
            _id: 1,
        },
    ]);
    const [subCategories, setSubCategories] = React.useState([]);

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
        setCategories(listCategory);
    };
    const fetchCategoryByParentId = async (id) => {
        const listCategory = 'await categoryService.getChildCategoryByPId(id)';
        setSubCategories(listCategory);
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
        navigate('/manage-category');
        // window.history.back(); // Quay trở lại trang trước
    };

    const handleSelectedCategory = (e) => {
        console.log(selectedCategoryId);
        setSelectedCategoryId(e.target.value);
    };
    const handleSelectedSubCategory = (e) => {
        setSelectedSubCategoryId(e.target.value);
    };

    return (
        <Box>
            <Button
                startIcon={<ArrowBackIosNewIcon />}
                sx={{ display: 'inline-flex', padding: '10px 30px 10px 0px', mb: '16px' }}
                onClick={handleBack}
            >
                Back
            </Button>
            <Typography sx={{ fontSize: '3rem', fontWeight: 600 }}>New Category</Typography>
            <Paper sx={{ mt: 4, mb: 4, padding: 1.5, borderRadius: 4 }}>
                <form onSubmit={handleCreate}>
                    <Box>
                        <TextField
                            label="Category Name"
                            required
                            fullWidth
                            value={name.value}
                            error={name.message ? true : false}
                            variant="outlined"
                            placeholder="Enter Category Name"
                            sx={{ width: '100%', mr: 2, mb: 2 }}
                            onBlur={validateName}
                            onChange={(e) => setName({ ...name, value: e.target.value })}
                        />
                        <FormHelperText error sx={{ fontSize: '1.4rem' }}>
                            {name.message}
                        </FormHelperText>
                    </Box>
                    <Box>
                        <TextField
                            sx={{ width: '100%', mb: 2 }}
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
                        <FormHelperText error sx={{ fontSize: '1.4rem' }}>
                            {description.message}
                        </FormHelperText>
                    </Box>
                    {categories.length > 0 && (
                        <TextField
                            select
                            value={selectedCategoryId}
                            onChange={handleSelectedCategory}
                            label="Select Category"
                            sx={{ minWidth: '30%', mb: 2, fontSize: '14px' }}
                        >
                            <MenuItem value="" sx={{ fontSize: '14px' }}>
                                <em>None</em>
                            </MenuItem>
                            {/* {categories.map((category) => ( */}
                            <MenuItem
                                key={category._id}
                                value={category._id}
                                sx={{ fontSize: '14px' }}
                            >
                                {category.name}
                            </MenuItem>
                            {/* ))} */}
                        </TextField>
                    )}
                    {subCategories?.length > 0 && (
                        <TextField
                            select
                            value={selectedSubCategoryId}
                            onChange={handleSelectedSubCategory}
                            label="Select Sub Category"
                            sx={{ width: '100%', fontSize: '14px', mb: 2 }}
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

                    <Button type="submit">Create Category</Button>
                </form>
            </Paper>
        </Box>
    );
}

export default AddCategory;
