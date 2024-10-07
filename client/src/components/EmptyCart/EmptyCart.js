import { Avatar, Box } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import emptyImage4 from '../../assets/images/empty-cart-svg.svg';
import { mobileScreen, theme } from '../../Theme/Theme';
import CustomizeButton from '../CustomizeButton/CustomizeButton';
import { useNavigate } from 'react-router-dom';

// function EmptyCart() {
//     const navigate = useNavigate();
//     return (
//         <Box
//             sx={{
//                 minHeight: '500px',
//                 bgcolor: '#000',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 mt: 22,
//             }}
//         >
//             <Avatar
//                 src={emptyImage4}
//                 alt="Empty Cart Image"
//                 sx={{ width: '256px', height: '256px' }}
//             />
//             <CustomizeTypography
//                 sx={{ color: theme.palette.text.secondary, fontSize: '32px', fontWeight: 'bold' }}
//             >
//                 Your cart is empty
//             </CustomizeTypography>
//             <CustomizeTypography sx={{ fontSize: '24px', mb: 1 }}>
//                 Looks like you have not added anything to your cart.
//             </CustomizeTypography>
//             <CustomizeButton
//                 onHandleClick={() => navigate('/shop')}
//                 textAction={'Continue Shopping'}
//             />
//         </Box>
//     );
// }

// export default EmptyCart;

function EmptyCart({
    imgCart = emptyImage4,
    title = 'Your cart is empty',
    subTitle = 'Looks like you have not added anything to your cart.',
    isShowButton = true,
    width,
    height,
    spacing,
    imageSpacing,
    emptyCartHeight,
}) {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                minHeight: emptyCartHeight || '500px',
                bgcolor: '#000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: spacing || 22,
                [mobileScreen]: {
                    width: '100%',
                },
            }}
        >
            <Avatar
                src={imgCart}
                alt="Empty Cart Image"
                sx={{
                    width: width || '256px',
                    height: height || '256px',
                    borderRadius: 0,
                    objectFit: 'cover',
                    mt: imageSpacing,
                }}
            />
            <CustomizeTypography
                sx={{ color: theme.palette.text.secondary, fontSize: '32px', fontWeight: 'bold' }}
            >
                {/* Your cart is empty */}
                {title}
            </CustomizeTypography>
            <CustomizeTypography
                sx={{
                    fontSize: '24px',
                    mb: 1,
                    textAlign: 'center',
                    [mobileScreen]: {
                        fontSize: '18px',
                    },
                }}
            >
                {/* Looks like you have not added anything to your cart. */}
                {subTitle}
            </CustomizeTypography>
            {isShowButton && (
                <CustomizeButton
                    onHandleClick={() => navigate('/shop')}
                    textAction={'Continue Shopping'}
                />
            )}
        </Box>
    );
}

export default EmptyCart;
