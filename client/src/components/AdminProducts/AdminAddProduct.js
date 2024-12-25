import React, { useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    MenuItem,
    Select,
    Typography,
    InputLabel,
    FormControl,
    Checkbox,
    Tooltip,
    IconButton,
    ListItemText,
} from '@mui/material';
import AdminButtonBackPage from '../AdminButtonBackPage/AdminButtonBackPage';
import { mobileScreen, theme } from '../../Theme/Theme';
import useBrand from '../../api/useBrand';
import useCategory from '../../api/useCategory';
import { productAPI } from '../../api/productAPI';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { contentTemplate } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useSnackbarMessage } from '../../hooks/useSnackbarMessage';
import CancelIcon from '@mui/icons-material/Cancel';
import { AdminInputStyles } from '../AdminInputStyles/AdminInputStyles';
import { useBlur } from '../../hooks/useBlur';
import useValidationWithRef from '../../hooks/useValidationWithRef';

const AdminAddProduct = () => {
    const { showNotificationMessage } = useSnackbarMessage();
    const { formErrors, onHandleBlur } = useBlur();
    const { validateRequired, validateNumber } = useValidationWithRef();
    const [fakeErrors, setFakeErrors] = useState(null);
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [productName, setProductName] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [disabledButton, setDisabledButton] = useState(false);
    const [imgData, setImgData] = React.useState([]);

    const sizeOptions = ['9ml', '25ml', '27ml', '50ml', '65ml', '100ml'];

    const { data: brands } = useBrand();
    const brandOptions = brands?.data || [];

    const { data: categories } = useCategory();
    const categoryOptions = categories?.data || [];

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 0) {
            const imageUrls = files.map((file) => URL.createObjectURL(file));
            setImages((prevImages) => [...prevImages, ...imageUrls]);
            setImgData((prev) => [...prev, ...files]);
        }
    };
    const handleAddProduct = async () => {
        if (
            productName !== '' &&
            selectedSizes.length > 0 &&
            selectedSizes.every(
                (size) =>
                    size.size !== '' &&
                    size.price !== '' &&
                    size.priceSale !== '' &&
                    size.stock !== '',
            ) &&
            brand !== '' &&
            category !== ''
        ) {
            for (let i = 0; i < selectedSizes.length; i++) {
                console.log(+selectedSizes[i].priceSale);
            }
            if (selectedSizes.every((size) => +size.priceSale - +size.price > 0)) {
                showNotificationMessage(
                    'error',
                    'Price Error',
                    'Sale price cannot be greater than the original price!',
                );
            } else {
                const formData = new FormData();
                formData.append('nameVn', productName);
                formData.append('nameEn', productName);
                formData.append('category', category);
                formData.append('brand', brand);
                formData.append('content', JSON.stringify(contentTemplate));
                formData.append(
                    'variants',
                    JSON.stringify(
                        selectedSizes.map((size) => ({
                            size: size.size,
                            price: +size.price,
                            priceSale: +size.priceSale,
                            stock: +size.stock,
                        })),
                    ),
                );
                imgData.forEach((file) => {
                    formData.append('imagePath', file);
                });
                const addProductResponse = await productAPI.createProduct(formData);
                console.log('addProductResponse: ', addProductResponse);

                // successfully added

                showNotificationMessage(
                    'success',
                    'Add New Product',
                    'Add new prodcut successfully!',
                );

                setTimeout(() => {
                    navigate('/admin/manage-products');
                }, 2800);
            }
        } else {
            console.log('chay vo day ne');

            showNotificationMessage(
                'warning',
                'Add New Product',
                'Please fill product information!',
            );
        }
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

    const handleRemoveSizeSelected = (sizeToRemove) => {
        const updatedSizes = selectedSizes.filter((size) => size.size !== sizeToRemove);
        setSelectedSizes(updatedSizes);
    };

    console.log('current list: ', selectedSizes);

    const handleSizeFieldChange = (index, field) => (e) => {
        const newValue = e.target.value;
        console.log('new value: ', newValue);

        // Kiểm tra nếu giá trị là một số hợp lệ
        if (isNaN(newValue) || !isFinite(newValue)) {
            showNotificationMessage('warning', 'Invalid Input', 'Please enter a valid number!');

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
            if (+priceSale > +price) {
                showNotificationMessage(
                    'error',
                    'Price Error',
                    'Sale price cannot be greater than the original price!',
                );

                setDisabledButton(true);
            } else {
                setDisabledButton(false);
            }

            if (price < 0 || priceSale < 0 || stock < 0) {
                showNotificationMessage('error', 'Price Error', 'Number must be greater than 0!');

                setDisabledButton(true);
            }

            return updatedSizes;
        });
    };

    const handleRemoveImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        URL.revokeObjectURL(images[index]);
        setImages(updatedImages);
        setImgData((prevData) => prevData.filter((_, i) => i !== index));
    };
    console.log({ images });
    return (
        <Box
            sx={{
                p: 3,
                mx: 4,
                borderRadius: 2,
                [mobileScreen]: {
                    p: 2,
                    mx: 1,
                },
            }}
        >
            <AdminButtonBackPage title={'List Products'} />
            <Typography variant="h4" sx={{ mb: 3 }}>
                Add New Product
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2} my={2}>
                {images.map((image, index) => (
                    <Box key={index} sx={{ width: 164, height: 164, position: 'relative' }}>
                        <Avatar
                            alt={`Product Image ${index + 1}`}
                            src={image}
                            sx={{
                                width: 164,
                                height: 164,
                                marginBottom: 2,
                                borderRadius: 0,
                                border: '1px solid #d5d5d5',
                                filter: 'drop-shadow(0 0 0.75rem #ccc)',
                            }}
                        />
                        <Tooltip
                            title={
                                <Typography
                                    sx={{
                                        fontSize: '13px',
                                    }}
                                >
                                    Remove Image
                                </Typography>
                            }
                        >
                            <IconButton
                                sx={{ position: 'absolute', top: 0, right: 0 }}
                                onClick={() => handleRemoveImage(index)}
                            >
                                <CancelIcon
                                    sx={{
                                        fontSize: '28px',
                                        color: theme.palette.notification.inforIcon,
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Box>
                ))}
            </Box>
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
                <input
                    type="file"
                    name="imagePath"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={handleImageChange}
                />
            </Button>

            {/* <Paper sx={{ p: 2, maxHeight: '400px', overflow: 'scroll' }}> */}
            <Box sx={{ display: 'flex', gap: 4 }}>
                <AdminInputStyles
                    sx={{
                        '&.MuiFormHelperText-root': {
                            marginLeft: 0,
                        },
                    }}
                    label="Product Name"
                    fullWidth
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    onBlur={(e) => onHandleBlur('pName', e.target.value, validateRequired)}
                    helperText={
                        <Typography
                            sx={{
                                fontSize: '12px',
                                color: 'red',
                                fontWeight: 'bold',
                            }}
                        >
                            {formErrors?.pName?.message}
                        </Typography>
                    }
                />

                {/* select size */}
                <FormControl
                    fullWidth
                    sx={{
                        mb: 2,
                    }}
                >
                    <InputLabel
                        id="brand-select-label"
                        sx={{
                            fontSize: '14px',
                            '&.MuiFormLabel-root': {
                                fontSize: '14px',
                            },
                            '&.MuiInputLabel-root': {
                                fontSize: '14px',
                            },
                        }}
                    >
                        Size
                    </InputLabel>
                    <Select
                        labelId="brand-select-label"
                        value={selectedSizes.map((size) => size.size)}
                        label="Size"
                        renderValue={(selected) => selected.join(', ')}
                        sx={{ fontSize: '13px' }}
                        onClose={() => onHandleBlur('size', selectedSizes, validateRequired)} // Xử lý onBlur
                    >
                        {sizeOptions.map((size) => (
                            <MenuItem
                                key={size}
                                value={size}
                                onClick={() => handleMenuItemClick(size)}
                                sx={{
                                    fontSize: '14px',
                                }}
                            >
                                <Checkbox checked={selectedSizes.some((s) => s.size === size)} />
                                <ListItemText
                                    primary={
                                        <Typography sx={{ fontSize: '14px' }}>{size}</Typography>
                                    }
                                />
                            </MenuItem>
                        ))}
                    </Select>
                    <Typography
                        sx={{
                            fontSize: '12px',
                            color: 'red',
                            fontWeight: 'bold',
                            ml: '14px',
                        }}
                    >
                        {formErrors?.size?.message}
                    </Typography>
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
                        <AdminInputStyles
                            label="Price"
                            fullWidth
                            type="number"
                            value={size.price}
                            onChange={handleSizeFieldChange(index, 'price')}
                            onBlur={() => handlePriceSaleBlur(index)}
                            sx={{
                                mb: 2,
                            }}
                        />
                        <AdminInputStyles
                            label="Price Sale"
                            fullWidth
                            type="number"
                            value={size.priceSale}
                            onChange={handleSizeFieldChange(index, 'priceSale')}
                            onBlur={() => handlePriceSaleBlur(index)}
                            sx={{ mb: 2 }}
                        />
                        <AdminInputStyles
                            label="Stock"
                            fullWidth
                            type="number"
                            value={size.stock}
                            onChange={handleSizeFieldChange(index, 'stock')}
                            onBlur={() => handlePriceSaleBlur(index)}
                            sx={{ mb: 2 }}
                        />
                    </Box>
                </Box>
            ))}

            <Box sx={{ display: 'flex', gap: 4 }}>
                <FormControl
                    fullWidth
                    sx={{
                        mb: 2,
                    }}
                >
                    <InputLabel
                        id="brand-select-label"
                        sx={{
                            fontSize: '14px',
                            '&.MuiFormLabel-root': {
                                fontSize: '14px',
                            },
                            '&.MuiInputLabel-root': {
                                fontSize: '14px',
                            },
                        }}
                    >
                        Brand
                    </InputLabel>
                    <Select
                        labelId="brand-select-label"
                        value={brand}
                        label="Brand"
                        onChange={(e) => setBrand(e.target.value)}
                        sx={{ fontSize: '13px' }}
                        onClose={() => onHandleBlur('brand', brand, validateRequired)} // Xử lý onBlur
                    >
                        {brandOptions.map(
                            (brand) =>
                                brand.status === 'active' && (
                                    <MenuItem
                                        key={brand._id}
                                        value={brand._id}
                                        sx={{
                                            fontSize: '13px',
                                        }}
                                    >
                                        {brand.nameEn}
                                    </MenuItem>
                                ),
                        )}
                    </Select>
                    <Typography
                        sx={{
                            fontSize: '12px',
                            color: 'red',
                            fontWeight: 'bold',
                            ml: '14px',
                        }}
                    >
                        {formErrors?.brand?.message}
                    </Typography>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel
                        id="category-select-label"
                        sx={{
                            fontSize: '14px',
                            '&.MuiFormLabel-root': {
                                fontSize: '14px',
                            },
                            '&.MuiInputLabel-root': {
                                fontSize: '14px',
                            },
                        }}
                    >
                        Category
                    </InputLabel>
                    <Select
                        labelId="category-select-label"
                        value={category}
                        label="Category"
                        onChange={(e) => setCategory(e.target.value)}
                        sx={{ fontSize: '13px' }}
                        onClose={() => onHandleBlur('category', brand, validateRequired)} // Xử lý onBlur
                    >
                        {categoryOptions.map(
                            (category) =>
                                category.status === 'active' && (
                                    <MenuItem
                                        key={category._id}
                                        value={category._id}
                                        sx={{
                                            fontSize: '13px',
                                        }}
                                    >
                                        {category.nameEn}
                                    </MenuItem>
                                ),
                        )}
                    </Select>
                    <Typography
                        sx={{
                            fontSize: '12px',
                            color: 'red',
                            fontWeight: 'bold',
                            ml: '14px',
                        }}
                    >
                        {formErrors?.category?.message}
                    </Typography>
                </FormControl>
            </Box>
            {/* </Paper> */}

            <Box sx={{ display: 'flex', gap: 4 }}>
                <AdminButtonDesign
                    title={'Create Product'}
                    bgcolor={theme.palette.admin.bgColor}
                    onHandleClick={handleAddProduct}
                    type={'contained'}
                    textColor={'white'}
                    disabled={disabledButton}
                />
                <AdminButtonDesign
                    title={'Cancel'}
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

const AdminButtonDesign = ({
    type,
    bgcolor,
    title,
    onHandleClick,
    textColor,
    borderColor,
    disabled,
}) => {
    return (
        <Button
            variant={type}
            onClick={onHandleClick}
            disabled={disabled}
            sx={{
                color: textColor,
                marginTop: 2,
                padding: '10px 18px',
                fontSize: '14px',
                textTransform: 'initial',
                borderRadius: 1,
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
