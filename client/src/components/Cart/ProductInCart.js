import { Box, Button, Checkbox, Divider, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
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
import { mutate } from 'swr';
import Loading from '../Loading/Loading';
import { useLocation } from 'react-router-dom';
import EmptyCart from '../EmptyCart/EmptyCart';

export const ProductInCart = ({
    productsList,
    selectedProducts,
    setSelectedProducts,
    setPriceChange,
}) => {
    // get userId from local storage
    const userId = JSON.parse(window.localStorage.getItem('user_data')).userId;
    const location = useLocation();
    // useEffect(() => {
    //     if (productsList) {
    //         window.localStorage.setItem('productsList', JSON.stringify(productsList));
    //     }
    // }, [productsList]);
    // const getProductsListFromLocalStorage =
    //     JSON.parse(window.localStorage.getItem('productsList')) || [];

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
            const updatedProductsList = productsList.filter(
                (item) =>
                    item.product._id !== productToRemove.productId ||
                    item.variant._id !== productToRemove.productSizeId,
            );

            const removeProduct = await userAPI.removeProductFromCart(userId, dataToRemove);
            setShowNotification(true);
            setShowAnimation('animate__bounceInRight');
            setOpenConfirmMessage(false);

            if (removeProduct.status === 200) {
                window.localStorage.setItem('productsList', JSON.stringify(updatedProductsList));
                setIsLoadingAPI(false);
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
                item.product._id === product.product._id,
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
            // add to list want to buy
            setSelectedProducts((prev) => [...prev, { ...product }]);
        }
    };
    console.log('list selected product: ', selectedProducts);

    const handleSelectAll = (isChecked) => {
        if (isChecked) {
            setSelectedProducts(productsList);
        } else {
            // Clear selectedProducts when unchecked
            setSelectedProducts([]);
        }
    };

    const handleUpdateQuantity = async (pId, vId, newQuantity) => {
        console.log('pId and vid: ', pId, vId);
        let total = 0;
        const updatedProductsList = [...productsList];
        const productToUpdate = updatedProductsList.find(
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
            mutate({ updatedProductsList }, true); // if change something, call api
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

    const isAllSelected =
        productsList.length > 0 && selectedProducts.length === productsList.length;

    console.log('productsList: ', productsList);

    return (
        <Box>
            {/* loading api  */}
            {isLoadingAPI && <Loading />}

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
                                        '& .MuiSvgIcon-root': { fontSize: 22 },
                                        color: 'white',
                                        '&.Mui-checked': {
                                            color: theme.palette.background.thirth,
                                        },
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
                                            height: '150px',
                                            width: '150px',
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
                                                [mobileScreen]: {
                                                    fontSize: '13.5px',
                                                    mb: '4px',
                                                },
                                            }}
                                        >
                                            <span>{converToVND(item.variant?.price)}</span> -{' '}
                                            <Box
                                                sx={{
                                                    // height: '20px',
                                                    // width: '1px',
                                                    width: '10px',
                                                    height: '1px',
                                                    bgcolor: '#fff',
                                                    mx: 2,
                                                }}
                                            />
                                            <span
                                                style={{
                                                    color: theme.palette.text.verified,
                                                    fontWeight: 'bold',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                {/* In Stock */}
                                                {item?.variant?.stock === 0
                                                    ? 'Out of Stock'
                                                    : 'In Stock'}
                                            </span>
                                        </CustomizeTypography>
                                        <CustomizeTypography
                                            sx={{
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

                                            <Button
                                                disabled={item?.variant?.stock === 0}
                                                sx={{
                                                    fontSize: '24px',
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
                                            {/* 
                                            <CustomizeTypography
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
                                        </Box>
                                    </Box>
                                    {/* calculate total product */}
                                    <Box>
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
