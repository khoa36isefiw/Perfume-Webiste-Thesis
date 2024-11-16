import { Avatar, Box, Button, Container } from '@mui/material';
import React from 'react';
import CustomizeTitle from '../CustomizeTitle/CustomizeTitle';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { latestArticlesData } from './latestArticlesData';
import { theme } from '../../Theme/Theme';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function LatestArticle() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation('translate');
    const savedLanguage = window.localStorage.getItem('language');

    const handleNavigationProductDetail = (blog) => {
        navigate(`/${savedLanguage}/blog-detail/${blog.blogId}`, { state: { blog } });
        // back to top when navigate to another page
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };
    return (
        <Container>
            <CustomizeTitle heading={t('common.latestArticles.homeArticle')} />
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 4,
                    justifyContent: 'center', // Center items on smaller screens
                }}
            >
                {latestArticlesData.map((article) => (
                    <Box
                        key={article.blogId}
                        onClick={() => handleNavigationProductDetail(article)}
                        sx={{
                            background: theme.palette.bestSelling,
                            borderRadius: 2,
                            minHeight: '50px',

                            // display: 'flex',
                            // flexDirection: 'column',

                            mb: 3,
                            width: {
                                xs: '100%',
                                sm: '30%',
                                md: '30%',
                                lg: '30%',
                            },
                            '&:hover': {
                                cursor: 'pointer',
                                transform: 'translateY(-20px)',
                            },

                            transition: 'transform 0.3s ease',
                        }}
                    >
                        <Avatar
                            src={article.image}
                            alt={article.title}
                            sx={{
                                borderTopLeftRadius: '8px',
                                borderTopRightRadius: '8px',
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,

                                height: '300px',
                                width: '100%',
                                objectFit: 'cover',
                            }}
                        />
                        <Box
                            sx={{
                                p: 1,
                            }}
                        >
                            <CustomizeTypography
                                sx={{
                                    my: 2,
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                }}
                            >
                                {/* {article.articleTitle} */}
                                {t(`common.latestArticles.${article.articleKey}.title`)}
                            </CustomizeTypography>
                            <CustomizeTypography>
                                {' '}
                                {t(`common.latestArticles.${article.articleKey}.content`)}
                            </CustomizeTypography>
                            <Button
                                // onClick={onHandleClick}
                                variant="contained"
                                sx={{
                                    my: 2,
                                    py: 1,
                                    borderRadius: '12px',
                                    borderColor: '#fff',
                                    color: theme.palette.secondaryText,
                                    bgcolor: '#fff',
                                    padding: '6px 24px',
                                    fontSize: '13px',
                                    fontWeight: 'bold',
                                    textTransform: 'initial',
                                    '&:hover': {
                                        bgcolor: '#fff',
                                    },
                                }}
                            >
                                {t('common.latestArticles.readMore')}
                            </Button>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Container>
    );
}

export default LatestArticle;
