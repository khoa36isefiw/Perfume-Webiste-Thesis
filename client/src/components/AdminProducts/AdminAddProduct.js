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
    Tooltip,
    IconButton,
    FormControlLabel,
    ListItemText,
} from '@mui/material';
import AdminButtonBackPage from '../AdminButtonBackPage/AdminButtonBackPage';
import { theme } from '../../Theme/Theme';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import useBrand from '../../api/useBrand';
import useCategory from '../../api/useCategory';
import { productAPI } from '../../api/productAPI';
import { categoriesAPI } from '../../api/categoriesAPI';
import { brandApi } from '../../api/brandApi';
import BackspaceIcon from '@mui/icons-material/Backspace';

const AdminAddProduct = () => {
    const [image, setImage] = useState(null);
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [priceSale, setPriceSale] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [checked, setChecked] = useState(true);

    // notifications
    const [showNotification, setShowNotification] = useState(false);
    const [showAnimation, setShowAnimation] = useState('animate__bounceInRight');
    const [messageType, setMessageType] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [messageTitle, setMessageTitle] = useState('');

    const sizeOptions = ['9ml', '25ml', '27ml', '50ml', '65ml', '100ml'];

    const { data: brands } = useBrand();
    const brandOptions = brands?.data || [];

    const { data: categories } = useCategory();
    const categoryOptions = categories?.data || [];

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

    const handleAddProduct = async () => {
        console.log('category: ', category);
        const getCategoryById = await categoriesAPI.getCategoryById(category);
        const getBrandById = await brandApi.getBrandById(brand);

        console.log('getCategoryById: ', getCategoryById);
        if (
            image !== null &&
            productName !== '' &&
            brand !== '' &&
            category !== '' &&
            selectedSizes.length > 0 &&
            selectedSizes.every(
                (size) =>
                    size.size !== '' &&
                    size.price !== '' &&
                    size.priceSale !== '' &&
                    size.stock !== '',
            )
        ) {
            const newProductData = {
                nameVn: productName,
                nameEn: productName,
                variants: selectedSizes.map((size) => ({
                    size: size.size,
                    price: +size.price, // + operator converts string to number
                    priceSale: +size.priceSale,
                    stock: +size.stock,
                })),
                // imagePath: [image],
                category: {
                    _id: category, //category is an ID
                    nameVn: getCategoryById.nameVn,
                    nameEn: getCategoryById.nameEn,
                    parentId: null,
                },
                brand: {
                    _id: brand,
                    nameVn: getBrandById.nameVn,
                    nameEn: getBrandById.nameEn,
                },

                // default content
                content: {
                    origin: 'France',
                    yearOfRelease: '2017',
                    concentration: 'Extrait de Parfum (EDP)',
                    fragranceGroup: 'Oriental Floral',
                    manufacturer: 'Francis Kurkdjian',
                    shortContent:
                        'Baccarat Rouge 540 Extrait De Parfum by Maison Francis Kurkdjian là một hương thơm thuộc nhóm hương Oriental Floral, được ra mắt vào năm 2017. Đây là phiên bản nồng độ cao hơn và phong phú hơn của Baccarat Rouge 540, do chính Francis Kurkdjian sáng tạo.',
                    topNotes: 'Nghệ tây, Hạnh nhân đắng',
                    heartNotes: 'Hoa nhài Ai Cập, Gỗ tuyết tùng',
                    baseNotes: "Hương gỗ, 'Hổ phách, Xạ hương",
                    mainContent:
                        'Baccarat Rouge 540 Extrait De Parfum mở đầu với sự quyến rũ của nghệ tây và hạnh nhân đắng, tạo nên một sự khởi đầu ấm áp và phong phú. Hương giữa là sự kết hợp tinh tế giữa hoa nhài Ai Cập và gỗ tuyết tùng, mang lại sự thanh thoát và sang trọng. Cuối cùng, hương gỗ, hổ phách và xạ hương tạo nên tầng hương cuối ấm áp, sâu lắng và bền bỉ.\n\nBaccarat Rouge 540 Extrait De Parfum mang lại cảm giác sang trọng, quý phái và độc đáo. Hương thơm này rất phù hợp khi sử dụng trong những dịp đặc biệt, tiệc tối hoặc sự kiện đẳng cấp. Nó toát lên sự tự tin và cuốn hút, khiến người sử dụng trở thành tâm điểm chú ý.\n\nThuộc nhóm hương Oriental Floral, Baccarat Rouge 540 Extrait De Parfum phù hợp với những người có gu thẩm mỹ tinh tế, yêu thích sự độc đáo và khác biệt. Họ thường là những người có phong cách riêng biệt, không ngại nổi bật và luôn tìm kiếm sự hoàn hảo. Mùi hương này giúp họ thể hiện sự tự tin và đẳng cấp của mình một cách rõ nét.Sử dụng Baccarat Rouge 540 Extrait De Parfum sẽ giúp bạn xây dựng hình ảnh của một người quý phái, tự tin và đầy sức hút. Đây là mùi hương dành cho những ai muốn để lại ấn tượng mạnh mẽ và khó quên trong mắt người khác.',
                    longevity: 5,
                    sillage: 5,
                    likability: 4,
                },
            };
            const addProductResponse = await productAPI.createProduct(newProductData);
            console.log('New Product Data:', newProductData);
            console.log('addProductResponse: ', addProductResponse);

            // successfully added
            setShowNotification(true);
            setShowAnimation('animate__bounceInRight');
            setMessageType('success');
            setMessageTitle('Add New Product');
            setMessageContent('Add new prodcut successfully!');
            setTimeout(() => {
                // navigate('/admin/manage-products');
            }, 2800);
        } else {
            console.log('chay vo day ne');
            setShowNotification(true);
            setShowAnimation('animate__bounceInRight');
            setMessageType('warning');
            setMessageTitle('Add New Product');
            setMessageContent('Please fill product information!');
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

    const handleCloseNotification = () => {
        setShowAnimation('animate__fadeOut');
        setTimeout(() => {
            setShowNotification(false);
        }, 1000);
    };

    const handleCategorySelected = (e) => {
        setCategory(e.target.value);
    };

    return (
        <Box sx={{ p: 3, mx: 4, borderRadius: 2 }}>
            <AdminButtonBackPage title={'List Products'} />
            <Typography variant="h4" sx={{ mb: 3 }}>
                Add New Product
            </Typography>

            <Avatar
                alt="Product Image"
                src={image || 'https://via.placeholder.com/128'}
                sx={{ width: 128, height: 128, marginBottom: 2, borderRadius: 0 }}
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

            {/* select size */}
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
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="brand-select-label">Brand</InputLabel>
                    <Select
                        labelId="brand-select-label"
                        value={brand}
                        label="Brand"
                        onChange={(e) => setBrand(e.target.value)}
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
