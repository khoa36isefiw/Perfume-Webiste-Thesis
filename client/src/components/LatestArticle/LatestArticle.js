import { Avatar, Box, Button, Container } from '@mui/material';
import React from 'react';
import CustomizeTitle from '../CustomizeTitle/CustomizeTitle';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { latestArticlesData } from './latestArticlesData';
import { theme } from '../../Theme/Theme';
import CustomizeButton from '../CustomizeButton/CustomizeButton';

function LatestArticle() {
    return (
        <Container>
            <CustomizeTitle heading={'Latest Articles'} />
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 4,
                    justifyContent: 'center', // Center items on smaller screens
                }}
            >
                {latestArticlesData.map((article, index) => (
                    <Box
                        key={index}
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
                            src={article.articleImage}
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
                                {article.articleTitle}
                            </CustomizeTypography>
                            <CustomizeTypography>{article.articleContent}</CustomizeTypography>
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
                                Read More
                            </Button>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Container>
    );
}

export default LatestArticle;
