import React, { useEffect, useState } from 'react';
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
import { useLocation, useParams } from 'react-router-dom';
import AdminButtonBackPage from '../AdminButtonBackPage/AdminButtonBackPage';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { productAPI } from '../../api/productAPI';
import useBrand from '../../api/useBrand';
import useCategory from '../../api/useCategory';
import { categoriesAPI } from '../../api/categoriesAPI';
import { brandApi } from '../../api/brandApi';
import { mobileScreen, theme } from '../../Theme/Theme';
import useProductById from '../../api/useProductById';

const AdminEditProduct = () => {
    const { id } = useParams();
    console.log('id: ', id);
    const { data: productRes } = useProductById(id);
    const productData = productRes?.data;
    console.log('productData: ', productData);

    // Set up local state for editable product information
    const [images, setImages] = useState([]);
    const [imgData, setImgData] = React.useState([]);
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
        if (productData) {
            setProductName(productData?.product.nameEn);
            setCategory(productData?.product?.category._id);
            setBrand(productData?.product.brand._id);
            setSelectedSizes(
                productData?.product.variants.map((variant) => ({
                    _id: variant._id,
                    size: variant.size,
                    price: +variant.price,
                    priceSale: +variant.priceSale,
                    stock: +variant.stock,
                })),
            );
            setImgData(productData?.product.imagePath);
            setImages(productData?.product.imagePath);
        }
    }, [productData]);

    // Handle file input for image update
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        console.log({ files });
        if (files.length > 0) {
            const imageUrls = files?.map((file) => URL.createObjectURL(file));
            console.log({ imageUrls });
            setImages((prevImages) => [...prevImages, ...imageUrls]);
            setImgData((prev) => [...prev, ...files]);
        }
    };

    const handleSave = async () => {
        const getCategoryById = await categoriesAPI.getCategoryById(category);
        const getBrandById = await brandApi.getBrandById(brand);

        const productId = productData?.productId;
        const variants = selectedSizes?.map((variant) => ({
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

        const checkEmpty = selectedSizes.every(
            (size) => size.price === '' && size.priceSale === '' && size.stock === '',
        );

        console.log('checkEmpty: ', checkEmpty);

        const checkEmptyS = selectedSizes.some(
            (size) => size.price === '' || size.priceSale === '' || size.stock === '',
        );

        console.log('checkEmptyS: ', checkEmptyS);

        // check empty, null
        // if (
        //     images.length < 0 &&
        //     productName !== '' &&
        //     category !== '' &&
        //     brand !== '' &&
        //     !checkEmptyS
        // ) {
        //     console.log('checkPriceSale: ', checkPriceSale);
        //     if (!checkPriceSale) {
        //         console.log('here');
        //         const updateResponse = await productAPI.editProduct(productId, data);
        //         if (updateResponse.status === 200) {
        //             setShowNotification(true);
        //             setShowAnimation('animate__bounceInRight');
        //             setMessageType('success');
        //             setMessageContent('Update product information successfully!');
        //             setMessageTitle('Edit Product');
        //         }
        //     } else {
        //         console.log('here2');

        //         setShowNotification(true);
        //         setShowAnimation('animate__bounceInRight');
        //         setMessageType('error');
        //         setMessageTitle('Price Error2');
        //         setMessageContent('Sale price cannot be greater than the original price!');
        //     }
        // } else {
        //     console.log('here3');

        //     setShowNotification(true);
        //     setShowAnimation('animate__bounceInRight');
        //     setMessageType('warning');
        //     setMessageTitle('Update Product');
        //     setMessageContent('Please fill product information!');
        // }

        console.log('checkPriceSale: ', checkPriceSale);
        if (!checkPriceSale) {
            console.log('here');
            const updateResponse = await productAPI.editProduct(productId, data);
            if (updateResponse.status === 200) {
                setShowNotification(true);
                setShowAnimation('animate__bounceInRight');
                setMessageType('success');
                setMessageContent('Update product information successfully!');
                setMessageTitle('Edit Product');
            }
        } else {
            console.log('here2');

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
    console.log({ images });
    const handleRemoveImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
        setImgData((prevData) => prevData.filter((_, i) => i !== index));
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
            <Typography variant="h4" sx={{ mb: 3 }}>
                Edit Product: {productData?.nameEn}
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2} my={2}>
                {images?.map((image, index) => (
                    <Box key={index}>
                        <Avatar
                            alt={`Product Image ${index + 1}`}
                            src={image}
                            sx={{ width: 128, height: 128, marginBottom: 2, borderRadius: 0 }}
                        />
                        <Button onClick={() => handleRemoveImage(index)}>Remove</Button>
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
