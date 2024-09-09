import { Box, Button, Divider } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import {
    decreaseQuantity,
    increaseQuantity,
    removeProduct,
} from '../../redux/feature/CartManagement/CartManagementSlice';
import { converToVND } from '../convertToVND/convertToVND';

export const ProductInCart = ({ productsList }) => {
    console.log('Product just added: ', productsList);
    const dispatch = useDispatch();
    const handleRemoveProductInCart = (productId) => {
        dispatch(removeProduct(productId));
    };
    const handleIncreaseProduct = (productId) => {
        dispatch(increaseQuantity(productId));
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
                            <CustomizeTypography>
                                Allure Homme Sport Eau Extreme
                            </CustomizeTypography>
                            {/* price and stocks status */}
                            <CustomizeTypography sx={{ display: 'flex', alignItems: 'center' }}>
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
                </Box>

                {/* render list product added  */}
                {productsList.map((item, index) => (
                    <Box key={item.perfumeID}>
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
                                {/* name */}
                                <Box sx={{ ml: 2 }}>
                                    <CustomizeTypography>{item.perfumeName}</CustomizeTypography>
                                    {/* price and stocks status */}
                                    <CustomizeTypography
                                        sx={{ display: 'flex', alignItems: 'center' }}
                                    >
                                        <span>
                                            {item.perfumePrice.toLocaleString('it-IT', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </span>
                                        <Box
                                            sx={{
                                                height: '20px',
                                                width: '1px',
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
                                <CustomizeTypography>
                                    {converToVND(item.quantity * item.perfumePrice)}
                                </CustomizeTypography>
                                <Button
                                    onClick={() => handleRemoveProductInCart(item.perfumeID)}
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

                        {index !== productsList.length - 1 && (
                            <Divider sx={{ bgcolor: '#333', my: 2 }} />
                        )}
                    </Box>
                ))}
            </Box>
        </>
    );
};
