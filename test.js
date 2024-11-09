const AdminAddProduct = () => {
    const [image, setImage] = useState(null);
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');

    const [stock, setStock] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');

    const [priceSale, setPriceSale] = useState('');
    const [sizes, setSizes] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);

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

    const handleAddProduct = async () => {
        console.log('category: ', category);
        const getCategoryById = await categoriesAPI.getCategoryById(category);
        const getBrandById = await brandApi.getBrandById(brand);

        console.log('getCategoryById: ', getCategoryById);
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
        const newSize = e.target.value;
        // Kiểm tra nếu size chưa tồn tại trong danh sách selectedSizes thì thêm mới
        if (!selectedSizes.find((size) => size.size === newSize)) {
            setSelectedSizes((prevSizes) => [
                ...prevSizes,
                { size: newSize, price: '', priceSale: '', stock: '' },
            ]);
        }
    };

    const handleSizeFieldChange = (index, field) => (e) => {
        const newValue = e.target.value;
        setSelectedSizes((prevSizes) => {
            const updatedSizes = [...prevSizes];
            updatedSizes[index] = { ...updatedSizes[index], [field]: newValue };
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
                        value={selectedSizes.map((size) => size.size)}
                        label="Size"
                        onChange={handleSizeChange}
                    >
                        {sizeOptions.map((size) => (
                            <MenuItem key={size} value={size}>
                                {size}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {selectedSizes.map((size, index) => (
                <Box key={size.size} sx={{ mb: 3 }}>
                    <Typography variant="body1" sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                        Size Selected: {size.size}
                    </Typography>
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
        </Box>
    );
};
