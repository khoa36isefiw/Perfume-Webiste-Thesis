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
    Grid,
} from '@mui/material';
import AdminButtonBackPage from '../AdminButtonBackPage/AdminButtonBackPage';
import { theme } from '../../Theme/Theme';
import { AdminTypography } from '../CustomizeTypography/CustomizeTypography';
import { grey } from '@mui/material/colors';
import { formatDate, formatDDMM } from '../FormatDate/formatDate';

const AdminCreateCoupon = () => {
    // get the current date time follow yyyy-mm-dd format
    let currentDate = new Date().toLocaleString('en-CA').slice(0, 10);

    console.log('currentDate: ', currentDate);
    let date = new Date().toLocaleDateString('vi');
    console.log('date: ', date);

    const [image, setImage] = useState(null);
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState('');
    const [stock, setStock] = useState('');
    const [brand, setBrand] = useState('');
    const [ratings, setRatings] = useState('');
    const [description, setDescription] = useState('');
    const [discount, setDiscount] = useState('');

    // item for menu
    const statusOptions = ['Active', 'Expired'];

    // file input for image upload
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
        if (discount === 0) {
            return;
        }
        return price - price * (discount / 100);
    };

    const result = calculateDiscountPrice(price, discount);
    console.log('result: ', result);
    // Handle form submission
    const handleAddProduct = () => {
        const newProduct = {
            image,
            productName,
            price: +price, // convert string to number
            size,
            stock,
            brand,
            ratings: 0,
            discount: calculateDiscountPrice(price, discount),
            content: {
                description: description,
                notes: {
                    topNotes: ['Nghệ tây', 'Hạnh nhân đắng'],
                    heartNotes: ['Hoa nhài Ai Cập', 'Gỗ tuyết tùng'],
                    baseNotes: ['Hương gỗ', 'Hổ phách', 'Xạ hương'],
                },
                scentProfile: `Baccarat Rouge 540 Extrait De Parfum mở đầu với sự quyến rũ của nghệ tây và hạnh nhân đắng, tạo nên một sự khởi đầu ấm áp và phong phú. Hương giữa là sự kết hợp tinh tế giữa hoa nhài Ai Cập và gỗ tuyết tùng, mang lại sự thanh thoát và sang trọng. Cuối cùng, hương gỗ, hổ phách và xạ hương tạo nên tầng hương cuối ấm áp, sâu lắng và bền bỉ.`,
                impression: `Baccarat Rouge 540 Extrait De Parfum mang lại cảm giác sang trọng, quý phái và độc đáo. Hương thơm này rất phù hợp khi sử dụng trong những dịp đặc biệt, tiệc tối hoặc sự kiện đẳng cấp. Nó toát lên sự tự tin và cuốn hút, khiến người sử dụng trở thành tâm điểm chú ý.`,
                targetAudience: `Thuộc nhóm hương Oriental Floral, Baccarat Rouge 540 Extrait De Parfum phù hợp với những người có gu thẩm mỹ tinh tế, yêu thích sự độc đáo và khác biệt. Họ thường là những người có phong cách riêng biệt, không ngại nổi bật và luôn tìm kiếm sự hoàn hảo. Mùi hương này giúp họ thể hiện sự tự tin và đẳng cấp của mình một cách rõ nét.`,
                usage: `Sử dụng Baccarat Rouge 540 Extrait De Parfum sẽ giúp bạn xây dựng hình ảnh của một người quý phái, tự tin và đầy sức hút. Đây là mùi hương dành cho những ai muốn để lại ấn tượng mạnh mẽ và khó quên trong mắt người khác.`,
                ratings: {
                    longevity: 5,
                    sillage: 5,
                    likability: 4,
                },
                occasion: `Thích hợp cho những dịp đặc biệt, tiệc tối, sự kiện đẳng cấp và những buổi gặp gỡ quan trọng.`,
            },
        };

        console.log('New Product Data:', newProduct);
    };

    return (
        <Box
            sx={{
                p: 3,
                mx: 4,
                borderRadius: 2,
            }}
        >
            <AdminButtonBackPage title={'List Coupons'} />
            <Typography variant="h4" sx={{ mb: 3 }}>
                Create New Coupon
            </Typography>
            <Grid container spacing={4}>
                <Grid item lg={6}>
                    <AdminTypography>Coupon Name</AdminTypography>
                    <TextField
                        fullWidth
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                </Grid>
                <Grid item lg={6}>
                    <AdminTypography>Coupon Description</AdminTypography>
                    <TextField
                        fullWidth
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                </Grid>
                <Grid item lg={6}>
                    <AdminTypography>Coupon Discount</AdminTypography>
                    <TextField
                        fullWidth
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                </Grid>
                <Grid item lg={6}>
                    <AdminTypography>Coupon Quantity</AdminTypography>
                    <TextField
                        fullWidth
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                </Grid>

                <Grid item lg={6}>
                    {/* Brand Dropdown */}
                    <AdminTypography>Coupon Status</AdminTypography>
                    <FormControl fullWidth sx={{ mb: 2, height: 40 }}>
                        <Select
                            labelId="brand-select-label"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        >
                            {statusOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    <Box
                                        sx={{
                                            bgcolor: option === 'Active' ? '#bdf5d3' : grey[300],
                                            borderRadius: 2,
                                            boxShadow: 1,
                                            padding: '4px 0',
                                            width: 80,
                                        }}
                                    >
                                        <AdminTypography
                                            sx={{
                                                fontSize: '14px',
                                                color: option === 'Active' ? '#187d44' : grey[600],
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                            }}
                                        >
                                            {option}
                                        </AdminTypography>
                                    </Box>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item lg={6}>
                    {/* Stock */}
                    <AdminTypography>Discount</AdminTypography>

                    <TextField
                        label="Discount"
                        fullWidth
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                </Grid>
                <Grid item lg={6}>
                    <AdminTypography>Coupon Open</AdminTypography>
                    <TextField
                        id="date"
                        type="date"
                        defaultValue={currentDate}
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item lg={6}>
                    <AdminTypography>Coupon End</AdminTypography>
                    <TextField
                        id="date"
                        type="date"
                        defaultValue={currentDate}
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
            </Grid>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 4 }}>
                <AdminButtonDesign
                    title={'Add Product'}
                    bgcolor={theme.palette.admin.bgColor}
                    onHandleClick={handleAddProduct}
                    type={'contained'}
                    textColor={'white'}
                />

                <AdminButtonDesign
                    title={'Cancel'}
                    // bgcolor={theme.palette.admin.bgColor}
                    onHandleClick={handleAddProduct}
                    type={'outlined'}
                    textColor={theme.palette.admin.bgColor}
                    borderColor={theme.palette.admin.bgColor}
                />
            </Box>
        </Box>
    );
};

export default AdminCreateCoupon;

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
