import React from 'react';
import { Avatar, Box, Container, Grid } from '@mui/material';

import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../Theme/Theme';
import { useTranslation } from 'react-i18next';

const blogsData = [
    {
        blogId: 1,
        blogImage:
            'https://cdn.experimentalperfumeclub.com/wp-content/uploads/2023/12/Untitled-design-39.png',
        blogTitle: 'Why doesn’t my perfume last long enough?',
        blogKey: 'blogKey1',
    },
    {
        blogId: 2,
        blogImage:
            'https://cdn.experimentalperfumeclub.com/wp-content/uploads/2023/11/drink-3025022_1920.jpg',
        blogTitle: 'How to Choose your Perfume Palettes for the Changing Seasons',
        blogKey: 'blogKey2',
    },
    {
        blogId: 3,
        blogImage:
            'https://cdn.experimentalperfumeclub.com/wp-content/uploads/2023/11/1Y7A1148.jpg',
        blogTitle: 'How to Make Your Bespoke Perfume',
        blogKey: 'blogKey3',
    },
    {
        blogId: 4,
        blogImage:
            'https://cdn.experimentalperfumeclub.com/wp-content/uploads/2020/11/braydon-anderson-wOHH-NUTvVc-unsplash-web-res.jpg',
        blogTitle: 'How To Choose A Perfume For Someone Else',
        blogKey: 'blogKey4',
    },
    {
        blogId: 5,
        blogImage:
            'https://cdn.experimentalperfumeclub.com/wp-content/uploads/2020/11/EPC-Still-Life-3_V1-1.jpg',
        blogTitle: 'Understand Your Fragrance Family And Find Your Perfect Match',
        blogKey: 'blogKey5',
    },
    {
        blogId: 6,
        blogImage:
            'https://cdn.experimentalperfumeclub.com/wp-content/uploads/2021/10/olia-gozha-J4kK8b9Fgj8-unsplash-scaled.jpg',
        blogTitle: 'Our Best Perfume Books to Learn from Perfumers',
        blogKey: 'blogKey6',
    },
    {
        blogId: 7,
        blogImage:
            'https://cdn.experimentalperfumeclub.com/wp-content/uploads/2023/03/Instagram-post-portrait-1.png',
        blogTitle: 'The best scents for spring',
        blogKey: 'blogKey7',
    },
    {
        blogId: 8,
        blogImage:
            'https://cdn.experimentalperfumeclub.com/wp-content/uploads/2021/06/nathan-hurst-BgBTv96kEW0-unsplash-scaled.jpg',
        blogTitle: 'Our Top Three Signature Blends for Summer',
        blogKey: 'blogKey8',
    },
    {
        blogId: 9,
        blogImage:
            'https://cdn.experimentalperfumeclub.com/wp-content/uploads/2023/05/maddi-bazzocco-UhrHTmVBzzE-unsplash-scaled.jpg',
        blogTitle: 'We are nuts about nutty scents',
        blogKey: 'blogKey9',
    },
];

function BlogsList() {
    return (
        <Box sx={{ my: theme.spacingAxis.boxVerticalAxis16 }}>
            <Container sx={{ mt: 24 }}>
                <Grid container spacing={2}>
                    <BlogItem listData={blogsData} />
                </Grid>
            </Container>
        </Box>
    );
}

export default BlogsList;

const BlogItem = ({ listData }) => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation('translate');
    // const handleNavigationProductDetail = (blog) => {
    //     // navigate(`/${i18n.language}/blog-detail/${blog.blogId}`, { state: { blog } });
    //     navigate(`/${i18n.language}/blog-detail/${blog.blogTitle}`, { state: { blog } });
    // };

    const handleNavigationProductDetail = (blog) => {
        // navigate(`/${savedLanguage}/blog-detail/${blog.blogId}`, { state: { blog } });
        navigate(`/${i18n.language}/blog-detail/${blog.blogTitle}`, { state: { blog } });
        window.localStorage.setItem('blog_detail_data', JSON.stringify(blog));
        // back to top when navigate to another page
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };
    return (
        <>
            {listData.map((blog, index) => (
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    key={index}
                    onClick={() => handleNavigationProductDetail(blog)}
                >
                    <Box
                        sx={{
                            textAlign: 'center',
                            width: '100%',
                            height: '250px',
                            position: 'relative',
                            cursor: 'pointer',
                            padding: '4px',
                            backgroundColor: 'orange',
                            borderTopRightRadius: '10px',
                            borderBottomLeftRadius: '10px',
                            transition: 'all 1s',
                            '&:after, &:before': {
                                content: '""',
                                width: '10px',
                                height: '10px',
                                position: 'absolute',
                                border: '0px solid #fff',
                                transition: 'all 1s',
                            },
                            '&:after': {
                                top: '-1px',
                                left: '-1px',
                                borderTop: '5px solid black',
                                borderLeft: '5px solid black',
                            },
                            '&:before': {
                                bottom: '-1px',
                                right: '-1px',
                                borderBottom: '5px solid black',
                                borderRight: '5px solid black',
                            },
                            '&:hover': {
                                borderTopRightRadius: '0px',
                                borderBottomLeftRadius: '0px',
                                '&:before, &:after': {
                                    width: '100%',
                                    height: '100%',
                                },
                            },
                        }}
                    >
                        <Avatar
                            src={blog.blogImage}
                            alt={'Blog'}
                            sx={{
                                height: '250px',
                                width: '100%',
                                objectFit: 'cover',
                                transition: '0.3s ease-in-out',
                                borderRadius: 2,
                            }}
                        />
                        {/* show overplay on image */}
                        <Box
                            sx={{
                                cursor: 'pointer',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                bgcolor: 'rgba(0, 0, 0, 0.15)',
                                opacity: 0,
                                transition: '0.3s ease-in-out',
                                '&:hover': {
                                    opacity: 1,
                                },
                            }}
                        />
                    </Box>
                    <CustomizeTypography
                        sx={{
                            fontSize: '18px',
                            my: 3,
                            textAlign: 'center',
                        }}
                    >
                        {/* {blog.blogTitle} */}
                        {t(`common.blogsPage.${blog.blogKey}.title`)}
                    </CustomizeTypography>
                </Grid>
            ))}
        </>
    );
};
