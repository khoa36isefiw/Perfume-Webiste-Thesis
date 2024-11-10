import React, { useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    Tooltip,
    IconButton,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import AdminButtonBackPage from '../AdminButtonBackPage/AdminButtonBackPage';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { productAPI } from '../../api/productAPI';
import useBrand from '../../api/useBrand';
import useCategory from '../../api/useCategory';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { converToVND } from '../convertToVND/convertToVND';

const AdminEditProduct = () => {
    const location = useLocation();
    const { productData, selectedSize, productTest } = location.state;
    console.log('productData.variants[0]?._id: ', productData.variants[0]?._id);
    console.log('productTest: ', productTest);
    console.log(
        'productTest.category.nameEn: ',
        productTest?.variants.map((size) => size.size),
    );

    // Set up local state for editable product information
    const [image, setImage] = useState(productData.image);
    const [productName, setProductName] = useState(productData.productName);
    const [price, setPrice] = useState(productData.price);
    const [size, setSize] = useState(selectedSize);
    const [stock, setStock] = useState(productData.stock);
    const [brand, setBrand] = useState(productData.brand);
    const [category, setCategory] = useState(productTest.category._id);
    const [brand2, setBrand2] = useState(productTest.brand._id);
    const [priceSale, setPriceSale] = useState(productData.variants[0]?.priceSale);
    const [selectedSizes, setSelectedSizes] = useState(
        productTest?.variants.map((variant) => ({
            _id: variant._id,
            size: variant.size,
            price: +variant.price,
            priceSale: +variant.priceSale,
            stock: +variant.stock,
        })) || [],
    );

    console.log('selectedSizes: ', selectedSizes);

    const [ratings, setRatings] = useState(productData.ratings);

    // notifications
    const [showNotification, setShowNotification] = useState(false);
    const [showAnimation, setShowAnimation] = useState('animate__bounceInRight');
    const [messageType, setMessageType] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [messageTitle, setMessageTitle] = useState('');

    const sizeOptions = productTest?.variants.map((size) => size.size) || [];
    const { data: brands } = useBrand();
    const brandOptions = brands?.data || [];

    const { data: categories } = useCategory();
    const categoryOptions = categories?.data || [];

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
        const variants = selectedSizes.map((variant) => ({
            _id: variant._id,
            size: variant.size,
            price: +variant.price, // + operator --> convert to number
            priceSale: +variant.priceSale, // convert to number
            stock: +variant.stock, // convert to number
        }));
        const data = {
            variants: variants,

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

    const handleSizeFieldChange = (index, field) => (e) => {
        const newValue = e.target.value;
        console.log('new value: ', newValue);

        // Kiểm tra nếu giá trị là một số hợp lệ
        if (isNaN(newValue) || !isFinite(newValue)) {
            setShowNotification(true);
            setShowAnimation('animate__bounceInRight');
            setMessageType('warning');
            setMessageTitle('Invalid Input');
            setMessageContent('Please enter a valid number!');
            return;
        }

        setSelectedSizes((prevSizes) => {
            const updatedSizes = [...prevSizes];
            updatedSizes[index] = { ...updatedSizes[index], [field]: newValue };

            return updatedSizes;
        });
    };

    const handleMenuItemClick = (size) => {
        const alreadySelected = selectedSizes.some((s) => s.size === size);

        if (alreadySelected) {
            // remove the size was selected from the list
            setSelectedSizes(selectedSizes.filter((s) => s.size !== size));
        } else {
            // add size to list if it was not chose
            setSelectedSizes([
                ...selectedSizes,
                { size: size, price: '', priceSale: '', stock: '' },
            ]);
        }
    };

    const handlePriceSaleBlur = (index) => {
        setSelectedSizes((prevSizes) => {
            const updatedSizes = [...prevSizes];
            const { price, priceSale } = updatedSizes[index];

            // Kiểm tra điều kiện priceSale > price
            if (priceSale > price) {
                setShowNotification(true);
                setShowAnimation('animate__bounceInRight');
                setMessageType('error');
                setMessageTitle('Price Error');
                setMessageContent('Sale price cannot be greater than the original price!');
            }

            return updatedSizes;
        });
    };

    const handleRemoveSizeSelected = (sizeToRemove) => {
        const updatedSizes = selectedSizes.filter((size) => size.size !== sizeToRemove);
        setSelectedSizes(updatedSizes);
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
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="size-select-label">Size</InputLabel>
                    <Select
                        labelId="size-select-label"
                        multiple
                        value={selectedSizes.map((size) => size.size)}
                        label="Size"
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {sizeOptions.map((size) => (
                            <MenuItem
                                key={size}
                                value={size}
                                onClick={() => handleMenuItemClick(size)}
                            >
                                <Checkbox checked={selectedSizes.some((s) => s.size === size)} />
                                <ListItemText primary={size} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {selectedSizes.map((size, index) => (
                <Box key={size.size} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography
                            key={size.size}
                            variant="body1"
                            sx={{
                                fontSize: '16px',
                            }}
                        >
                            <strong>Size</strong>: {size.size}
                        </Typography>
                        <Tooltip
                            title={
                                <Typography
                                    sx={{
                                        fontSize: '13px',
                                        mb: 0,
                                    }}
                                >
                                    Remove Size
                                </Typography>
                            }
                        >
                            <IconButton onClick={() => handleRemoveSizeSelected(size.size)}>
                                <BackspaceIcon sx={{ fontSize: '20px', color: '#000' }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 4 }}>
                        <TextField
                            label="Price"
                            fullWidth
                            type="number"
                            value={size.price}
                            onChange={handleSizeFieldChange(index, 'price')}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Price Sale"
                            fullWidth
                            type="number"
                            value={size.priceSale}
                            onChange={handleSizeFieldChange(index, 'priceSale')}
                            onBlur={() => handlePriceSaleBlur(index)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Stock"
                            fullWidth
                            type="number"
                            value={size.stock}
                            onChange={handleSizeFieldChange(index, 'stock')}
                            sx={{ mb: 2 }}
                        />
                    </Box>
                </Box>
            ))}

            <Box sx={{ display: 'flex', gap: 4 }}>
                <TextField
                    label="Brand"
                    fullWidth
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Category"
                    fullWidth
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
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

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="brand-select-label">Brand</InputLabel>
                    <Select
                        labelId="brand-select-label"
                        value={brand2}
                        label="Brand"
                        onChange={(e) => setBrand2(e.target.value)}
                    >
                        {brandOptions.map((brand) => (
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
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categoryOptions.map((category) => (
                            <MenuItem key={category._id} value={category._id}>
                                {category.nameEn}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
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
