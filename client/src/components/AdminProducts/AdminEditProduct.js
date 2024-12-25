import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import isEqual from 'lodash/isEqual';
import { useNavigate, useParams } from 'react-router-dom';
import AdminButtonBackPage from '../AdminButtonBackPage/AdminButtonBackPage';
import { productAPI } from '../../api/productAPI';
import useBrand from '../../api/useBrand';
import useCategory from '../../api/useCategory';
import { mobileScreen, theme } from '../../Theme/Theme';
import useProductById from '../../api/useProductById';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useSnackbarMessage } from '../../hooks/useSnackbarMessage';
import {
    AdminAreaInput,
    AdminInputStyles,
    AdminNormalInput,
} from '../AdminInputStyles/AdminInputStyles';
import { useBlur } from '../../hooks/useBlur';
import useValidationWithRef from '../../hooks/useValidationWithRef';

const AdminEditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { formErrors, onHandleBlur } = useBlur();
    const { validateRequired, validateSelect } = useValidationWithRef();
    const [fakeErrors, setFakeErrors] = useState([]);
    const { showNotificationMessage } = useSnackbarMessage();
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
    const [content, setContent] = useState({
        originEn: '',
        originVn: 'It',
        yearOfRelease: '',
        concentration: '',
        fragranceGroup: '',
        manufacturer: '',
        shortContentEn: '',
        shortContentVn: '',
        topNotesEn: '',
        heartNotesEn: '',
        baseNotesEn: '',
        topNotesVn: '',
        heartNotesVn: '',
        baseNotesVn: '',
        mainContentEn: '',
        mainContentVn: '',
        longevity: '',
        sillage: '',
        likability: '',
    });

    const [disabledButton, setDisabledButton] = useState(false);
    const [selectedSizes, setSelectedSizes] = useState([]);

    // notifications

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
            setContent(stableProduct.content);
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
            formData.append('content', JSON.stringify(content));
            formData.append('variants', JSON.stringify(variants));
            newImages.forEach((file) => {
                formData.append('imagePath', file);
            });
            formData.append('deletedImages', JSON.stringify(deletedImages));
            const updateResponse = await productAPI.editProduct(id, formData);
            if (updateResponse.status === 200) {
                mutate();
                showNotificationMessage(
                    'success',
                    'Edit Product',
                    'Update product information successfully!',
                );
                // navigate('/admin/manage-products');
            }
        } else {
            showNotificationMessage(
                'error',
                'Price Error2',
                'Sale price cannot be greater than the original price!',
            );
        }
    };

    const handleSizeFieldChange = (index, field) => (e) => {
        const newValue = e.target.value;
        // check input for number
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

    const handlePriceBlur = (index) => {
        setSelectedSizes((prevSizes) => {
            const updatedSizes = [...prevSizes];
            const { price } = updatedSizes[index];

            const errors = { ...fakeErrors };

            // Kiểm tra nếu price rỗng
            if (price === '') {
                showNotificationMessage('error', 'Price Input', 'Please enter these fields');
                setDisabledButton(true);
                errors[index] = {
                    ...errors[index],
                    price: 'This field required!',
                };
            } else if (price < 0) {
                showNotificationMessage('error', 'Price Error', 'Number must be greater than 0!');
                setDisabledButton(true);
                errors[index] = {
                    ...errors[index],
                    price: 'Number must be greater than 0!',
                };
            } else {
                // Xóa lỗi nếu price hợp lệ
                if (errors[index]?.price) {
                    delete errors[index].price;
                }
                setDisabledButton(false);
            }

            setFakeErrors(errors);
            return updatedSizes;
        });
    };

    const handlePriceSaleBlur = (index) => {
        setSelectedSizes((prevSizes) => {
            const updatedSizes = [...prevSizes];
            const { price, priceSale } = updatedSizes[index];

            const errors = { ...fakeErrors };

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

            // Kiểm tra nếu priceSale rỗng
            if (priceSale === '') {
                showNotificationMessage('error', 'Price Input', 'Please enter these fields');
                setDisabledButton(true);
                errors[index] = {
                    ...errors[index],
                    priceSale: 'This field required!',
                };
            } else if (priceSale < 0) {
                showNotificationMessage('error', 'Price Error', 'Number must be greater than 0!');
                setDisabledButton(true);
                errors[index] = {
                    ...errors[index],
                    priceSale: 'Number must be greater than 0!',
                };
            } else if (+priceSale > +price) {
                errors[index] = {
                    ...errors[index],
                    priceSale: 'Price sale cannot be greater than the original price!',
                };
            } else {
                // Xóa lỗi nếu priceSale hợp lệ
                if (errors[index]?.priceSale) {
                    delete errors[index].priceSale;
                }
                setDisabledButton(false);
            }

            setFakeErrors(errors);
            return updatedSizes;
        });
    };

    const handleStockBlur = (index) => {
        setSelectedSizes((prevSizes) => {
            const updatedSizes = [...prevSizes];
            const { stock } = updatedSizes[index];

            const errors = { ...fakeErrors };

            // Kiểm tra nếu stock rỗng hoặc < 0
            if (stock === '') {
                showNotificationMessage('error', 'Stock Input', 'Please enter these fields');
                setDisabledButton(true);
                errors[index] = {
                    ...errors[index],
                    stock: 'This field required!',
                };
            } else if (stock < 0) {
                showNotificationMessage('error', 'Stock Error', 'Number must be greater than 0!');
                setDisabledButton(true);
                errors[index] = {
                    ...errors[index],
                    stock: 'Number must be greater than 0!',
                };
            } else {
                // Xóa lỗi nếu stock hợp lệ
                if (errors[index]?.stock) {
                    delete errors[index].stock;
                }
                setDisabledButton(false);
            }

            setFakeErrors(errors);
            return updatedSizes;
        });
    };

    // const handlePriceSaleBlur = (index) => {
    //     setSelectedSizes((prevSizes) => {
    //         const updatedSizes = [...prevSizes];
    //         const { price, priceSale, stock } = updatedSizes[index];

    //         // Kiểm tra điều kiện priceSale > price
    //         if (priceSale > price) {
    //             showNotificationMessage(
    //                 'error',
    //                 'Price Error',
    //                 'Sale price cannot be greater than the original price!',
    //             );

    //             setDisabledButton(true);
    //         } else {
    //             setDisabledButton(false);
    //         }
    //         if (price < 0 || priceSale < 0 || stock < 0) {
    //             showNotificationMessage('error', 'Price Error', 'Number must be greater than 0!');

    //             setDisabledButton(true);
    //         }

    //         return updatedSizes;
    //     });
    // };

    const handleChange = (field) => (e) => {
        setContent((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
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
                <AdminInputStyles
                    label="Product Name"
                    fullWidth
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    sx={{ mb: 2 }}
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
            </Box>

            {selectedSizes?.map((size, index) => (
                <Box key={size.size} sx={{ mb: 2 }}>
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
                        <AdminInputStyles
                            label="Price"
                            fullWidth
                            type="number"
                            value={size.price}
                            onChange={handleSizeFieldChange(index, 'price')}
                            onBlur={() => handlePriceBlur(index)}
                            sx={{ mb: 2 }}
                            helperText={
                                fakeErrors[index]?.price && (
                                    <Typography
                                        sx={{ fontSize: '12px', color: 'red', fontWeight: 'bold' }}
                                    >
                                        {fakeErrors[index].price}
                                    </Typography>
                                )
                            }
                        />
                        <AdminInputStyles
                            label="Price Sale"
                            fullWidth
                            type="number"
                            value={size.priceSale}
                            onChange={handleSizeFieldChange(index, 'priceSale')}
                            onBlur={() => handlePriceSaleBlur(index)}
                            sx={{ mb: 2 }}
                            helperText={
                                fakeErrors[index]?.priceSale && (
                                    <Typography
                                        sx={{ fontSize: '12px', color: 'red', fontWeight: 'bold' }}
                                    >
                                        {fakeErrors[index].priceSale}
                                    </Typography>
                                )
                            }
                        />
                        <AdminInputStyles
                            label="Stock"
                            fullWidth
                            type="number"
                            value={size.stock}
                            onChange={handleSizeFieldChange(index, 'stock')}
                            onBlur={() => handleStockBlur(index)}
                            sx={{ mb: 2 }}
                            helperText={
                                fakeErrors[index]?.stock && (
                                    <Typography
                                        sx={{ fontSize: '12px', color: 'red', fontWeight: 'bold' }}
                                    >
                                        {fakeErrors[index].stock}
                                    </Typography>
                                )
                            }
                        />
                    </Box>
                </Box>
            ))}
            <Box sx={{ display: 'flex', gap: 4 }}>
                <AdminNormalInput
                    label={'Origin'}
                    type={'text'}
                    value={content.originEn}
                    onHandleChange={handleChange('originEn')}
                    onHandleBlur={''}
                />
                <AdminNormalInput
                    label={'Year of manufacture'}
                    type={'text'}
                    value={content.yearOfRelease}
                    onHandleChange={handleChange('yearOfRelease')}
                    onHandleBlur={''}
                />
            </Box>

            <Box sx={{ display: 'flex', gap: 4 }}>
                <AdminNormalInput
                    label={'Concentration'}
                    type={'text'}
                    value={content.concentration}
                    onHandleChange={handleChange('concentration')}
                    onHandleBlur={''}
                />
                <AdminNormalInput
                    label={'Fragrance group'}
                    type={'text'}
                    value={content.fragranceGroup}
                    onHandleChange={handleChange('fragranceGroup')}
                    onHandleBlur={''}
                />
                <AdminNormalInput
                    label={'Manufacturer'}
                    type={'text'}
                    value={content.manufacturer}
                    onHandleChange={handleChange('manufacturer')}
                    onHandleBlur={''}
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <AdminAreaInput
                    label={'Short Description'}
                    type={'number'}
                    value={content.shortContentEn}
                    onHandleChange={handleChange('shortContentEn')}
                    onHandleBlur={''}
                />
                <AdminAreaInput
                    label={'Short Description Vietnamese'}
                    type={'number'}
                    value={content.shortContentVn}
                    onHandleChange={handleChange('shortContentVn')}
                    onHandleBlur={''}
                />
            </Box>

            <Box sx={{ display: 'flex', gap: 4 }}>
                <AdminNormalInput
                    label={'Top Note'}
                    type={'text'}
                    value={content.topNotesEn}
                    onHandleChange={handleChange('topNotesEn')}
                    onHandleBlur={''}
                />
                <AdminNormalInput
                    label={'Heart Note'}
                    type={'text'}
                    value={content.heartNotesEn}
                    onHandleChange={handleChange('heartNotesEn')}
                    onHandleBlur={''}
                />
                <AdminNormalInput
                    label={'Base Note'}
                    type={'text'}
                    value={content.baseNotesEn}
                    onHandleChange={handleChange('baseNotesEn')}
                    onHandleBlur={''}
                />
            </Box>

            <Box sx={{ display: 'flex', gap: 4 }}>
                <AdminNormalInput
                    label={'Top Note Vietnamese'}
                    type={'text'}
                    value={content.topNotesVn}
                    onHandleChange={handleChange('topNotesVn')}
                    onHandleBlur={''}
                />
                <AdminNormalInput
                    label={'Heart Note Vietnamese'}
                    type={'text'}
                    value={content.heartNotesVn}
                    onHandleChange={handleChange('heartNotesVn')}
                    onHandleBlur={''}
                />
                <AdminNormalInput
                    label={'Base Note Vietnamese'}
                    type={'text'}
                    value={content.baseNotesVn}
                    onHandleChange={handleChange('baseNotesVn')}
                    onHandleBlur={''}
                />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <AdminAreaInput
                    label={'Main Description'}
                    type={'number'}
                    value={content.mainContentEn}
                    onHandleChange={handleChange('mainContentEn')}
                    onHandleBlur={''}
                />
                <AdminAreaInput
                    label={'Main Description Vietnamese'}
                    type={'number'}
                    value={content.mainContentVn}
                    onHandleChange={handleChange('mainContentVn')}
                    onHandleBlur={''}
                />
            </Box>

            <Box sx={{ display: 'flex', gap: 4 }}>
                <AdminNormalInput
                    label={'Fragrance lasting'}
                    type={'number'}
                    value={content.longevity}
                    onHandleChange={handleChange('longevity')}
                    onHandleBlur={''}
                />
                <AdminNormalInput
                    label={'Fragrance diffusion'}
                    type={'number'}
                    value={content.sillage}
                    onHandleChange={handleChange('sillage')}
                    onHandleBlur={''}
                />
                <AdminNormalInput
                    label={'Nose pleasing'}
                    type={'number'}
                    value={content.likability}
                    onHandleChange={handleChange('likability')}
                    onHandleBlur={''}
                />
            </Box>

            <Box sx={{ display: 'flex', gap: 4 }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="brand-select-label" sx={{ fontSize: '14px' }}>
                        Brand
                    </InputLabel>
                    <Select
                        labelId="brand-select-label"
                        value={brand}
                        label="Brand"
                        onChange={(e) => setBrand(e.target.value)} // get id of value
                        sx={{ fontSize: '13px' }}
                        onClose={(e) => {
                            onHandleBlur('brand', e.target.value, validateSelect); // Truyền giá trị ban đầu
                        }}
                    >
                        {/* only get all brands are active */}
                        {brandOptions?.map(
                            (brand) =>
                                brand.status === 'active' && (
                                    <MenuItem
                                        key={brand._id}
                                        value={brand._id}
                                        sx={{ fontSize: '13px' }}
                                    >
                                        {brand.nameEn}
                                    </MenuItem>
                                ),
                        )}
                    </Select>
                    {brand === '' && (
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
                    )}
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="category-select-label" sx={{ fontSize: '14px' }}>
                        Category
                    </InputLabel>
                    <Select
                        labelId="category-select-label"
                        value={category}
                        label="Category"
                        onChange={(e) => setCategory(e.target.value)}
                        sx={{ fontSize: '14px' }}
                        onClose={(e) => onHandleBlur('category', e.target.value, validateSelect)} // Xử lý onBlur
                    >
                        {/* only get all categories are active */}
                        {categoryOptions?.map(
                            (category) =>
                                category.status === 'active' && (
                                    <MenuItem
                                        key={category._id}
                                        value={category._id}
                                        sx={{ fontSize: '13px' }}
                                    >
                                        {category.nameEn}
                                    </MenuItem>
                                ),
                        )}
                    </Select>
                    {category === '' && (
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
                    )}
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
        </Box>
    );
};

export default AdminEditProduct;
