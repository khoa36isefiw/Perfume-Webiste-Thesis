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
    Chip,
    Checkbox,
    ListItemText,
} from '@mui/material';
import AdminButtonBackPage from '../AdminButtonBackPage/AdminButtonBackPage';
import { theme } from '../../Theme/Theme';

// const AdminAddProduct = () => {
//     const [image, setImage] = useState(null);
//     const [productName, setProductName] = useState('');
//     const [price, setPrice] = useState('');
//     // multiple size
//     const [size, setSize] = useState([]);
//     const [stock, setStock] = useState('');
//     const [brand, setBrand] = useState('');
//     const [ratings, setRatings] = useState('');
//     const [description, setDescription] = useState('');
//     const [discount, setDiscount] = useState('');

//     // item for menu
//     const sizeOptions = ['9ml', '25ml', '27ml', '50ml', '65ml', '100ml'];
//     const brandOptions = ['Dior', 'Chanel', 'Gucci'];

//     // file input for image upload
//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setImage(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const calculateDiscountPrice = (price, discount) => {
//         if (discount === 0) {
//             return;
//         }
//         return price - price * (discount / 100);
//     };

//     // Handle size selection
//     const handleSizeChange = (event) => {
//         const selectedSize = event.target.value;
//         if (!size.includes(selectedSize)) {
//             setSize((prevSizes) => [...prevSizes, selectedSize]);
//         }
//     };

//     // Handle removing selected size
//     const handleRemoveSize = (sizeToRemove) => {
//         setSize((prevSizes) => prevSizes.filter((s) => s !== sizeToRemove));
//     };

//     const result = calculateDiscountPrice(price, discount);
//     console.log('result: ', result);
//     // Handle form submission
//     const handleAddProduct = () => {
//         const newProduct = {
//             image,
//             productName,
//             price: +price, // convert string to number
//             size,
//             stock,
//             brand,
//             ratings: 0,
//             discount: calculateDiscountPrice(price, discount),
//             content: {
//                 description: description,
//                 notes: {
//                     topNotes: ['Nghệ tây', 'Hạnh nhân đắng'],
//                     heartNotes: ['Hoa nhài Ai Cập', 'Gỗ tuyết tùng'],
//                     baseNotes: ['Hương gỗ', 'Hổ phách', 'Xạ hương'],
//                 },
//                 scentProfile: `Baccarat Rouge 540 Extrait De Parfum mở đầu với sự quyến rũ của nghệ tây và hạnh nhân đắng, tạo nên một sự khởi đầu ấm áp và phong phú. Hương giữa là sự kết hợp tinh tế giữa hoa nhài Ai Cập và gỗ tuyết tùng, mang lại sự thanh thoát và sang trọng. Cuối cùng, hương gỗ, hổ phách và xạ hương tạo nên tầng hương cuối ấm áp, sâu lắng và bền bỉ.`,
//                 impression: `Baccarat Rouge 540 Extrait De Parfum mang lại cảm giác sang trọng, quý phái và độc đáo. Hương thơm này rất phù hợp khi sử dụng trong những dịp đặc biệt, tiệc tối hoặc sự kiện đẳng cấp. Nó toát lên sự tự tin và cuốn hút, khiến người sử dụng trở thành tâm điểm chú ý.`,
//                 targetAudience: `Thuộc nhóm hương Oriental Floral, Baccarat Rouge 540 Extrait De Parfum phù hợp với những người có gu thẩm mỹ tinh tế, yêu thích sự độc đáo và khác biệt. Họ thường là những người có phong cách riêng biệt, không ngại nổi bật và luôn tìm kiếm sự hoàn hảo. Mùi hương này giúp họ thể hiện sự tự tin và đẳng cấp của mình một cách rõ nét.`,
//                 usage: `Sử dụng Baccarat Rouge 540 Extrait De Parfum sẽ giúp bạn xây dựng hình ảnh của một người quý phái, tự tin và đầy sức hút. Đây là mùi hương dành cho những ai muốn để lại ấn tượng mạnh mẽ và khó quên trong mắt người khác.`,
//                 ratings: {
//                     longevity: 5,
//                     sillage: 5,
//                     likability: 4,
//                 },
//                 occasion: `Thích hợp cho những dịp đặc biệt, tiệc tối, sự kiện đẳng cấp và những buổi gặp gỡ quan trọng.`,
//             },
//         };

//         console.log('New Product Data:', newProduct);
//     };

//     return (
//         <Box
//             sx={{
//                 p: 3,
//                 mx: 4,
//                 borderRadius: 2,
//             }}
//         >
//             <AdminButtonBackPage title={'List Products'} />
//             <Typography variant="h4" sx={{ mb: 3 }}>
//                 Add New Product
//             </Typography>

//             {/* Product Image Upload */}
//             <Avatar
//                 alt="Product Image"
//                 src={image || 'https://via.placeholder.com/256'} // Default placeholder if no image
//                 sx={{ width: 256, height: 256, marginBottom: 2, borderRadius: 0 }}
//             />
//             <Button
//                 variant="outlined"
//                 component="label"
//                 sx={{
//                     marginBottom: 2,
//                     textTransform: 'initial',
//                     padding: '10px 18px',
//                     fontSize: '13px',
//                 }}
//             >
//                 Upload Image
//                 <input type="file" accept="image/*" hidden onChange={handleImageChange} />
//             </Button>
//             <Box sx={{ display: 'flex', gap: 4 }}>
//                 {/* Product Name */}
//                 <TextField
//                     label="Product Name"
//                     fullWidth
//                     value={productName}
//                     onChange={(e) => setProductName(e.target.value)}
//                     sx={{ mb: 2 }}
//                 />

//                 {/* Size Dropdown */}
//                 <FormControl fullWidth sx={{ mb: 2 }}>
//                     <InputLabel id="size-select-label">Size</InputLabel>
//                     <Select
//                         labelId="size-select-label"
//                         value={size}
//                         label="Size"
//                         // get value is selected
//                         onChange={handleSizeChange}
//                     >
//                         {sizeOptions.map((option) => (
//                             <MenuItem key={option} value={option}>
//                                 {option}
//                             </MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>
//             </Box>

//             <Box sx={{ display: 'flex', gap: 4 }}>
//                 {/* Price */}
//                 <TextField
//                     label="Price"
//                     fullWidth
//                     type="number"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                     sx={{ mb: 2 }}
//                 />

//                 {/* Stock */}
//                 <TextField
//                     label="Stock"
//                     fullWidth
//                     type="number"
//                     value={stock}
//                     onChange={(e) => setStock(e.target.value)}
//                     sx={{ mb: 2 }}
//                 />
//             </Box>

//             <Box sx={{ display: 'flex', gap: 4 }}>
//                 {/* Brand Dropdown */}
//                 <FormControl fullWidth sx={{ mb: 2 }}>
//                     <InputLabel id="brand-select-label">Brand</InputLabel>
//                     <Select
//                         labelId="brand-select-label"
//                         value={brand}
//                         label="Brand"
//                         onChange={(e) => setBrand(e.target.value)}
//                     >
//                         {brandOptions.map((option) => (
//                             <MenuItem key={option} value={option}>
//                                 {option}
//                             </MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>
//                 {/* Stock */}
//                 <TextField
//                     label="Discount"
//                     fullWidth
//                     type="number"
//                     value={discount}
//                     onChange={(e) => setDiscount(e.target.value)}
//                     sx={{ mb: 2 }}
//                 />
//             </Box>

//             <TextField
//                 label="Description"
//                 fullWidth
//                 multiline
//                 rows={4} // Number of rows for the textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 sx={{ mb: 2 }}
//             />

//             {/* Action Buttons */}
//             <Box sx={{ display: 'flex', gap: 4 }}>
//                 <AdminButtonDesign
//                     title={'Add Product'}
//                     bgcolor={theme.palette.admin.bgColor}
//                     onHandleClick={handleAddProduct}
//                     type={'contained'}
//                     textColor={'white'}
//                 />

//                 <AdminButtonDesign
//                     title={'Cancel'}
//                     // bgcolor={theme.palette.admin.bgColor}
//                     onHandleClick={handleAddProduct}
//                     type={'outlined'}
//                     textColor={theme.palette.admin.bgColor}
//                     borderColor={theme.palette.admin.bgColor}
//                 />
//             </Box>
//         </Box>
//     );
// };

// export default AdminAddProduct;

const AdminAddProduct = () => {
    const [image, setImage] = useState(null);
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [selectedSizes, setSelectedSizes] = useState([]); // Multiple sizes
    const [stock, setStock] = useState('');
    const [brand, setBrand] = useState('');
    const [ratings, setRatings] = useState('');
    const [description, setDescription] = useState('');
    const [discount, setDiscount] = useState('');

    const sizeOptions = ['9ml', '25ml', '27ml', '50ml', '65ml', '100ml'];
    const brandOptions = ['Dior', 'Chanel', 'Gucci'];

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

    const result = calculateDiscountPrice(price, discount);
    console.log('result: ', result);

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
    };

    const handleSizeChange = (event) => {
        // const value = event.target.value;
        const {
            target: { value },
        } = event; // don't loop many times with destructering
        setSelectedSizes(typeof value === 'string' ? value.split(',') : value);
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

                {/* Size Multiple Select */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="size-select-label">Size</InputLabel>
                    <Select
                        labelId="size-select-label"
                        multiple
                        value={selectedSizes}
                        onChange={handleSizeChange}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {sizeOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {/* option stands for: 9ml, 25ml */}
                                <Checkbox
                                    // check index of options exists in selectedSizes?
                                    checked={selectedSizes.indexOf(option) > -1}
                                    onChange={handleSizeChange}
                                />
                                <ListItemText primary={option} />
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
                        {brandOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Discount"
                    fullWidth
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    sx={{ mb: 2 }}
                />
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
                    title={'Add Product'}
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
