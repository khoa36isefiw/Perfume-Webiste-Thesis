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
    Checkbox,
    ListItemText,
} from '@mui/material';
import AdminButtonBackPage from '../AdminButtonBackPage/AdminButtonBackPage';
import { theme } from '../../Theme/Theme';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import useBrand from '../../api/useBrand';
import useCategory from '../../api/useCategory';

const AdminAddProduct = () => {
    const [image, setImage] = useState(null);
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [selectedSizes, setSelectedSizes] = useState([]); // Multiple sizes
    const [stock, setStock] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategpry] = useState('');
    const [description, setDescription] = useState('');
    const [discount, setDiscount] = useState('');

    // notifications
    const [showNotification, setShowNotification] = useState(false);
    const [showAnimation, setShowAnimation] = useState('animate__bounceInRight');
    const [messageType, setMessageType] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [messageTitle, setMessageTitle] = useState('');

    const sizeOptions = ['9ml', '25ml', '27ml', '50ml', '65ml', '100ml'];

    const { data: brands } = useBrand();
    const brandOptions = brands || [];

    const { data: categories } = useCategory();
    const categoryOptions = categories || [];

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

    const calculateDiscountPrice = (price, discount) => {
        if (discount === 0) return;
        return price - price * (discount / 100);
    };

    const handleAddProduct = () => {
        const newProduct = {
            image,
            productName,
            price: +price,
            sizes: selectedSizes, // Using selected sizes
            stock,
            brand,
            ratings: 0,
            discount: calculateDiscountPrice(price, discount),
            description,
        };

        console.log('New Product Data:', newProduct);

        // successfully added
        setShowNotification(true);
        setShowAnimation('animate__bounceInRight');
        setMessageType('success');
        setMessageTitle('Add New Product');
        setMessageContent('Add new prodcut successfully!');
        setTimeout(() => {
            // navigate('/admin/manage-products');
        }, 2800);

        // error?
        // setShowNotification(true);
        // setShowAnimation('animate__bounceInRight');
        // setMessageType('error');
        // setMessageTitle('Add New Product');
        // setMessageContent('Add new prodcut failed!');
        // setTimeout(() => {
        //     // navigate('/admin/manage-products');
        // }, 2800);
    };

    const handleSizeChange = (e) => {
        setSelectedSizes(e.target.value);
    };

    const handleCloseNotification = () => {
        setShowAnimation('animate__fadeOut');
        setTimeout(() => {
            setShowNotification(false);
        }, 1000);
    };

    return (
        <Box sx={{ p: 3, mx: 4, borderRadius: 2 }}>
            <AdminButtonBackPage title={'List Products'} />
            <Typography variant="h4" sx={{ mb: 3 }}>
                Add New Product
            </Typography>

            <Avatar
                alt="Product Image"
                src={image || 'https://via.placeholder.com/256'}
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
                <TextField
                    label="Product Name"
                    fullWidth
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="size-select-label">Size</InputLabel>
                    <Select
                        labelId="size-select-label"
                        value={selectedSizes}
                        label="Brand"
                        onChange={handleSizeChange}
                    >
                        {sizeOptions?.map((size) => (
                            <MenuItem key={size} value={size}>
                                {size}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
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
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="brand-select-label">Brand</InputLabel>
                    <Select
                        labelId="brand-select-label"
                        value={brand}
                        label="Brand"
                        onChange={(e) => setBrand(e.target.value)}
                    >
                        {brandOptions?.map((brand) => (
                            <MenuItem key={brand._id} value={brand._id}>
                                {brand.nameEn}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                        labelId="category-select-label"
                        value={category}
                        label="Category"
                        onChange={(e) => setCategpry(e.target.value)}
                    >
                        {categoryOptions?.map((category) => (
                            <MenuItem key={category._id} value={category._id}>
                                {category.nameEn}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ mb: 2 }}
            />

            <Box sx={{ display: 'flex', gap: 4 }}>
                <AdminButtonDesign
                    title={'Create Product'}
                    bgcolor={theme.palette.admin.bgColor}
                    onHandleClick={handleAddProduct}
                    type={'contained'}
                    textColor={'white'}
                />

                <AdminButtonDesign
                    title={'Cancel'}
                    onHandleClick={handleAddProduct}
                    type={'outlined'}
                    textColor={theme.palette.admin.bgColor}
                    borderColor={theme.palette.admin.bgColor}
                />
            </Box>
            {showNotification && (
                <Box
                    sx={{ position: 'fixed', top: '5%', right: '1%', zIndex: 9999999 }}
                    className={`animate__animated ${showAnimation}`}
                >
                    <NotificationMessage
                        msgType={messageType}
                        msgTitle={messageTitle}
                        msgContent={messageContent}
                        autoHideDuration={3000} // Auto-hide after 5 seconds
                        onClose={handleCloseNotification}
                    />
                </Box>
            )}
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
