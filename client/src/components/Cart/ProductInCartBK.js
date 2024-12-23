import { Box, Button, Checkbox, Divider, Typography } from '@mui/material';
import React, { useState } from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { mobileScreen, theme } from '../../Theme/Theme';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import {
    decreaseQuantity,
    increaseQuantity,
    removeProduct,
} from '../../redux/feature/CartManagement/CartManagementSlice';
import { converToVND } from '../convertToVND/convertToVND';
import ConfirmMessage from '../ConfirmMessage/ConfirmMessage';
import WarningIcon from '@mui/icons-material/Warning';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { userAPI } from '../../api/userAPI';

import Loading from '../Loading/Loading';
import { useLocation } from 'react-router-dom';
import { red } from '@mui/material/colors';

export const ProductInCart = ({
    productsList,
    selectedProducts,
    setSelectedProducts,
    setPriceChange,
    mutate,
}) => {
    // get userId from local storage
    const userId = JSON.parse(window.localStorage.getItem('user_data'))._id;
    const location = useLocation();

    const dispatch = useDispatch();
    const [productToRemove, setProductToRemove] = useState(null);
    const [openConfirmMessage, setOpenConfirmMessage] = React.useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [showAnimation, setShowAnimation] = useState('animate__bounceInRight');
    const [pQuantity, setPQuantity] = useState(0);
    const [productToUpdate, setProductToUpdate] = useState(null);
    const [isLoadingAPI, setIsLoadingAPI] = useState(false);

    // open the confirm dialog message and save the products are removed
    const handleRemoveProductInCart = (productId, productSizeId) => {
        // for showing confirm message dialog
        setOpenConfirmMessage(true);
        setProductToRemove({ productId, productSizeId }); // store product is removed
    };

    // disagree, not delete the products
    const handleConfirmDisagree = () => {
        // click disagree button actions
        setOpenConfirmMessage(false);
        setProductToRemove(null);
    };

    // agree, delete the products
    const handleConfirmAgree = async () => {
        // click agree button actions
        if (productToRemove) {
            setIsLoadingAPI(true);
            const dataToRemove = {
                // product, variant
                product: productToRemove.productId,
                variant: productToRemove.productSizeId,
            };

            const removeProduct = await userAPI.removeProductFromCart(userId, dataToRemove);

            if (removeProduct.status === 200) {
                setIsLoadingAPI(false);
                // window.location.reload();
                setShowNotification(true);
                setShowAnimation('animate__bounceInRight');
                setOpenConfirmMessage(false);
                setProductToRemove(null); // clear
                mutate();
            } else {
                console.log('we gotcha the problem tehee!');
            }
        }
    };

    // handle Close notification
    const handleCloseNotification = () => {
        setShowAnimation('animate__fadeOut');
        setTimeout(() => {
            setShowNotification(false);
        }, 1000);
    };

    const handleSelectProduct = (isChecked, product) => {
        const check = selectedProducts?.findIndex(
            (item) =>
                item.variant._id === product.variant._id &&
                item.product._id === product.product._id &&
                item.variant.stock > 0,
        );

        // if !== -1 --> exists --> checked --> remove from list
        if (!isChecked && check !== -1) {
            setSelectedProducts((prev) =>
                prev.filter(
                    (item) =>
                        item.product._id !== product.product._id ||
                        item.variant._id !== product.variant._id,
                ),
            );
        } else {
            // add to list if stock > 0
            if (product.variant.stock > 0) {
                setSelectedProducts((prev) => [...prev, { ...product }]);
            }
        }
    };
    console.log('list selected product: ', selectedProducts);
    const getListProductIsStock = productsList.filter((product) => product.variant.stock > 0);
    const handleSelectAll = (isChecked) => {
        // filter list products by stock > 0.
        // const getListProductIsStock = productsList.filter((product) => product.variant.stock > 0);
        //. console.log('getListProductIsStock: ', getListProductIsStock);
        if (isChecked) {
            // setSelectedProducts(productsList);
            setSelectedProducts(getListProductIsStock);
        } else {
            // Clear selectedProducts when unchecked
            setSelectedProducts([]);
        }
    };

    const handleUpdateQuantity = async (pId, vId, newQuantity) => {
        let total = 0;
        const updatedProductsList = [...productsList];
        const productToUpdate = updatedProductsList.find(
            // find product is selected to update product quantity
            (product) => product.product._id === pId && product.variant._id === vId,
        );
        const checkStockStatus = updatedProductsList.find(
            // find product is selected to update product quantity
            (product) => product.product._id === pId && product.variant._id === vId,
        );
        console.log('productToUpdate: ', productToUpdate);
        if (productToUpdate) {
            // update the quantity of the product
            productToUpdate.quantity = newQuantity;
            setPQuantity(newQuantity);
            setProductToUpdate(productToUpdate);
            // update the UI immediately (optimistic update)
            // mutate({ updatedProductsList }, true); // if change something, call api
            const updateData = {
                product: pId,
                variant: vId,
                quantity: newQuantity,
            };

            const response = await userAPI.updateProductQuantity(userId, updateData);
            if (response.status === 200) {
                setPriceChange(true);
                // if the API call succeeds, revalidate data to ensure consistency
                mutate(); // fetch fresh data from the server
                productsList.forEach((productItem) => {
                    const product = selectedProducts.find(
                        (p) =>
                            p.productId === productItem.product._id &&
                            p.variantId === productItem.variant._id,
                    );

                    if (product) {
                        const price = productItem.quantity * productItem.variant.price;
                        total += price;
                    }
                });
                window.localStorage.setItem('current_price', JSON.stringify(total));
            } else {
                throw new Error('Failed to update quantity');
            }
        } else {
            console.error('Product not found');
        }
    };

    // check if all items with stock > 0 are selected

    const isAllSelected =
        getListProductIsStock.length > 0 &&
        selectedProducts.length === getListProductIsStock.length;

    return (
        <Box>
            {/* loading api  */}
            {/* {isLoadingAPI && <Loading />} */}
            {/* First Product - In Stock */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    px: 1,
                }}
            >
                <Checkbox
                    sx={{
                        '& .MuiSvgIcon-root': { fontSize: 22 },
                        color: 'white',
                        '&.Mui-checked': {
                            color: theme.palette.background.thirth,
                        },
                    }}
                    checked={isAllSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                />
                <CustomizeTypography sx={{ mb: 0 }}>Select All</CustomizeTypography>
            </Box>
            <Box
                sx={{
                    border: '1px solid #333',
                    borderRadius: 1,
                    p: 1,
                }}
            >
                {/* render list of the products added  */}
                {productsList.map((item, index) => (
                    <Box key={index}>
                        <Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Checkbox
                                    checked={selectedProducts.some(
                                        (selectedItem) =>
                                            selectedItem?.product._id === item.product._id &&
                                            selectedItem?.variant._id === item.variant._id,
                                    )}
                                    onChange={(e) => handleSelectProduct(e.target.checked, item)}
                                    sx={{
                                        mr: 2,
                                        visibility:
                                            item?.variant?.stock <= 0 ? 'hidden' : 'visible',
                                        '& .MuiSvgIcon-root': { fontSize: 22 },
                                        color: 'white',
                                        '&.Mui-checked': {
                                            color: theme.palette.background.thirth,
                                        },
                                        mr: 0,
                                    }}
                                />

                                {/* product image */}
                                <Box
                                    sx={{
                                        bgcolor: '#333',
                                        height: '120px',
                                        width: '120px',
                                        borderRadius: '8px',
                                        [mobileScreen]: {
                                            height: '200px',
                                            width: '140px',
                                        },
                                    }}
                                >
                                    <Box
                                        src={item.product?.imagePath[0]}
                                        component="img"
                                        sx={{
                                            borderRadius: 1,
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            [mobileScreen]: {
                                                width: '140px',
                                            },
                                        }}
                                    />
                                </Box>

                                {/* product information */}
                                <Box
                                    sx={{
                                        ml: 2,
                                        display: 'flex',

                                        flex: 1,
                                        [mobileScreen]: {
                                            flexDirection: 'column',
                                        },
                                    }}
                                >
                                    {/* name */}
                                    <Box sx={{ flexGrow: 1 }}>
                                        <CustomizeTypography
                                            sx={{
                                                mb: 0,

                                                [mobileScreen]: {
                                                    fontSize: '13.5px',
                                                    mb: '4px',
                                                },
                                            }}
                                        >
                                            {item.product?.nameEn}
                                        </CustomizeTypography>
                                        {/* price and stocks status */}
                                        <CustomizeTypography
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                mb: 0,
                                                fontSize: 13,

                                                [mobileScreen]: {
                                                    fontSize: '13.5px',
                                                    mb: '4px',
                                                    flexDirection: 'column',
                                                    alignItems: 'start',
                                                },
                                            }}
                                        >
                                            <span
                                                style={{
                                                    textDecoration:
                                                        item.variant?.discountPercent !== 0
                                                            ? 'line-through'
                                                            : null,
                                                    color:
                                                        item.variant?.discountPercent !== 0
                                                            ? '#ccc'
                                                            : '#fff',
                                                }}
                                            >
                                                {converToVND(item.variant?.price)}
                                            </span>

                                            <Box
                                                sx={{
                                                    display:
                                                        item.variant?.discountPercent !== 0
                                                            ? 'block'
                                                            : 'none',
                                                    width: '5px',
                                                    height: '1px',
                                                    bgcolor: '#fff',
                                                    mx: '4px',
                                                    [mobileScreen]: {
                                                        display: 'none',
                                                    },
                                                }}
                                            />

                                            {item.variant?.discountPercent !== 0 && (
                                                <span style={{ color: red[600] }}>
                                                    {converToVND(item.variant?.priceSale)}
                                                </span>
                                            )}
                                        </CustomizeTypography>

                                        <span
                                            style={{
                                                color:
                                                    item?.variant?.stock <= 0
                                                        ? theme.palette.notification.errorIcon
                                                        : theme.palette.text.verified,
                                                fontWeight: 'bold',
                                                fontSize: '13px',
                                            }}
                                        >
                                            {/* In Stock */}
                                            {item?.variant?.stock === 0
                                                ? 'Out of Stock'
                                                : 'In Stock'}
                                        </span>
                                        <CustomizeTypography
                                            sx={{
                                                fontSize: 13,
                                                [mobileScreen]: {
                                                    fontSize: '13.5px',
                                                    mb: '4px',
                                                },
                                            }}
                                        >
                                            {item.variant.size}
                                        </CustomizeTypography>

                                        {/* increase quantity */}
                                        <Box
                                            sx={{
                                                height: '30px',
                                                width: '120px',
                                                borderRadius: '10px',
                                                border: '1px solid #d9d9d9',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                p: 2,
                                            }}
                                        >
                                            <Button
                                                disabled={item?.quantity === 1}
                                                sx={{
                                                    fontSize: '24px',
                                                    // p: '4px',
                                                    minWidth: 0,
                                                    color: theme.palette.text.secondary,
                                                    mb: 0,
                                                    '&:hover': {
                                                        color: theme.palette.text.secondary,
                                                    },
                                                    '&.Mui-disabled': {
                                                        color: '#d5d5d5',
                                                    },
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() =>
                                                    handleUpdateQuantity(
                                                        item?.product._id,
                                                        item?.variant?._id,
                                                        item?.quantity - 1,
                                                    )
                                                }
                                            >
                                                -
                                            </Button>

                                            {/* product quantity */}
                                            <CustomizeTypography
                                                sx={{
                                                    fontSize: '16px',
                                                    mb: 0,
                                                }}
                                            >
                                                {
                                                    // Check if the productId and variantId match the updated product,
                                                    // otherwise render the original quantity
                                                    productToUpdate &&
                                                    item?.product._id ===
                                                        productToUpdate.product._id &&
                                                    item?.variant._id ===
                                                        productToUpdate.variant._id
                                                        ? pQuantity
                                                        : item.quantity
                                                }
                                            </CustomizeTypography>

                                            {/* <CustomizeTypography
                                                sx={{
                                                    fontSize: '16px',
                                                    mb: 0,
                                                    p: '4px',

                                                    color: theme.palette.text.secondary,

                                                    cursor: 'pointer',
                                                }}
                                                onClick={() =>
                                                    handleUpdateQuantity(
                                                        item?.product._id,
                                                        item?.variant?._id,
                                                        item?.quantity + 1,
                                                    )
                                                }
                                            >
                                                +
                                            </CustomizeTypography> */}
                                            <Button
                                                disabled={item?.variant?.stock === 0}
                                                sx={{
                                                    fontSize: '18px',
                                                    // p: '4px',
                                                    minWidth: 0,
                                                    color: theme.palette.text.secondary,
                                                    cursor:
                                                        item?.variant.stock <= 0
                                                            ? 'not-allowed'
                                                            : 'pointer',
                                                    mb: 0,
                                                    '&:hover': {
                                                        color: theme.palette.text.secondary,
                                                    },
                                                    '&.Mui-disabled': {
                                                        color: '#d5d5d5',
                                                    },
                                                }}
                                                onClick={() =>
                                                    handleUpdateQuantity(
                                                        item?.product._id,
                                                        item?.variant?._id,
                                                        item?.quantity + 1,
                                                    )
                                                }
                                            >
                                                +
                                            </Button>
                                        </Box>
                                    </Box>
                                    {/* calculate total product */}
                                    <Box>
                                        {item.variant?.discountPercent !== 0 ? ( // calculate with discount
                                            <CustomizeTypography
                                                sx={{
                                                    mb: 0,
                                                    [mobileScreen]: {
                                                        mt: 1,
                                                        fontSize: '13.5px',
                                                    },
                                                }}
                                            >
                                                {converToVND(
                                                    item.quantity * item?.variant.priceSale,
                                                )}
                                            </CustomizeTypography>
                                        ) : (
                                            <CustomizeTypography
                                                sx={{
                                                    mb: 0,
                                                    [mobileScreen]: {
                                                        mt: 1,
                                                        fontSize: '13.5px',
                                                    },
                                                }}
                                            >
                                                {converToVND(item.quantity * item?.variant.price)}
                                            </CustomizeTypography>
                                        )}

                                        <Button
                                            onClick={() =>
                                                handleRemoveProductInCart(
                                                    item.product?._id,
                                                    item.variant?._id,
                                                )
                                            }
                                            startIcon={
                                                <DeleteIcon
                                                    sx={{
                                                        fontSize: '24px',
                                                        color: '#fff',
                                                    }}
                                                />
                                            }
                                            sx={{
                                                fontSize: '16px',
                                                textTransform: 'initial',
                                                color: '#fff',
                                                fontWeight: 'normal',
                                                transition:
                                                    'background-color 0.3s ease, color 0.3s ease, transform 0.3s ease',
                                                '&:hover': {
                                                    color: theme.palette.text.secondary,
                                                    fontWeight: 'bold',
                                                    // change color for icon
                                                    '& .MuiSvgIcon-root': {
                                                        color: theme.palette.text.secondary,
                                                    },
                                                },
                                                [mobileScreen]: {
                                                    fontSize: '13.5px',
                                                    padding: 0,
                                                },
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        {index !== productsList.length - 1 && (
                            <Divider sx={{ bgcolor: '#333', my: 2 }} />
                        )}
                    </Box>
                ))}

                {/* Open Confirm Message */}
                <ConfirmMessage
                    openConfirmMessage={openConfirmMessage}
                    msgTitle={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <WarningIcon
                                sx={{
                                    color: theme.icon.color.primary,
                                    fontSize: theme.icon.size.desktop,
                                }}
                            />
                            <CustomizeTypography
                                sx={{
                                    color: theme.palette.text.main,
                                    fontSize: '18px',
                                    mb: 0,
                                    ml: 2,
                                    fontWeight: 'bold',
                                }}
                            >
                                Delete Products
                            </CustomizeTypography>
                        </Box>
                    }
                    msgContent={
                        <Typography sx={{ fontSize: '16px' }}>
                            Are you sure you want to delete this product?
                        </Typography>
                    }
                    onHandleClickClose={() => setOpenConfirmMessage(false)}
                    onHandleConfirmAgree={handleConfirmAgree}
                    onHandleConfirmDisagree={handleConfirmDisagree}
                />

                {/* Show Message after removing products */}
                {showNotification && (
                    <Box
                        sx={{ position: 'fixed', top: '5%', right: '1%', zIndex: 9999999 }}
                        className={`animate__animated ${showAnimation}`}
                    >
                        <NotificationMessage
                            msgType={'success'}
                            msgTitle={'Delete Products'}
                            msgContent={'Products are removed successfully from cart!'}
                            autoHideDuration={3000} // Auto-hide after 5 seconds
                            onClose={handleCloseNotification}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
};
