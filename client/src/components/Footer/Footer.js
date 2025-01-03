import { Avatar, Box, Button, Container, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';

import {
    customersFooterData,
    footerSocialData,
    pagesFooterData,
    shoppingFooterData,
} from './footerData';
import Copyrights from '../Copyrights/Copyrights';
import { TextFieldCustomizeV2 } from '../TextFieldCustomize/TextFieldCustomize';
import { mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import { useNavigate } from 'react-router-dom';
import { backTop } from '../goBackTop/goBackTop';
import { useTranslation } from 'react-i18next';
import { userAPI } from '../../api/userAPI';

import { useSnackbarMessage } from '../../hooks/useSnackbarMessage';

import { SupportAgent } from '@mui/icons-material';

function Footer() {
    const [email, setEmail] = React.useState('');
    const navigate = useNavigate();
    const { t, i18n } = useTranslation('translate');
    const { showNotificationMessage } = useSnackbarMessage(); // multiple notification

    const handleNavigate = (dest) => {
        navigate(`/${i18n.language}${dest}`);
        backTop();
    };
    const validateEmail = (email) => {
        // check email type
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const language = window.localStorage.getItem('language') || 'en';
    useEffect(() => {
        // prevent change to default language
        i18n.changeLanguage(language); // Set the language for i18n
    }, [i18n, language]);

    const handleSubcribe = async () => {
        const response = await userAPI.subscribe({ email });
        if (email === '') {
            showNotificationMessage(
                'warning',
                `${t('common.notifyMessage.sub.title')}`,
                `${t('common.notifyMessage.sub.require')}`,
            );
        } else {
            if (!validateEmail(email)) {
                showNotificationMessage(
                    'warning',
                    `${t('common.notifyMessage.sub.title')}`,
                    `${t('common.notifyMessage.sub.notMail')}`,
                );
            } else {
                if (response.status === 200) {
                    showNotificationMessage(
                        'warning',
                        `${t('common.notifyMessage.sub.title')}`,
                        `${t('common.notifyMessage.sub.success')}`,
                    );
                } else {
                    showNotificationMessage(
                        'warning',
                        `${t('common.notifyMessage.sub.title')}`,
                        `${t('common.notifyMessage.sub.existed')}`,
                    );
                }
            }
        }
    };

    return (
        <Box
            sx={{
                position: 'relative',
                top: '100%',
                bottom: '0',
                bgcolor: 'black',
                minHeight: '100px',
            }}
        >
            <Container
                sx={{
                    p: 4,
                    mb: 1,
                    [mobileScreen]: {
                        p: 1,
                    },
                }}
            >
                <Grid container>
                    {/* subscribe */}
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <CustomizeTypography
                            sx={{
                                background: `linear-gradient(120deg, ${theme.palette.text.main}, ${theme.palette.text.secondary})`,
                                // chỉ hiển thị màu nền ở phần text
                                WebkitBackgroundClip: 'text',
                                // ẩn màu văn bản mặc định
                                WebkitTextFillColor: 'transparent',
                                fontSize: '28px',
                                fontWeight: 'bold',
                                color: theme.palette.secondaryText,
                            }}
                        >
                            Tomtoc Perfumes
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ fontSize: '18px', fontWeight: '600' }}>
                            {t('common.subscribe.title')}:
                        </CustomizeTypography>
                        <Box
                            sx={{
                                width: '250px',
                                [tabletScreen]: {
                                    width: '100%',
                                },
                                [mobileScreen]: {
                                    width: '100%',
                                },
                            }}
                        >
                            <CustomizeTypography>
                                {t('common.subscribe.content')}
                            </CustomizeTypography>
                        </Box>
                        <Box
                            sx={{
                                py: 1,
                                [mobileScreen]: {
                                    display: 'flex',
                                },
                            }}
                        >
                            <TextFieldCustomizeV2
                                // default
                                placeholder={t('common.subscribe.textField')}
                                sx={{
                                    [tabletScreen]: { width: '360px' },
                                    [mobileScreen]: { width: '85%' },
                                }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                // fullWidth
                            />
                            <Button
                                variant="contained"
                                sx={{
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                    py: 1,
                                    bgcolor: theme.palette.secondaryText,
                                    fontSize: '14px',
                                    textTransform: 'initial',
                                    '&:hover': {
                                        bgcolor: theme.palette.secondaryText,
                                    },
                                    [mobileScreen]: {
                                        fontSize: '13px',
                                        py: 0,
                                        padding: '0px',
                                    },
                                }}
                                onClick={handleSubcribe}
                            >
                                {t('common.subscribe.btn')}
                            </Button>
                        </Box>
                        {/* Load social  */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                py: 1,
                            }}
                        >
                            {footerSocialData.map((social, index) => (
                                <Avatar
                                    key={index}
                                    src={social.footerImage}
                                    alt="Social Image"
                                    sx={{ height: '24px', width: '24px', mr: 2 }}
                                />
                            ))}
                        </Box>
                    </Grid>

                    {/* filter  */}
                    <Grid
                        container
                        item
                        sm={12}
                        md={8}
                        lg={8}
                        sx={{
                            [tabletScreen]: {
                                mt: 2,
                            },
                            [mobileScreen]: {
                                mt: 2,
                            },
                        }}
                    >
                        <Grid item xs={6} sm={4} md={4} lg={4}>
                            <CustomizeTypography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                                {t(`common.Shopping`)}
                            </CustomizeTypography>
                            {shoppingFooterData.map((shopping, index) => (
                                <CustomizeTypography key={index} sx={{ color: 'white' }}>
                                    {t(`common.${shopping}`)}
                                </CustomizeTypography>
                            ))}
                        </Grid>

                        <Grid item xs={6} sm={4} md={4} lg={4}>
                            <CustomizeTypography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                                {t(`common.Customer care`)}
                            </CustomizeTypography>
                            {customersFooterData.map((customer, index) => (
                                <CustomizeTypography key={index} sx={{ color: 'white' }}>
                                    {/* {customer} */}
                                    {t(`common.${customer}`)}
                                </CustomizeTypography>
                            ))}
                        </Grid>
                        <Grid item xs={6} sm={4} md={4} lg={4}>
                            <CustomizeTypography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                                {t(`common.Pages`)}
                            </CustomizeTypography>
                            {pagesFooterData.map((page, index) => (
                                <CustomizeTypography
                                    key={index}
                                    sx={{
                                        color: 'white',
                                        '&:hover': {
                                            cursor: 'pointer',
                                            textDecoration: 'underline',
                                        },
                                    }}
                                    onClick={() => handleNavigate(page.address)}
                                >
                                    {/* {page.text} */}
                                    {t(`common.${page.text}`)}
                                </CustomizeTypography>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        [mobileScreen]: {
                            flexDirection: 'column',
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: theme.palette.secondaryText,
                                textAlign: 'center',
                                mr: 2,
                                [mobileScreen]: {
                                    fontSize: theme.fontSize.mobile.heading,
                                    textAlign: 'center',
                                },
                            }}
                        >
                            Hotline
                        </Typography>

                        <SupportAgent
                            sx={{ fontSize: '28px', color: theme.palette.secondaryText }}
                        />
                    </Box>
                    <CustomizeTypography sx={{ mb: 0, textAlign: 'center', fontSize: '18px' }}>
                        <span style={{ marginLeft: '18px' }}>08 372-227-64 | 0938-775-001</span>
                    </CustomizeTypography>
                </Box>
            </Container>
            <Copyrights />
        </Box>
    );
}

export default Footer;
