import React from 'react';
import { Avatar, Box, Container, Grid } from '@mui/material';

import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../Theme/Theme';

const blogsData = [
    {
        blogId: 1,
        blogImage:
            'https://cdn.experimentalperfumeclub.com/wp-content/uploads/2023/12/Untitled-design-39.png',
        blogTitle: 'Why doesn’t my perfume last long enough?',
    },
    {
        blogId: 2,
        blogImage:
            'https://cdn.experimentalperfumeclub.com/wp-content/uploads/2023/11/drink-3025022_1920.jpg',
        blogTitle: 'How to Choose your Perfume Palettes for the Changing Seasons',
    },
    {
        blogId: 3,
        blogImage:
            'https://cdn.experimentalperfumeclub.com/wp-content/uploads/2023/11/1Y7A1148.jpg',
        blogTitle: 'How to Make Your Bespoke Perfume',
    },
    {
        blogId: 4,
        blogImage:
            'https://cdn.experimentalperfumeclub.com/wp-content/uploads/2020/11/braydon-anderson-wOHH-NUTvVc-unsplash-web-res.jpg',
        blogTitle: 'How To Choose A Perfume For Someone Else',
    },
    {
        blogId: 5,
        blogImage:
            'https://cdn.experimentalperfumeclub.com/wp-content/uploads/2020/11/EPC-Still-Life-3_V1-1.jpg',
        blogTitle: 'Understand Your Fragrance Family And Find Your Perfect Match',
    },
    {
        blogId: 6,
        blogImage:
            'https://cdn.experimentalperfumeclub.com/wp-content/uploads/2021/10/olia-gozha-J4kK8b9Fgj8-unsplash-scaled.jpg',
        blogTitle: 'Our Best Perfume Books to Learn from Perfumers',
    },
    {
        blogId: 7,
        blogImage:
            'https://cdn.experimentalperfumeclub.com/wp-content/uploads/2023/03/Instagram-post-portrait-1.png',
        blogTitle: 'The best scents for spring',
    },
    {
        blogId: 8,
        blogImage:
            'https://cdn.experimentalperfumeclub.com/wp-content/uploads/2021/06/nathan-hurst-BgBTv96kEW0-unsplash-scaled.jpg',
        blogTitle: 'Our Top Three Signature Blends for Summer',
    },
    {
        blogId: 9,
        blogImage:
            'https://cdn.experimentalperfumeclub.com/wp-content/uploads/2023/05/maddi-bazzocco-UhrHTmVBzzE-unsplash-scaled.jpg',
        blogTitle: 'We are nuts about nutty scents',
    },
];

function BlogsList() {
    return (
        <Box sx={{ my: theme.spacingAxis.boxVerticalAxis16 }}>
            <Container sx={{}}>
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

    const handleNavigationProductDetail = (blog) => {
        navigate(`/blog-detail/${blog.blogId}`, { state: { blog } });
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
                        {blog.blogTitle}
                    </CustomizeTypography>
                </Grid>
            ))}
        </>
    );
};
