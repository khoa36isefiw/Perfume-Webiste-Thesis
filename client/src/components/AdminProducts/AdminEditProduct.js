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
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import AdminButtonBackPage from '../AdminButtonBackPage/AdminButtonBackPage';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { productAPI } from '../../api/productAPI';
import useBrand from '../../api/useBrand';
import useCategory from '../../api/useCategory';
import { categoriesAPI } from '../../api/categoriesAPI';
import { brandApi } from '../../api/brandApi';
import { theme } from '../../Theme/Theme';

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
    const [category, setCategory] = useState(productTest.category._id);
    const [brand, setBrand] = useState(productTest.brand._id);
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
                setImage(reader.result); // update the image with base64 string
            };
            reader.readAsDataURL(file);
        }
    };

    console.log('brand: ', brand);
    // Handle form submission (you can connect this to your API to save the updated data)
    const handleSave = async () => {
        const getCategoryById = await categoriesAPI.getCategoryById(category);
        const getBrandById = await brandApi.getBrandById(brand);
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
            brand: {
                _id: brand,
                nameVn: getBrandById.nameVn,
                nameEn: getBrandById.nameEn,
            },
            category: {
                _id: category, //category is an ID
                nameVn: getCategoryById.nameVn,
                nameEn: getCategoryById.nameEn,
                parentId: null,
            },
        };

        //check if price sale is greater than the original price???
        const checkPriceSale = selectedSizes.some((variant) => variant.priceSale > variant.price);
        // check empty, null
        if (
            image !== '' &&
            productName !== '' &&
            category !== '' &&
            brand !== '' &&
            selectedSizes.size !== '' &&
            selectedSizes.price !== '' &&
            selectedSizes.priceSale !== '' &&
            selectedSizes.stock !== ''
        ) {
            console.log('checkPriceSale: ', checkPriceSale);
            if (!checkPriceSale) {
                const updateResponse = await productAPI.editProduct(productId, data);
                if (updateResponse.status == 200) {
                    setMessageType('success');
                    setMessageContent('Update product information successfully!');
                    setMessageTitle('Edit Product');
                }
            } else {
                setShowNotification(true);
                setShowAnimation('animate__bounceInRight');
                setMessageType('error');
                setMessageTitle('Price Error2');
                setMessageContent('Sale price cannot be greater than the original price!');
            }
        } else {
            setShowNotification(true);
            setShowAnimation('animate__bounceInRight');
            setMessageType('warning');
            setMessageTitle('Update Product');
            setMessageContent('Please fill product information!');
        }
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
        // check input for number
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
                {/* <FormControl fullWidth sx={{ mb: 2 }}>
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
                </FormControl> */}
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
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="brand-select-label">Brand</InputLabel>
                    <Select
                        labelId="brand-select-label"
                        value={brand}
                        label="Brand"
                        onChange={(e) => setBrand(e.target.value)} // get id of value
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
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    sx={{
                        fontSize: '12px',
                        textTransform: 'initial',
                        padding: '10px 18px',
                        bgcolor: theme.palette.admin.bgColor,
                        borderColor: theme.palette.admin.bgColor,
                        color: 'white',
                        '&:hover': {
                            bgcolor: theme.palette.admin.bgColor,
                            borderColor: theme.palette.admin.bgColor,
                        },
                    }}
                >
                    Save Changes
                </Button>
            </Box>
            {showNotification && (
                <Box
                    sx={{ position: 'fixed', top: '5%', right: '1%', zIndex: 9999999 }}
                    className={`animate__animated ${showAnimation}`}
                >
                    <NotificationMessage
                        msgType={messageType}
                        msgContent={messageContent}
                        msgTitle={messageTitle}
                        // msgType={'success'}
                        // msgContent={'Update product information successfully!'}
                        // msgTitle={'Edit Product'}
                        autoHideDuration={3000} // Auto-hide after 5 seconds
                        onClose={handleCloseNotification}
                    />
                </Box>
            )}
        </Box>
    );
};

export default AdminEditProduct;
