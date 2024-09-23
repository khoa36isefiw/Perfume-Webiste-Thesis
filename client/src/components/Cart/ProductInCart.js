import { Box, Button, Divider, Typography } from '@mui/material';
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

export const ProductInCart = ({ productsList }) => {
    const dispatch = useDispatch();
    const [productToRemove, setProductToRemove] = useState(null);
    const [openConfirmMessage, setOpenConfirmMessage] = React.useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [showAnimation, setShowAnimation] = useState('animate__bounceInRight');

    // disagree, not delete the products
    const handleConfirmDisagree = () => {
        setOpenConfirmMessage(false);
        setProductToRemove(null);
    };

    console.log('productToRemove: ', productToRemove);
    // agree, delete the products
    const handleConfirmAgree = () => {
        if (productToRemove) {
            dispatch(
                removeProduct({
                    productId: productToRemove.productId,
                    productSize: productToRemove.productSize,
                }),
            ); // remove product
        }
        setShowNotification(true);
        setShowAnimation('animate__bounceInRight');
        setOpenConfirmMessage(false);
        setProductToRemove(null);
    };

    // open the confirm dialog message and save the products are removed
    const handleRemoveProductInCart = (productId, productSize) => {
        setOpenConfirmMessage(true);
        setProductToRemove({ productId, productSize }); // store product is removed
    };

    // handle Close notification
    const handleCloseNotification = () => {
        setShowAnimation('animate__fadeOut');
        setTimeout(() => {
            setShowNotification(false);
        }, 1000);
    };

    console.log('Product in cart: ', productsList);

    return (
        <Box>
            {/* First Product - In Stock */}
            <Box
                sx={{
                    border: '1px solid #333',
                    borderRadius: 1,
                    p: 1,
                }}
            >
                {/* render list of the products added  */}
                {productsList.map((item, index) => (
                    <Box key={item.perfumeID}>
                        <Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                {/* product image */}
                                <Box
                                    sx={{
                                        bgcolor: '#333',
                                        height: '200px',
                                        width: '200px',
                                        borderRadius: '8px',
                                        [mobileScreen]: {
                                            height: '150px',
                                            width: '150px',
                                        },
                                    }}
                                >
                                    <Box
                                        loading="lazy"
                                        src={item.perfumeImage}
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
                                            {item.perfumeName}
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
                                            <span>
                                                {item.perfumePrice.toLocaleString('it-IT', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}
                                            </span>
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
                                                }}
                                            >
                                                In Stock
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
                                            {item.perfumeSize} ml
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
                                            <CustomizeTypography
                                                sx={{
                                                    fontSize: '24px',
                                                    p: '4px',
                                                    mb: 0,
                                                    '&:hover': {
                                                        color: theme.palette.text.secondary,
                                                    },
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() =>
                                                    dispatch(
                                                        decreaseQuantity({
                                                            productId: item.perfumeID,
                                                            productSize: item.perfumeSize,
                                                        }),
                                                    )
                                                }
                                            >
                                                -
                                            </CustomizeTypography>
                                            <CustomizeTypography
                                                sx={{
                                                    fontSize: '16px',
                                                    mb: 0,
                                                }}
                                            >
                                                {item.quantity}
                                            </CustomizeTypography>
                                            <CustomizeTypography
                                                sx={{
                                                    fontSize: '16px',
                                                    mb: 0,
                                                    p: '4px',
                                                    '&:hover': {
                                                        color: theme.palette.text.secondary,
                                                    },
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() =>
                                                    dispatch(
                                                        increaseQuantity({
                                                            productId: item.perfumeID,
                                                            productSize: item.perfumeSize,
                                                        }),
                                                    )
                                                }
                                            >
                                                +
                                            </CustomizeTypography>
                                        </Box>
                                    </Box>
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
                                            {converToVND(item.quantity * item.perfumePrice)}
                                        </CustomizeTypography>
                                        <Button
                                            onClick={() =>
                                                handleRemoveProductInCart(
                                                    item.perfumeID,
                                                    item.perfumeSize,
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
