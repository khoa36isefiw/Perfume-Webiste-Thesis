import React, { useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    MenuItem,
    Select,
    TextField,
    Typography,
    InputLabel,
    FormControl,
} from '@mui/material';
import AdminButtonBackPage from '../AdminButtonBackPage/AdminButtonBackPage';
import { theme } from '../../Theme/Theme';

const AdminAddProduct = () => {
    // State for product details
    const [image, setImage] = useState(null);
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState('');
    const [stock, setStock] = useState('');
    const [brand, setBrand] = useState('');
    const [ratings, setRatings] = useState('');

    // item for menu
    const sizeOptions = ['9ml', '25ml', '27ml', '50ml', '65ml', '100ml'];
    const brandOptions = ['Dior', 'Chanel', 'Gucci'];

    // file input for image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle form submission
    const handleAddProduct = () => {
        const newProduct = {
            image,
            productName,
            price,
            size,
            stock,
            brand,
            ratings,
        };

        console.log('New Product Data:', newProduct);
        // Add API call to save product here
    };

    return (
        <Box
            sx={{
                p: 3,
                mx: 4,
                borderRadius: 2,
            }}
        >
            <AdminButtonBackPage title={'List Products'} />
            <Typography variant="h4" sx={{ mb: 3 }}>
                Add New Product
            </Typography>

            {/* Product Image Upload */}
            <Avatar
                alt="Product Image"
                src={image || 'https://via.placeholder.com/256'} // Default placeholder if no image
                sx={{ width: 256, height: 256, marginBottom: 2, borderRadius: 0 }}
            />
            <Button
                variant="outlined"
                component="label"
                sx={{
                    marginBottom: 2,
                    textTransform: 'initial',
                    padding: '10px 18px',
                    fontSize: '13px',
                }}
            >
                Upload Image
                <input type="file" accept="image/*" hidden onChange={handleImageChange} />
            </Button>
            <Box sx={{ display: 'flex', gap: 4 }}>
                {/* Product Name */}
                <TextField
                    label="Product Name"
                    fullWidth
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    sx={{ mb: 2 }}
                />

                {/* Size Dropdown */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="size-select-label">Size</InputLabel>
                    <Select
                        labelId="size-select-label"
                        value={size}
                        label="Size"
                        // get value is selected
                        onChange={(e) => setSize(e.target.value)}
                    >
                        {sizeOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Box sx={{ display: 'flex', gap: 4 }}>
                {/* Price */}
                <TextField
                    label="Price"
                    fullWidth
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    sx={{ mb: 2 }}
                />

                {/* Stock */}
                <TextField
                    label="Stock"
                    fullWidth
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    sx={{ mb: 2 }}
                />
            </Box>

            <Box sx={{ display: 'flex', gap: 4 }}>
                {/* Brand Dropdown */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="brand-select-label">Brand</InputLabel>
                    <Select
                        labelId="brand-select-label"
                        value={brand}
                        label="Brand"
                        onChange={(e) => setBrand(e.target.value)}
                    >
                        {brandOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 4 }}>
                <AdminButtonDesign
                    title={'Add Product'}
                    bgcolor={theme.palette.admin.bgColor}
                    onHandleClick={handleAddProduct}
                    type={'contained'}
                    textColor={'white'}
                />

                <AdminButtonDesign
                    title={'Cancel'}
                    // bgcolor={theme.palette.admin.bgColor}
                    onHandleClick={handleAddProduct}
                    type={'outlined'}
                    textColor={theme.palette.admin.bgColor}
                    borderColor={theme.palette.admin.bgColor}
                />
            </Box>
        </Box>
    );
};

export default AdminAddProduct;

const AdminButtonDesign = ({ type, bgcolor, title, onHandleClick, textColor, borderColor }) => {
    return (
        <Button
            variant={type}
            onClick={onHandleClick}
            sx={{
                color: textColor,
                marginTop: 2,
                padding: '10px 18px',
                fontSize: '14px',
                textTransform: 'initial',
                borderRadius: 2,
                bgcolor: bgcolor,
                borderColor: borderColor,
                '&:hover': {
                    bgcolor: bgcolor,
                    borderColor: borderColor,
                },
            }}
        >
            {title}
        </Button>
    );
};
