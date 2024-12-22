import { Box, Button, Checkbox, Divider, Typography } from '@mui/material';
import React, { useState } from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { mobileScreen, theme } from '../../Theme/Theme';
import DeleteIcon from '@mui/icons-material/Delete';

import { converToVND } from '../convertToVND/convertToVND';
import ConfirmMessage from '../ConfirmMessage/ConfirmMessage';
import WarningIcon from '@mui/icons-material/Warning';

import { userAPI } from '../../api/userAPI';

import { red } from '@mui/material/colors';

import { useTranslation } from 'react-i18next';
import { useSnackbarMessage } from '../../hooks/useSnackbarMessage';

export const ProductInCart = ({
    productsList,
    selectedProducts,
    setSelectedProducts,
    setPriceChange,
    mutate,
}) => {
    // get userId from local storage
    const userId = JSON.parse(window.localStorage.getItem('user_data')).userId;
    const { t } = useTranslation('translate');

    const { showNotificationMessage } = useSnackbarMessage(); // multiple notification

    const [productToRemove, setProductToRemove] = useState(null);
    const [openConfirmMessage, setOpenConfirmMessage] = React.useState(false);
    // const [showNotification, setShowNotification] = useState(false);
    // const [showAnimation, setShowAnimation] = useState('animate__bounceInRight');
    const [pQuantity, setPQuantity] = useState(0);
    const [productToUpdate, setProductToUpdate] = useState(null);

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
            const dataToRemove = {
                // product, variant
                product: productToRemove.productId,
                variant: productToRemove.productSizeId,
            };

            const removeProduct = await userAPI.removeProductFromCart(userId, dataToRemove);

            if (removeProduct.status === 200) {
                // window.location.reload();
                showNotificationMessage(
                    'success',
                    `${t('common.notifyMessage.inCart.dPT')}`,
                    `${t('common.notifyMessage.inCart.dPC')}`,
                );
                setOpenConfirmMessage(false);
                setProductToRemove(null); // clear
                mutate();
            } else {
                console.log('we gotcha the problem tehee!');
            }
        }
    };

    // handle Close notification

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
    // filter list products by stock > 0.
    const getListProductIsStock = productsList.filter((product) => product.variant?.stock > 0);
    const handleSelectAll = (isChecked) => {
        if (isChecked) {
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
        const checkStockStatus = updatedProductsList.some(
            // find product is selected to update product quantity
            (product) =>
                product.product._id === pId &&
                product.variant._id === vId &&
                product.variant.stock - newQuantity >= 0, // check if the current quantity is greater than the number of products in stock
        );
        console.log('product is updated information status: ', checkStockStatus);
        console.log('productToUpdate: ', productToUpdate);
        // if (productToUpdate) {
        // update product quantity if the current product equals to or less than the product in stock
        if (productToUpdate && checkStockStatus) {
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
            }
        } else {
            showNotificationMessage(
                'error',
                `${t('common.notifyMessage.inCart.uPT')}`,
                `${t('common.notifyMessage.inCart.uPC')}`,
            );
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
                <CustomizeTypography sx={{ mb: 0 }}>
                    {t('common.shoppingCart.selectAll')}
                </CustomizeTypography>
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
                                            width: '100%',
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
                                                ? t('common.shoppingCart.outStock')
                                                : t('common.shoppingCart.inStock')}
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
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-end',
                                            justifyContent: 'center',
                                            [mobileScreen]: {
                                                alignItems: 'flex-start',
                                            },
                                        }}
                                    >
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
                                            {t('common.shoppingCart.delete')}
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
                    t={t}
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
                                {t('common.notifyMessage.inCart.dT')}
                            </CustomizeTypography>
                        </Box>
                    }
                    msgContent={
                        <Typography sx={{ fontSize: '16px' }}>
                            {t('common.notifyMessage.inCart.dC')}
                        </Typography>
                    }
                    onHandleClickClose={() => setOpenConfirmMessage(false)}
                    onHandleConfirmAgree={handleConfirmAgree}
                    onHandleConfirmDisagree={handleConfirmDisagree}
                />

                {/* Show Message after removing products */}
            </Box>
        </Box>
    );
};
