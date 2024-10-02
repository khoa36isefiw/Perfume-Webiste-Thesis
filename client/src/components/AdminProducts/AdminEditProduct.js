import React, { useState } from 'react';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import AdminButtonBackPage from '../AdminButtonBackPage/AdminButtonBackPage';

const AdminEditProduct = () => {
    const location = useLocation();
    const { productData, selectedSize } = location.state;
    console.log('productData: ', productData);
    console.log('selectedSize: ', selectedSize);

    // Set up local state for editable product information
    const [image, setImage] = useState(productData.image);
    const [productName, setProductName] = useState(productData.productName);
    const [price, setPrice] = useState(productData.price);
    const [size, setSize] = useState(selectedSize);
    const [stock, setStock] = useState(productData.stock);
    const [brand, setBrand] = useState(productData.brand);
    const [ratings, setRatings] = useState(productData.ratings);

    // Handle file input for image update
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Update the image with base64 string
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle form submission (you can connect this to your API to save the updated data)
    const handleSave = () => {
        // Prepare updated product data for submission
        const updatedProduct = {
            ...productData,
            image: image,
            productName,
            size,
            stock,
            brand,
            ratings,
        };

        console.log('Updated Product:', updatedProduct);

        // Add API call here to save the updated product details
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
                Edit Product: {productData.productName}
            </Typography>

            <Avatar
                alt={productName}
                src={image}
                sx={{ width: 256, height: 256, marginBottom: 2, borderRadius: 0 }}
            />

            {/* Input for updating image */}
            <Button variant="outlined" component="label" sx={{ marginBottom: 2 }}>
                Update Image
                <input type="file" accept="image/*" hidden onChange={handleImageChange} />
            </Button>

            <Box sx={{ display: 'flex', gap: 4 }}>
                <TextField
                    label="Product Name"
                    fullWidth
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Size"
                    fullWidth
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    sx={{ mb: 2 }}
                />{' '}
            </Box>

            <Box sx={{ display: 'flex', gap: 4 }}>
                <TextField
                    label="Price"
                    fullWidth
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    sx={{ mb: 2 }}
                />

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
                <TextField
                    label="Brand"
                    fullWidth
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    sx={{ mb: 2 }}
                />

                {/* admin can't change this value */}
                <TextField
                    label="Rating"
                    disable
                    fullWidth
                    value={ratings}
                    // onChange={(e) => setRatings(e.target.value)}
                    sx={{ mb: 2 }}
                />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                    Save Changes
                </Button>
                <Button variant="outlined" color="secondary">
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export default AdminEditProduct;
