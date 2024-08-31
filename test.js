function Cart() {
    const navigate = useNavigate();
    return (
        <Container>
            <Grid container spacing={4}>
                {/* Continue Shopping Button */}
                <Grid item xs={12}>
                    <Button
                        onClick={() => navigate('/shop')}
                        startIcon={<ArrowBackIcon sx={{ fontSize: '24px', color: '#fff' }} />}
                        sx={{
                            fontSize: '16px',
                            textTransform: 'none',
                            color: '#fff',
                            fontWeight: 400,
                            transition: 'transform 0.3s ease, color 0.3s ease',
                            '&:hover': {
                                transform: 'translateX(-10px)',
                                color: theme.palette.text.secondary,
                                fontWeight: 700,
                                '& .MuiSvgIcon-root': {
                                    color: theme.palette.text.secondary,
                                },
                            },
                        }}
                    >
                        Continue Shopping
                    </Button>
                </Grid>

                {/* Cart Title */}
                <Grid item xs={12}>
                    <CustomizeTypography variant="h3" sx={{ fontWeight: 700 }}>
                        Your Cart
                    </CustomizeTypography>
                    <Divider sx={{ bgcolor: '#fff', my: 2 }} />
                </Grid>

                {/* Cart Items and Summary */}
                <Grid container spacing={4}>
                    {/* Cart Items */}
                    <Grid item xs={12} lg={8}>
                        <ProductInCart />
                    </Grid>

                    {/* Summary */}
                    <Grid item xs={12} lg={4}>
                        <Box sx={{ border: '1px solid #333', borderRadius: 1, p: 2 }}>
                            <Box sx={{ display: 'flex', mb: 2 }}>
                                <TextFieldCustomize
                                    // variant="outlined"
                                    placeholder="Promo code"
                                    fullWidth
                                    sx={{ mr: 2 }}
                                />
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: theme.palette.secondary.main,
                                        fontSize: '14px',
                                        textTransform: 'none',
                                        '&:hover': {
                                            bgcolor: theme.palette.secondary.dark,
                                        },
                                    }}
                                >
                                    Apply
                                </Button>
                            </Box>
                            <CustomizeTypography sx={{ mb: 2 }}>
                                Apply a promo code for 20% off!
                            </CustomizeTypography>
                            <Divider sx={{ mb: 2 }} />
                            <SummaryRow label="Subtotal" value="$69.69" />
                            <SummaryRow label="Discount" value="(20%) - $13.94" />
                            <SummaryRow label="Delivery" value="$0.00" />
                            <SummaryRow label="Tax" value="+ $6.69" />
                            <Divider sx={{ mb: 2 }} />
                            <SummaryRow label="Total" value="$62.44" isTotal />
                            <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                                Proceed to Checkout
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

// Component to display each row in the summary
function SummaryRow({ label, value, isTotal }) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2,
                fontWeight: isTotal ? 'bold' : 'normal',
                fontSize: isTotal ? '18px' : '16px',
            }}
        >
            <CustomizeTypography>{label}</CustomizeTypography>
            <CustomizeTypography>{value}</CustomizeTypography>
        </Box>
    );
}

// Product in Cart Component
function ProductInCart() {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                    sx={{
                        bgcolor: '#333',
                        height: '200px',
                        width: '200px',
                        borderRadius: '8px',
                    }}
                >
                    <Box
                        component="img"
                        src={
                            'https://res.cloudinary.com/dxulhqdp3/image/upload/v1724161758/perfumes/men/Allure_Homme_Sport_wtevx6.png'
                        }
                        sx={{
                            borderRadius: 1,
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    />
                </Box>
                <Box sx={{ ml: 2 }}>
                    <CustomizeTypography variant="h6">
                        Allure Homme Sport Eau Extreme
                    </CustomizeTypography>
                    <CustomizeTypography sx={{ display: 'flex', alignItems: 'center' }}>
                        <span>3.780.000đ</span>
                        <Box sx={{ height: '20px', width: '1px', bgcolor: '#fff', mx: 2 }} />
                        <span style={{ color: theme.palette.success.main, fontWeight: 700 }}>
                            In Stock
                        </span>
                    </CustomizeTypography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mt: 1,
                            border: '1px solid #d9d9d9',
                            borderRadius: '10px',
                            px: 2,
                            py: 1,
                        }}
                    >
                        <IconButton size="small" sx={{ p: '4px' }}>
                            {/* <RemoveIcon /> */}-
                        </IconButton>
                        <CustomizeTypography sx={{ mx: 2 }}>1</CustomizeTypography>
                        <IconButton size="small" sx={{ p: '4px' }}>
                            {/* <AddIco /> */}+
                        </IconButton>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CustomizeTypography>3.298.000đ</CustomizeTypography>
                <Button
                    startIcon={<DeleteIcon sx={{ fontSize: '24px', color: '#fff' }} />}
                    sx={{
                        fontSize: '16px',
                        textTransform: 'none',
                        color: '#fff',
                        fontWeight: 400,
                        '&:hover': {
                            color: theme.palette.error.main,
                            fontWeight: 700,
                            '& .MuiSvgIcon-root': {
                                color: theme.palette.error.main,
                            },
                        },
                    }}
                >
                    Delete
                </Button>
            </Box>
        </Box>
    );
}

export default Cart;
