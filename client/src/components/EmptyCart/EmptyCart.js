import { Avatar, Box } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import emptyImage4 from '../../assets/images/empty-cart-svg.svg';
import { mobileScreen, theme } from '../../Theme/Theme';
import CustomizeButton from '../CustomizeButton/CustomizeButton';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function EmptyCart({
    imgCart = emptyImage4,
    title,
    subTitle,
    isShowButton = true,
    width,
    height,
    spacing,
    imageSpacing,
    emptyCartHeight,
}) {
    const { t, i18n } = useTranslation('translate');
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
                    onHandleClick={() => navigate(`/${i18n.language}/shop`)}
                    textAction={t('common.shoppingCart.continue')}
                />
            )}
        </Box>
    );
}

export default EmptyCart;
