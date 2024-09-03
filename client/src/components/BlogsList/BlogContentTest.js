import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { CustomizeTypographyBlog } from '../CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';
import { blogDetailData8 } from './blogDetailsData';

const blogDetailData7 = [
    {
        blogTitle: 'Ingredient Highlight: Sesame Absolute',
        blogImage:
            'https://cdn.experimentalperfumeclub.com/wp-content/uploads/2022/11/EPC-Tonka-Sesame-50ml-sq.jpg',

        blogContent: [
            'Tonka Sesame might be the nutty scent you never knew you liked. Sesame is a popular ingredient in Asian cuisine, and offers a unique and exotic scent. Sesame-based fragrances typically feature notes of roasted sesame and honey. ',
            'Tonka Sesame contains a wonderful ingredient – Sesame Absolute by LMR, which just smells like the sesame seeds you know. Only a trace in the formula has a powerful impact.',
            'Our Tonka Sesame is a unique blend of tonka bean, sesame and hazelnut, resulting in a warm and nutty scent that is both comforting and sophisticated. Tonka Sesame is part of the Essential collection, which allows you to blend different fragrances to create a completely new unique scent. ',
        ],
    },
    {
        blogTitle: '',
        blogImage:
            'https://cdn.experimentalperfumeclub.com/wp-content/uploads/2022/11/Tonka-Extraordinaire-50ml-sqLR.jpg',

        blogContent: [
            'Tonka Extraordinaire is born from pairing two Essentials, Tonka Sesame with Amber Iris, creating a deeper, warmer,  fire-roasted quality. It’s a perfect pairing bringing together its original nutty facets with a warm ambery and tobacco drydown. ',
            'Tonka Extraordinaire has been shortlisted for UK Fragrance Foundation’s Extraordinaire Category, a category that recognises independent perfumes for their extraordinary olfactive creations. ',
        ],
    },
];

function BlogContentTest() {
    return (
        <Box>
            <Box
                sx={{
                    backgroundColor: '#555',
                    minHeight: '650px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 4,
                }}
            >
                <Box sx={{ maxWidth: 750 }}>
                    <Box
                        component="img"
                        src="https://cdn.experimentalperfumeclub.com/wp-content/uploads/2021/06/nathan-hurst-BgBTv96kEW0-unsplash-scaled.jpg"
                        alt="Blog Image"
                        sx={{
                            borderRadius: 0,
                            height: '550px',
                            width: '750px',
                            objectFit: 'cover',
                        }}
                    />
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: '32px',
                            color: '#fff',
                            fontFamily: 'Orator, Courier, sans-serif',
                        }}
                    >
                        Our Top Three Signature Blends for Summer{' '}
                    </Typography>
                </Box>
            </Box>

            {/* Quote */}
            <Container
                sx={{
                    padding: '0 16px',
                    mt: 4,
                    maxWidth: '750px',
                }}
            >
                <FormatQuoteIcon
                    sx={{ fontSize: '32px', color: '#fff', transform: 'rotate(-180deg)' }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '26px',
                            color: '#fff',
                            fontStyle: 'italic',
                            fontFamily: 'Courier, sans-serif',
                            width: '60%',
                            textAlign: 'center',
                        }}
                    >
                        The days are warmer, the nights are longer. Summertime is well and truly
                        here, and it brings with it an abundance of gorgeous scents. In this post,
                        we talk you through our top-picks for summer from our Signature Blends
                        collection.
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        margin: '16px',
                    }}
                >
                    <FormatQuoteIcon sx={{ fontSize: '32px', color: '#fff' }} />
                </Box>
            </Container>

            <Box sx={{ my: 4, bgcolor: '#555' }}>
                <Container>
                    <Grid
                        container
                        spacing={2}
                        sx={{ display: 'flex', alignItems: 'center', py: 4 }}
                    >
                        <Grid item lg={12}>
                            <CustomizeTypographyBlog
                                sx={{
                                    mb: 2,
                                    fontSize: '24px',
                                    color: theme.palette.text.secondary,
                                    fontWeight: 'bold',
                                }}
                            >
                                The Scents Of Summertime
                            </CustomizeTypographyBlog>
                            <CustomizeTypographyBlog>
                                There is something so special and uplifting about the summertime: we
                                make new memories, remember summers gone by, and enjoy all the
                                wonderful things nature has to offer.
                                <br />
                                <br />
                                Our Signature Blends for Summer 2021 are powered by the natural
                                world, in all its wonderful versatility. From soft and sweet
                                florals, to vibrant green scents and tart, sparkling fragrances,
                                we’ve got you covered for every summer occasion.
                                <br />
                                <br />
                                For those always travelling with a spray in their pocket, whether on
                                staycation in your beautiful garden in bloom or right on the beach,
                                we have shortlisted for you three of the most summery fragrances
                                from our collection of Signature Blends.
                            </CustomizeTypographyBlog>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Container>
                <Grid container spacing={4}>
                    {blogDetailData8.map((blog, index) => (
                        <Grid
                            container
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={12}
                            key={index}
                            sx={{ mt: 4 }}
                        >
                            <Grid item xs={12} sm={6} md={4} lg={12}>
                                <CustomizeTypographyBlog
                                    sx={{
                                        fontSize: '32px',
                                        fontWeight: 'bold',
                                        mb: 2,
                                        textAlign: 'center',
                                        color: theme.palette.text.secondary,
                                    }}
                                >
                                    {blog.blogTitle}
                                </CustomizeTypographyBlog>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={12}>
                                {blog.blogContent?.map((text, index) => (
                                    <CustomizeTypographyBlog
                                        sx={{
                                            textAlign: 'justify',
                                            mb: 2,
                                        }}
                                        key={index}
                                    >
                                        {text}
                                    </CustomizeTypographyBlog>
                                ))}
                            </Grid>
                            {blog.blogImage.map((img, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                                    <Box
                                        component="img"
                                        src={img}
                                        alt="Blog Image"
                                        sx={{
                                            borderRadius: 0,
                                            width: '350px',
                                            height: '500px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default BlogContentTest;
