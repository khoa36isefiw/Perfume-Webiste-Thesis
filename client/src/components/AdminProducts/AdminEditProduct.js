import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import isEqual from 'lodash/isEqual';
import { useLocation, useParams } from 'react-router-dom';
import AdminButtonBackPage from '../AdminButtonBackPage/AdminButtonBackPage';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { productAPI } from '../../api/productAPI';
import useBrand from '../../api/useBrand';
import useCategory from '../../api/useCategory';
import { mobileScreen, theme } from '../../Theme/Theme';
import useProductById from '../../api/useProductById';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

const AdminEditProduct = () => {
    const { id } = useParams();
    const { data: productRes, mutate } = useProductById(id);
    const productData = productRes?.data;
    const productDataRef = useRef(null);
    const stableProduct = useMemo(() => productData?.product || null, [productData]);
    // Set up local state for editable product information
    const [images, setImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [deletedImages, setDeletedImages] = useState([]);
    const [newImages, setNewImages] = React.useState([]);
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [disabledButton, setDisabledButton] = useState(false);
    const [selectedSizes, setSelectedSizes] = useState([]);

    // notifications
    const [showNotification, setShowNotification] = useState(false);
    const [showAnimation, setShowAnimation] = useState('animate__bounceInRight');
    const [messageType, setMessageType] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [messageTitle, setMessageTitle] = useState('');

    const { data: brands } = useBrand();
    const brandOptions = brands?.data || [];

    const { data: categories } = useCategory();
    const categoryOptions = categories?.data || [];

    useEffect(() => {
        if (isEqual(productDataRef.current, stableProduct)) return;
        productDataRef.current = stableProduct;
        if (stableProduct) {
            setProductName(stableProduct.nameEn);
            setCategory(stableProduct.category._id);
            setBrand(stableProduct.brand._id);
            setSelectedSizes(
                stableProduct.variants.map((variant) => ({
                    _id: variant._id,
                    size: variant.size,
                    price: +variant.price,
                    priceSale: +variant.priceSale,
                    stock: +variant.stock,
                })),
            );
            setImages(stableProduct.imagePath);
            setExistingImages(stableProduct.imagePath);
        }
    }, [stableProduct]);

    // Handle file input for image update
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const imageUrls = files?.map((file) => URL.createObjectURL(file));
            setImages((prevImages) => [...prevImages, ...imageUrls]);
            setNewImages((prev) => [...prev, ...files]);
        }
    };

    const handleRemoveImage = (index, isExisting) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
        if (isExisting) {
            // If the image is an existing one, add it to the deleted list
            setDeletedImages((prevDeleted) => [...prevDeleted, images[index]]);
            setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index));
        } else {
            URL.revokeObjectURL(images[index]);
            setNewImages((prevData) =>
                prevData.filter((_, i) => i !== index - existingImages.length),
            );
        }
    };

    const handleSave = async () => {
        const variants = selectedSizes?.map((variant) => ({
            _id: variant._id,
            size: variant.size,
            price: +variant.price, // + operator --> convert to number
            priceSale: +variant.priceSale, // convert to number
            stock: +variant.stock, // convert to number
        }));
        //check if price sale is greater than the original price???
        const checkPriceSale = selectedSizes.some((variant) => variant.priceSale > variant.price);

        console.log('checkPriceSale: ', checkPriceSale);
        if (!checkPriceSale) {
            const formData = new FormData();
            formData.append('nameVn', productName);
            formData.append('nameEn', productName);
            formData.append('category', category);
            formData.append('brand', brand);
            formData.append('variants', JSON.stringify(variants));
            newImages.forEach((file) => {
                formData.append('imagePath', file);
            });
            formData.append('deletedImages', JSON.stringify(deletedImages));
            const updateResponse = await productAPI.editProduct(id, formData);
            if (updateResponse.status === 200) {
                mutate();
                setShowNotification(true);
                setShowAnimation('animate__bounceInRight');
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

    const handlePriceSaleBlur = (index) => {
        setSelectedSizes((prevSizes) => {
            const updatedSizes = [...prevSizes];
            const { price, priceSale, stock } = updatedSizes[index];

            // Kiểm tra điều kiện priceSale > price
            if (priceSale > price) {
                setShowNotification(true);
                setShowAnimation('animate__bounceInRight');
                setMessageType('error');
                setMessageTitle('Price Error');
                setMessageContent('Sale price cannot be greater than the original price!');
                setDisabledButton(true);
            } else {
                setDisabledButton(false);
            }
            if (price < 0 || priceSale < 0 || stock < 0) {
                setShowNotification(true);
                setShowAnimation('animate__bounceInRight');
                setMessageType('error');
                setMessageTitle('Price Error');
                setMessageContent('Number must be greater than 0!');
                setDisabledButton(true);
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
                [mobileScreen]: {
                    padding: 2,
                    mx: 0,
                },
            }}
        >
            <AdminButtonBackPage title={'List Products'} />
            <Typography variant="h4" sx={{ mb: 3, fontSize: '15px' }}>
                Edit Product: {productData?.product.nameEn}
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2} my={2}>
                {images?.map((image, index) => (
                    <Box key={index}>
                        <Avatar
                            alt={`Product Image ${index + 1}`}
                            src={image}
                            sx={{ width: 128, height: 128, marginBottom: 2, borderRadius: 0 }}
                        />
                        <Button
                            startIcon={<DeleteSweepIcon sx={{ fontSize: '24px' }} />}
                            sx={{ fontSize: '14px', textTransform: 'initial' }}
                            onClick={() => handleRemoveImage(index, existingImages.includes(image))}
                        >
                            Remove
                        </Button>
                    </Box>
                ))}
            </Box>

            {/* Input for updating image */}
            <Button variant="outlined" component="label" sx={{ marginBottom: 2 }}>
                Update Image
                <input
                    type="file"
                    name="imagePath"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={handleImageChange}
                    onClick={(e) => (e.target.value = null)}
                />
            </Button>

            <Box sx={{ display: 'flex', gap: 4 }}>
                <TextField
                    label="Product Name"
                    fullWidth
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    sx={{ mb: 2 }}
                />
            </Box>

            {selectedSizes?.map((size, index) => (
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
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categoryOptions?.map((category) => (
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
                    disabled={disabledButton}
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
                    Update Product
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
