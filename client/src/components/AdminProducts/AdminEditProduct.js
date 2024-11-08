import React, { useState } from 'react';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import AdminButtonBackPage from '../AdminButtonBackPage/AdminButtonBackPage';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { productAPI } from '../../api/productAPI';

const AdminEditProduct = () => {
    const location = useLocation();
    const { productData, selectedSize } = location.state;
    console.log('productData.variants[0]?._id: ', productData.variants[0]?._id);

    // Set up local state for editable product information
    const [image, setImage] = useState(productData.image);
    const [productName, setProductName] = useState(productData.productName);
    const [price, setPrice] = useState(productData.price);
    const [size, setSize] = useState(selectedSize);
    const [stock, setStock] = useState(productData.stock);
    const [brand, setBrand] = useState(productData.brand);
    const [discount, setDiscount] = useState(productData.variants[0]?.discountPercent);
    const [ratings, setRatings] = useState(productData.ratings);

    const [showNotification, setShowNotification] = useState(false);

    const [showAnimation, setShowAnimation] = useState('animate__bounceInRight');

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
    const handleSave = async () => {
        setShowNotification(true);
        setShowAnimation('animate__bounceInRight');

        const productId = productData.productId;

        const discountPercent = Number('discount') || 0; // Convert to Number and default to 0
        const newPrice = Number(price) || 0; // Convert price to Number with default
        console.log('type of discountPercent: ', typeof discountPercent);
        // Log values to check before sending
        console.log('discountPercent:', discountPercent);
        console.log('price:', price);

        const data = {
            variants: [
                {
                    _id: productData.variants[0]?._id,
                    discountPercent: discountPercent, // Ensure discountPercent is a number
                    size: '27ml',
                    price: newPrice, // Ensure price is a number
                },
            ],
            nameEn: productName,
            // brand: brand,
        };

        console.log('product id:', productId);
        console.log('data:', data);

        const updateResponse = await productAPI.editProduct(productId, data);
        console.log('Updated Product:', updateResponse);
    };

    // handle Close notification
    const handleCloseNotification = () => {
        setShowAnimation('animate__fadeOut');
        setTimeout(() => {
            setShowNotification(false);
        }, 1000);
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

                {/* discount percent */}
                <TextField
                    label="Discount"
                    fullWidth
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    sx={{ mb: 2 }}
                />

                {/* admin can't change this value */}
                <TextField
                    label="Rating"
                    disabled={true}
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
            {showNotification && (
                <Box
                    sx={{ position: 'fixed', top: '5%', right: '1%', zIndex: 9999999 }}
                    className={`animate__animated ${showAnimation}`}
                >
                    <NotificationMessage
                        msgType={'success'}
                        msgTitle={'Edit Product'}
                        msgContent={'Update product information successfully!'}
                        autoHideDuration={3000} // Auto-hide after 5 seconds
                        onClose={handleCloseNotification}
                    />
                </Box>
            )}
        </Box>
    );
};

export default AdminEditProduct;
