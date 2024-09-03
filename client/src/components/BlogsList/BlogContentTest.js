import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { CustomizeTypographyBlog } from '../CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';

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
                        src="https://cdn.experimentalperfumeclub.com/wp-content/uploads/2023/05/maddi-bazzocco-UhrHTmVBzzE-unsplash-scaled.jpg"
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
                        We are nuts about nutty scents
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
                        When we talk gourmand notes in perfumery, we often think about caramel and
                        vanilla but what about sweet notes that are not so excessively sweet. With
                        woody and spicy undertones, let us introduce you to some delightful nutty
                        scents.
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
                                Three nutty notes that will give you salivating reactions:
                            </CustomizeTypographyBlog>
                            <CustomizeTypographyBlog>
                                Tonka bean is a popular ingredient in gourmand fragrances and is
                                known for its warm and spicy scent. Tonka bean fragrances typically
                                contain notes of vanilla, caramel and almond. They offer a unique
                                and complex scent that is perfect for those who enjoy a
                                sophisticated gourmand.
                            </CustomizeTypographyBlog>
                            <CustomizeTypographyBlog>
                                Pistachio is having its moment for those who love the small green
                                nut. Pistachio cream fragrances typically contain notes of creamy
                                vanilla, almond and of course, pistachio.
                            </CustomizeTypographyBlog>
                            <CustomizeTypographyBlog>
                                Hazelnuts are another popular nut in gourmands. Fire-roasted
                                hazelnuts, vanilla and caramel offer a warm and sweet scent,
                                typically perfect for the fall or winter months.
                            </CustomizeTypographyBlog>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Container>
                <Grid container spacing={4}>
                    {blogDetailData7.map((blog, index) => (
                        <Grid
                            key={index}
                            container
                            spacing={4}
                            sx={{ mt: 4, display: 'flex', alignItems: 'center' }}
                            flexDirection={index % 2 === 0 ? 'row' : 'row-reverse'}
                        >
                            <Grid item xs={12} sm={6} md={4} lg={6} key={index}>
                                <Box>
                                    <CustomizeTypographyBlog
                                        sx={{
                                            fontSize: '32px',
                                            fontWeight: 'bold',
                                            mb: 2,
                                        }}
                                    >
                                        {blog.blogTitle}
                                    </CustomizeTypographyBlog>
                                    {blog.blogContent?.map((text, index) => (
                                        <CustomizeTypographyBlog
                                            sx={{
                                                textAlign: 'justify',
                                                mb: 2,
                                            }}
                                        >
                                            {text}
                                        </CustomizeTypographyBlog>
                                    ))}
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={6} key={index}>
                                <Box
                                    component={'img'}
                                    alt="Blog Detail Image"
                                    src={blog.blogImage}
                                    sx={{ width: '100%', height: '600px' }}
                                />
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default BlogContentTest;
