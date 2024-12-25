export default function ProductTable() {
    const navigate = useNavigate();
    const { showNotificationMessage } = useSnackbarMessage(); // multiple notification
    const { data: products, isLoading, mutate } = useProduct();
    const { open, animateStyle, handleClose, setAnimateStyle } = useLoading();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState(products?.data || []); // Dynamic user data
    const [searchTerm, setSearchTerm] = useState(''); // Search term state
    const [openConfirmMessage, setOpenConfirmMessage] = useState(false);

    const [productToRemove, setProductToRemove] = useState(null);

    // Flatten rows based on product sizes
    const flattenedRows =
        Array.isArray(rows) &&
        rows?.flatMap(
            (row) =>
                // row.variants.map((size) => ({
                row.category.status === 'active' &&
                row.brand.status === 'active' &&
                row.variants.map((size) => ({
                    productId: row._id,
                    productName: row.nameEn,
                    category: row.category?.nameEn,
                    brand: row.brand?.nameEn,
                    size: size.size,
                    price: size.price,
                    image: row?.imagePath[0],
                    stock: size.stock,
                    ratings: row.rating,
                    variants: [size],
                })),
        );

    console.log('flattenedRows: ', flattenedRows);

    // Filter flattened rows based on product name, and brand
    const filteredRows = flattenedRows.filter(
        (row) =>
            row?.productName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
            row?.brand?.toLowerCase().includes(searchTerm?.toLowerCase()),
    );

    return (
        <React.Fragment>
            {isLoading ? (
                <ModalDesginV2
                    open={open}
                    onHandleClose={handleClose}
                    animateStyle={animateStyle}
                    setAnimateStyle={setAnimateStyle}
                >
                    <Loading />
                </ModalDesginV2>
            ) : (
                <Box
                    sx={{
                        width: '100%',
                        overflow: 'hidden',
                        p: 2,
                        [mobileScreen]: {
                            p: 0,
                        },
                    }}
                >
                    {/* Search Bar */}
                    <Box
                        sx={{
                            [mobileScreen]: {
                                p: 2,
                            },
                        }}
                    >
                        <AdminHeadingTypography>List Products</AdminHeadingTypography>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Button
                                variant="text"
                                color="primary"
                                sx={{
                                    marginBottom: 2,
                                    padding: '10px 0',

                                    borderRadius: 3,
                                    textTransform: 'initial',
                                    fontSize: '14px',
                                }}
                                startIcon={<FileDownloadIcon />}
                                onClick={exportToExcel}
                            >
                                Export
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    marginBottom: 2,
                                    padding: '10px 18px',
                                    borderRadius: 2,
                                    bgcolor: theme.palette.admin.bgColor,
                                    textTransform: 'initial',
                                    fontSize: '14px',
                                    '&:hover': {
                                        bgcolor: theme.palette.admin.bgColor,
                                    },
                                }}
                                startIcon={<CategoryIcon />}
                                onClick={() => navigate('/admin/manage-products/add-product')}
                            >
                                Add Product
                            </Button>
                        </Box>
                        <AdminTypography sx={{ fontSize: '18px', mb: 2 }}>
                            We can <strong>Search product</strong> by Name or Brand
                        </AdminTypography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <TextField
                            placeholder="Search by Name"
                            variant="outlined"
                            fullWidth={true}
                            sx={{ marginBottom: 2 }}
                            onChange={handleSearch}
                            value={searchTerm}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    <Box sx={{ borderRadius: 1, bgcolor: '#fff', border: '1px solid #ccc' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                                sx={{ bgcolor: blue[200], fontSize: '13px' }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredRows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row.id}
                                            >
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            sx={{ fontSize: '13px' }}
                                                        >
                                                            {/* Render avatar if the column is 'avatar', otherwise display text */}
                                                            {column.id === 'image' ? (
                                                                <Avatar
                                                                    alt={row.name}
                                                                    src={row.image}
                                                                    sx={{
                                                                        height: '56px',
                                                                        width: '56px',
                                                                    }}
                                                                />
                                                            ) : column.id === 'actions' ? (
                                                                // Render Edit and Delete buttons in the 'actions' column
                                                                <>
                                                                    <Tooltip
                                                                        title={
                                                                            <CustomizeTypography
                                                                                sx={{
                                                                                    fontSize:
                                                                                        '13px',
                                                                                    mb: 0,
                                                                                }}
                                                                            >
                                                                                Edit Product
                                                                            </CustomizeTypography>
                                                                        }
                                                                    >
                                                                        <IconButton
                                                                            onClick={() =>
                                                                                handleEdit(
                                                                                    row.productId,
                                                                                    row.size,
                                                                                )
                                                                            }
                                                                            color="primary"
                                                                        >
                                                                            <EditIcon
                                                                                sx={{
                                                                                    fontSize:
                                                                                        '22px',
                                                                                }}
                                                                            />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    <Tooltip
                                                                        title={
                                                                            <CustomizeTypography
                                                                                sx={{
                                                                                    fontSize:
                                                                                        '13px',
                                                                                    mb: 0,
                                                                                }}
                                                                            >
                                                                                Delete Product
                                                                            </CustomizeTypography>
                                                                        }
                                                                    >
                                                                        <IconButton
                                                                            onClick={() =>
                                                                                handleDeleteProduct(
                                                                                    row.productId,
                                                                                    row.size,
                                                                                )
                                                                            }
                                                                            color="secondary"
                                                                        >
                                                                            <DeleteIcon
                                                                                sx={{
                                                                                    fontSize:
                                                                                        '22px',
                                                                                }}
                                                                            />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </>
                                                            ) : column.id === 'price' ? (
                                                                <Typography
                                                                    sx={{ fontSize: '13px' }}
                                                                >
                                                                    {converToVND(row.price)}
                                                                </Typography>
                                                            ) : column.format &&
                                                              typeof value === 'object' ? (
                                                                column.format(value)
                                                            ) : (
                                                                value
                                                            )}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={filteredRows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Box>
                </Box>
            )}
        </React.Fragment>
    );
}
