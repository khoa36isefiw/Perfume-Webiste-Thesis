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
    const [productToRemove, setProductToRemove] = useState(null);
    const [openConfirmMessage, setOpenConfirmMessage] = React.useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [showAnimation, setShowAnimation] = useState('animate__bounceInRight');

    // disagree, not delete the products
    const handleConfirmDisagree = () => {
        setOpenConfirmMessage(false);
        setProductToRemove(null);
    };

    // agree, delete the products
    const handleConfirmAgree = () => {
        if (productToRemove) {
            dispatch(removeProduct(productToRemove)); // remove product
        }
        setShowNotification(true);
        setShowAnimation('animate__bounceInRight');
        setOpenConfirmMessage(false);
        setProductToRemove(null);
    };

    const dispatch = useDispatch();
    // open the confirm dialog message and save the products are removed
    const handleRemoveProductInCart = (productId) => {
        setOpenConfirmMessage(true);
        setProductToRemove(productId); // store product is removed
    };

    // handle Close notification
    const handleCloseNotification = () => {
        setShowAnimation('animate__fadeOut');
        setTimeout(() => {
            setShowNotification(false);
        }, 1000);
    };

    return (
        <>
            {/* First Product - In Stock */}
            <Box
                sx={{
                    border: '1px solid #333',
                    borderRadius: 1,
                    p: 1,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                                src={
                                    'https://res.cloudinary.com/dxulhqdp3/image/upload/v1724161758/perfumes/men/Allure_Homme_Sport_wtevx6.png'
                                }
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
                        {/* name */}
                        <Box sx={{ ml: 2 }}>
                            <CustomizeTypography
                                sx={{
                                    [mobileScreen]: {
                                        fontSize: '14px',
                                    },
                                }}
                            >
                                Allure Homme Sport Eau Extreme
                            </CustomizeTypography>
                            {/* price and stocks status */}
                            <CustomizeTypography
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    [mobileScreen]: {
                                        fontSize: '13.5px',
                                    },
                                }}
                            >
                                <span>3.780.000đ</span>
                                <Box
                                    sx={{ height: '20px', width: '1px', bgcolor: '#fff', mx: 2 }}
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
                                >
                                    -
                                </CustomizeTypography>
                                <CustomizeTypography
                                    sx={{
                                        fontSize: '16px',
                                        mb: 0,
                                    }}
                                >
                                    1
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
                                >
                                    +
                                </CustomizeTypography>
                            </Box>
                        </Box>
                    </Box>
                    {/* Total price, remove item */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <CustomizeTypography>3.298.000đ</CustomizeTypography>
                        <Button
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
                            }}
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>

                <Divider sx={{ bgcolor: '#333', my: 2 }} />
                {/* Second Product - Out of Stock with Discount */}
                <Box
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
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
                                loading="lazy"
                                src={
                                    'https://res.cloudinary.com/dxulhqdp3/image/upload/v1724161758/perfumes/women/Jadore_Dior_ytzdzk.png'
                                }
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
                        {/* name */}
                        <Box sx={{ ml: 2 }}>
                            <CustomizeTypography>J'adore Eau de Parfum</CustomizeTypography>
                            {/* price and stock status */}
                            <CustomizeTypography sx={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ textDecoration: 'line-through', color: '#ff7675' }}>
                                    4.200.000đ
                                </span>
                                <Box
                                    sx={{ height: '20px', width: '1px', bgcolor: '#fff', mx: 2 }}
                                />
                                <span style={{ fontWeight: 'bold' }}>3.780.000đ</span>
                            </CustomizeTypography>
                            <CustomizeTypography
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: theme.palette.text.secondary,
                                    fontWeight: 'bold',
                                }}
                            >
                                Out of Stock
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
                                    opacity: 0.5, // Make it look disabled
                                    pointerEvents: 'none', // Disable interaction
                                }}
                            >
                                <CustomizeTypography
                                    sx={{
                                        fontSize: '24px',
                                        p: '4px',
                                        mb: 0,
                                    }}
                                >
                                    -
                                </CustomizeTypography>
                                <CustomizeTypography
                                    sx={{
                                        fontSize: '16px',
                                        mb: 0,
                                    }}
                                >
                                    0
                                </CustomizeTypography>
                                <CustomizeTypography
                                    sx={{
                                        fontSize: '16px',
                                        mb: 0,
                                        p: '4px',
                                    }}
                                >
                                    +
                                </CustomizeTypography>
                            </Box>
                        </Box>
                    </Box>
                    {/* Total price, remove item */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <CustomizeTypography>3.780.000đ</CustomizeTypography>
                        <Button
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
                            }}
                        >
                            Delete
                        </Button>
                    </Box>
                    <ConfirmMessage />
                </Box>

                {/* render list product added  */}
                {productsList.map((item, index) => (
                    <Box key={item.perfumeID}>
                        <Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    bgcolor: 'green',
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
                                                    dispatch(decreaseQuantity(item.perfumeID))
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
                                                    dispatch(increaseQuantity(item.perfumeID))
                                                }
                                            >
                                                +
                                            </CustomizeTypography>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <CustomizeTypography sx={{ mb: 0 }}>
                                            {converToVND(item.quantity * item.perfumePrice)}
                                        </CustomizeTypography>
                                        <Button
                                            onClick={() =>
                                                handleRemoveProductInCart(item.perfumeID)
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
        </>
    );
};

const NewD = ({ productsList }) => {
    const dispatch = useDispatch();
    return (
        <>
            {productsList.map((item, index) => (
                <Box key={item.perfumeID}>
                    <Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                bgcolor: 'green',
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
                                                dispatch(decreaseQuantity(item.perfumeID))
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
                                                dispatch(increaseQuantity(item.perfumeID))
                                            }
                                        >
                                            +
                                        </CustomizeTypography>
                                    </Box>
                                </Box>
                                <Box>
                                    <CustomizeTypography sx={{ mb: 0 }}>
                                        {converToVND(item.quantity * item.perfumePrice)}
                                    </CustomizeTypography>
                                    <Button
                                        // onClick={() => handleRemoveProductInCart(item.perfumeID)}
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
        </>
    );
};
