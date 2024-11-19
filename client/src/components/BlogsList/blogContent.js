import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { CustomizeTypographyBlog } from '../CustomizeTypography/CustomizeTypography';
import { ipadProScreen, mobileScreen, theme } from '../../Theme/Theme';
import {
    blogData,
    blogDetailData,
    blogDetailData4,
    blogDetailData5,
    blogDetailData6,
    blogDetailData7,
    blogDetailData8,
} from './blogDetailsData';

export const blogContent = (t) => ({
    1: (
        <Box>
            <Box
                sx={{
                    backgroundColor: '#555',
                    height: '650px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box sx={{ maxWidth: 750 }}>
                    <Box
                        component="img"
                        src="https://cdn.experimentalperfumeclub.com/wp-content/uploads/2023/12/Untitled-design-39.png"
                        alt="Blog Image"
                        sx={{
                            borderRadius: 0,
                            height: '550px',
                            width: '750px',
                            objectFit: 'cover',
                            margin: '24px 0',
                            [mobileScreen]: {
                                width: '100%',
                            },
                            [mobileScreen]: {
                                width: '100%',
                            },
                        }}
                    />
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: '32px',
                            color: '#fff',
                            fontFamily: 'Orator, Courier, sans-serif',
                            [mobileScreen]: {
                                fontSize: '20px',
                            },
                        }}
                    >
                        {t(`common.blogsPage.blogKey1.title`)}
                    </Typography>
                </Box>
            </Box>

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
                            [ipadProScreen]: {
                                width: '85%',
                            },
                        }}
                    >
                        {t(`common.blogsPage.blogKey1.content.q1`)}
                        <br />
                        <br />
                        {t(`common.blogsPage.blogKey1.content.q2`)}
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

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box
                        component="img"
                        src="https://cdn.experimentalperfumeclub.com/wp-content/uploads/2023/12/Untitled-design-40.png"
                        alt="Blog Image"
                        sx={{
                            borderRadius: 0,
                            height: '550px',
                            width: 750,
                            objectFit: 'cover',
                            margin: '24px 0',
                            [mobileScreen]: {
                                width: '100%',
                            },
                        }}
                    />
                    <Typography
                        sx={{
                            fontSize: '26px',
                            color: '#fff',
                            maxWidth: 750,
                            fontFamily: 'Courier, sans-serif',
                        }}
                    >
                        {t(`common.blogsPage.blogKey1.content.h1`)}
                    </Typography>
                    <Box sx={{ maxWidth: 750, mt: 1 }}>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p11`)}
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p12`)}
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p13`)}
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p14`)}
                        </CustomizeTypographyBlog>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box
                        component="img"
                        src="https://cdn.experimentalperfumeclub.com/wp-content/uploads/2023/12/Untitled-design-41.png"
                        alt="Blog Image"
                        sx={{
                            borderRadius: 0,
                            height: '550px',
                            width: 750,
                            objectFit: 'cover',
                            margin: '24px 0',
                            [mobileScreen]: {
                                width: '100%',
                            },
                        }}
                    />
                    <Typography
                        sx={{
                            fontSize: '26px',
                            color: '#fff',
                            maxWidth: 750,
                            fontFamily: 'Courier, sans-serif',
                        }}
                    >
                        {t(`common.blogsPage.blogKey1.content.h2`)}
                    </Typography>
                    <Box sx={{ maxWidth: 750, mt: 1 }}>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p21`)}
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p22`)}
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p23`)}
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p24`)}
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p25`)}
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p26`)}
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p27`)}
                        </CustomizeTypographyBlog>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box
                        component="img"
                        src="https://cdn.experimentalperfumeclub.com/wp-content/uploads/2023/12/Untitled-design-42.png"
                        alt="Blog Image"
                        sx={{
                            borderRadius: 0,
                            height: '550px',
                            width: 750,
                            objectFit: 'cover',
                            margin: '24px 0',
                            [mobileScreen]: {
                                width: '100%',
                            },
                        }}
                    />
                    <Typography
                        sx={{
                            fontSize: '26px',
                            color: '#fff',
                            maxWidth: 750,
                            fontFamily: 'Courier, sans-serif',
                        }}
                    >
                        {t(`common.blogsPage.blogKey1.content.h3`)}
                    </Typography>
                    <Box sx={{ maxWidth: 750, mt: 1 }}>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p31`)}
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p32`)}
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p33`)}
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p34`)}
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p35`)}
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p36`)}
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p37`)}
                        </CustomizeTypographyBlog>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box
                        component="img"
                        src="https://cdn.experimentalperfumeclub.com/wp-content/uploads/2023/12/Untitled-design-43.png"
                        alt="Blog Image"
                        sx={{
                            borderRadius: 0,
                            height: '550px',
                            width: 750,
                            objectFit: 'cover',
                            margin: '24px 0',
                            [mobileScreen]: {
                                width: '100%',
                            },
                        }}
                    />
                    <Typography
                        sx={{
                            fontSize: '26px',
                            color: '#fff',
                            maxWidth: 750,
                            fontFamily: 'Courier, sans-serif',
                        }}
                    >
                        {t(`common.blogsPage.blogKey1.content.h4`)}
                    </Typography>
                    <Box sx={{ maxWidth: 750, mt: 1 }}>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p41`)}
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p42`)}
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p43`)}
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p44`)}
                        </CustomizeTypographyBlog>

                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p45`)}
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p46`)}
                        </CustomizeTypographyBlog>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box
                        component="img"
                        src="https://cdn.experimentalperfumeclub.com/wp-content/uploads/2023/12/Untitled-design-44.png"
                        alt="Blog Image"
                        sx={{
                            borderRadius: 0,
                            height: '550px',
                            width: 750,
                            objectFit: 'cover',
                            margin: '24px 0',
                            [mobileScreen]: {
                                width: '100%',
                            },
                        }}
                    />
                    <Typography
                        sx={{
                            fontSize: '26px',
                            color: '#fff',
                            maxWidth: 750,
                            fontFamily: 'Courier, sans-serif',
                        }}
                    >
                        {t(`common.blogsPage.blogKey1.content.h5`)}
                    </Typography>

                    <Box sx={{ maxWidth: 750, mt: 1 }}>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p51`)}
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p52`)}
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p53`)}
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p54`)}
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p55`)}
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p56`)}
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p57`)}
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p58`)}
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog sx={{ mb: 2 }}>
                            {t(`common.blogsPage.blogKey1.content.p59`)}
                        </CustomizeTypographyBlog>
                    </Box>
                </Box>
            </Container>
        </Box>
    ),
    2: (
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
                        src="https://cdn.experimentalperfumeclub.com/wp-content/uploads/2023/11/drink-3025022_1920.jpg"
                        alt="Blog Image"
                        sx={{
                            borderRadius: 0,
                            height: '550px',
                            width: '750px',
                            objectFit: 'cover',
                            // margin: '24px 0',
                            [mobileScreen]: {
                                width: '100%',
                            },
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
                        {t(`common.blogsPage.blogKey2.title`)}
                    </Typography>
                </Box>
            </Box>

            <Container
                sx={{
                    padding: '0 16px',
                    mt: 4,
                    // maxWidth: '750px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        [mobileScreen]: {
                            flexDirection: 'column',
                        },
                    }}
                >
                    <Box
                        component="img"
                        src="https://cdn.experimentalperfumeclub.com/wp-content/uploads/2023/11/dried-hydrangeas-6846990_1920-1536x1024.jpg"
                        alt="Blog Image"
                        sx={{
                            borderRadius: 0,
                            height: '400px',
                            width: '500px',
                            objectFit: 'cover',
                            [mobileScreen]: {
                                width: '100%',
                            },
                        }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: '12%',
                                [mobileScreen]: {
                                    left: 0,
                                },
                            }}
                        >
                            <FormatQuoteIcon
                                sx={{
                                    fontSize: '32px',
                                    color: '#fff',
                                    transform: 'rotate(-180deg)',
                                }}
                            />
                        </Box>
                        <Typography
                            sx={{
                                fontSize: '26px',
                                color: '#fff',
                                fontStyle: 'italic',
                                fontFamily: 'Courier, sans-serif',
                                width: '60%',
                                [mobileScreen]: {
                                    width: '80%',
                                    fontSize: '24px',
                                },
                            }}
                        >
                            {t(`common.blogsPage.blogKey2.content.q1`)}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-end',
                                justifyContent: 'flex-end',
                                margin: '16px',
                                position: 'absolute',
                                bottom: 0,
                                right: '12%',
                                [mobileScreen]: {
                                    right: 0,
                                },
                            }}
                        >
                            <FormatQuoteIcon sx={{ fontSize: '32px', color: '#fff' }} />
                        </Box>
                    </Box>
                </Box>
            </Container>
            <Box sx={{ my: 4, bgcolor: '#555' }}>
                <Container>
                    <Grid
                        container
                        spacing={2}
                        sx={{ display: 'flex', alignItems: 'center', py: 4 }}
                    >
                        <Grid item lg={6}>
                            <CustomizeTypographyBlog sx={{ mb: 2 }}>
                                {t(`common.blogsPage.blogKey2.content.p11`)}
                            </CustomizeTypographyBlog>
                            <CustomizeTypographyBlog sx={{ mb: 2 }}>
                                {t(`common.blogsPage.blogKey2.content.p12`)}
                            </CustomizeTypographyBlog>
                            <CustomizeTypographyBlog sx={{ mb: 2 }}>
                                {t(`common.blogsPage.blogKey2.content.p13`)}
                            </CustomizeTypographyBlog>
                            <CustomizeTypographyBlog sx={{ mb: 2 }}>
                                {t(`common.blogsPage.blogKey2.content.p14`)}
                            </CustomizeTypographyBlog>

                            <CustomizeTypographyBlog sx={{ mb: 2 }}>
                                {t(`common.blogsPage.blogKey2.content.p15`)}
                            </CustomizeTypographyBlog>
                        </Grid>
                        <Grid
                            item
                            lg={6}
                            sx={{
                                '&.MuiGrid-item': {
                                    paddingTop: 0,
                                },
                            }}
                        >
                            <Box
                                component="img"
                                src="https://cdn.experimentalperfumeclub.com/wp-content/uploads/2023/11/dried-hydrangeas-6846990_1920-1536x1024.jpg"
                                alt="Blog Image"
                                sx={{
                                    borderRadius: 0,
                                    height: '800px',
                                    width: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Container>
                <Grid container spacing={4}>
                    {blogData.map((blog, index) => (
                        <Grid
                            key={blog.blogDataID}
                            container
                            spacing={4}
                            sx={{ mt: 4, display: 'flex', alignItems: 'center' }}
                            flexDirection={index % 2 === 0 ? 'row-reverse' : 'row'}
                        >
                            <Grid item xs={12} sm={6} md={4} lg={7}>
                                <Box>
                                    <CustomizeTypographyBlog
                                        sx={{
                                            fontSize: '46px',
                                            fontWeight: 'bold',
                                            mb: 2,
                                        }}
                                    >
                                        {t(`common.blogsPage.blogKey2.content.${blog.titleKey}`)}
                                    </CustomizeTypographyBlog>
                                    {blog.contentKey?.map((text, indexText) => (
                                        <CustomizeTypographyBlog
                                            key={indexText}
                                            sx={{
                                                textAlign: 'justify',
                                                mb: 2,
                                            }}
                                        >
                                            {t(`common.blogsPage.blogKey2.content.${text}`)}
                                        </CustomizeTypographyBlog>
                                    ))}
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={5} key={index}>
                                <Box
                                    component={'img'}
                                    alt="Blog Detail Image"
                                    src={blog.blogDetailContentImage}
                                    sx={{ width: '100%', height: '600px' }}
                                />
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    ),
    3: (
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
                        src="https://cdn.experimentalperfumeclub.com/wp-content/uploads/2023/11/1Y7A1148.jpg"
                        alt="Blog Image"
                        sx={{
                            borderRadius: 0,
                            height: '550px',
                            width: '750px',
                            objectFit: 'cover',
                            [mobileScreen]: {
                                width: '100%',
                            },
                        }}
                    />
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: '32px',
                            color: '#fff',
                            fontFamily: 'Orator, Courier, sans-serif',
                            [mobileScreen]: {
                                fontSize: '24px',
                            },
                        }}
                    >
                        {t(`common.blogsPage.blogKey3.title`)}
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
                            [mobileScreen]: {
                                width: '85%',
                            },
                        }}
                    >
                        {t(`common.blogsPage.blogKey3.content.q1`)}
                        <br />
                        <br />
                        {t(`common.blogsPage.blogKey3.content.q2`)}
                        <br />
                        <br />
                        {t(`common.blogsPage.blogKey3.content.q3`)}
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

                {/* content */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {blogDetailData.map((blog, index) => (
                        <Box key={index}>
                            <Box
                                component="img"
                                src={blog.blogImage}
                                alt="Blog Image"
                                sx={{
                                    borderRadius: 0,
                                    height: '550px',
                                    width: 750,
                                    objectFit: 'cover',
                                    margin: '24px 0',
                                    [mobileScreen]: {
                                        width: '100%',
                                    },
                                    mt: 8,
                                }}
                            />
                            <Typography
                                sx={{
                                    fontSize: '26px',
                                    color: theme.palette.text.secondary,
                                    fontWeight: 'bold',
                                    maxWidth: 750,
                                    fontFamily: 'Courier, sans-serif',
                                    mt: 2,
                                }}
                            >
                                {t(`common.blogsPage.blogKey3.content.${blog.blogTitle}`)}
                            </Typography>
                            {blog.blogContent.map((text, index) => (
                                <Box sx={{ maxWidth: 750, mt: 1 }} key={index}>
                                    <CustomizeTypographyBlog>
                                        {t(`common.blogsPage.blogKey3.content.${text}`)}
                                    </CustomizeTypographyBlog>
                                </Box>
                            ))}
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    ),
    4: (
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
                        src="https://cdn.experimentalperfumeclub.com/wp-content/uploads/2020/11/braydon-anderson-wOHH-NUTvVc-unsplash-web-res.jpg"
                        alt="Blog Image"
                        sx={{
                            borderRadius: 0,
                            height: '550px',
                            width: '750px',
                            objectFit: 'cover',
                            [mobileScreen]: {
                                width: '100%',
                            },
                        }}
                    />
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: '32px',
                            color: '#fff',
                            fontFamily: 'Orator, Courier, sans-serif',
                            [mobileScreen]: {
                                fontSize: '24px',
                            },
                        }}
                    >
                        {t(`common.blogsPage.blogKey4.title`)}
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
                            [mobileScreen]: {
                                width: '95%',
                            },
                        }}
                    >
                        {t(`common.blogsPage.blogKey4.content.q1`)}
                        <br />
                        <br />
                        {t(`common.blogsPage.blogKey4.content.q2`)}
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

                {/* content */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {blogDetailData4.map((blog, index) => (
                        <Box key={index}>
                            <Typography
                                sx={{
                                    fontSize: '26px',
                                    color: theme.palette.text.secondary,
                                    fontWeight: 'bold',
                                    maxWidth: 750,
                                    fontFamily: 'Courier, sans-serif',
                                    mt: 2,
                                }}
                            >
                                {t(`common.blogsPage.blogKey4.content.${blog.blogTitle}`)}
                            </Typography>
                            {blog.blogContent.map((text, index) => (
                                <Box sx={{ maxWidth: 750, mt: 1 }} key={index}>
                                    <CustomizeTypographyBlog>
                                        {t(`common.blogsPage.blogKey4.content.${text}`)}
                                    </CustomizeTypographyBlog>
                                </Box>
                            ))}
                            <Box
                                component="img"
                                src={blog.blogImage}
                                alt="Blog Image"
                                sx={{
                                    borderRadius: 0,
                                    height: '550px',
                                    width: 750,
                                    objectFit: 'cover',
                                    margin: '24px 0',
                                    [mobileScreen]: {
                                        width: '100%',
                                    },
                                    mt: 8,
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    ),
    5: (
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
                        src="https://cdn.experimentalperfumeclub.com/wp-content/uploads/2020/11/EPC-Still-Life-3_V1-1.jpg"
                        alt="Blog Image"
                        sx={{
                            borderRadius: 0,
                            height: '550px',
                            width: '750px',
                            objectFit: 'cover',
                            [mobileScreen]: {
                                width: '100%',
                            },
                        }}
                    />
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: '32px',
                            color: '#fff',
                            fontFamily: 'Orator, Courier, sans-serif',
                            [mobileScreen]: {
                                fontSize: '24px',
                            },
                        }}
                    >
                        {t(`common.blogsPage.blogKey5.title`)}
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
                            [mobileScreen]: {
                                fontSize: '24px',
                                width: '90%',
                            },
                        }}
                    >
                        {t(`common.blogsPage.blogKey5.content.q1`)}
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

                <CustomizeTypographyBlog sx={{ mb: 2 }}>
                    {t(`common.blogsPage.blogKey5.content.p11`)}
                </CustomizeTypographyBlog>
                <CustomizeTypographyBlog sx={{ mb: 2 }}>
                    {t(`common.blogsPage.blogKey5.content.p12`)}
                </CustomizeTypographyBlog>
                <Typography
                    sx={{
                        fontSize: '26px',
                        color: theme.palette.text.secondary,
                        fontWeight: 'bold',
                        maxWidth: 750,
                        fontFamily: 'Courier, sans-serif',
                        mt: 2,
                    }}
                >
                    {t(`common.blogsPage.blogKey5.content.h2`)}
                </Typography>
                <CustomizeTypographyBlog sx={{ mb: 2 }}>
                    {t(`common.blogsPage.blogKey5.content.p21`)}
                    <br />
                    <br />
                    {t(`common.blogsPage.blogKey5.content.p22`)}
                </CustomizeTypographyBlog>
                <Box
                    component="img"
                    src={
                        'https://cdn.experimentalperfumeclub.com/wp-content/uploads/2020/11/EPC-Still-Life-3_V1-1-1600x1280.jpg'
                    }
                    alt="Blog Image"
                    sx={{
                        borderRadius: 0,
                        height: '550px',
                        width: '100%',
                        objectFit: 'cover',
                        margin: '24px 0',
                        [mobileScreen]: {
                            width: '100%',
                        },
                        mt: 8,
                    }}
                />

                <Box sx={{ position: 'relative' }}>
                    <FormatQuoteIcon
                        sx={{
                            position: 'absolute',
                            top: '-20%',
                            left: '15%',
                            fontSize: '32px',
                            color: '#fff',
                            transform: 'rotate(-180deg)',
                            [mobileScreen]: {
                                top: '-15%',
                                left: '0%',
                            },
                        }}
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
                                [mobileScreen]: {
                                    width: '80%',
                                    fontSize: '24px',
                                },
                            }}
                        >
                            {t(`common.blogsPage.blogKey5.content.q2`)}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: '-30%',
                            right: '15%',
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                            margin: '16px',
                            [mobileScreen]: {
                                bottom: '-25%',
                                right: '0%',
                            },
                        }}
                    >
                        <FormatQuoteIcon sx={{ fontSize: '32px', color: '#fff' }} />
                    </Box>
                </Box>

                {/* content */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {blogDetailData5.map((blog, index) => (
                        <Box key={index}>
                            <Typography
                                sx={{
                                    fontSize: '26px',
                                    color: theme.palette.text.secondary,
                                    fontWeight: 'bold',
                                    maxWidth: 750,
                                    fontFamily: 'Courier, sans-serif',
                                    mt: 2,
                                }}
                            >
                                {t(`common.blogsPage.blogKey5.content.${blog.blogTitle}`)}
                            </Typography>
                            {blog.blogContent.map((text, index) => (
                                <Box sx={{ maxWidth: 750, mt: 1 }} key={index}>
                                    <CustomizeTypographyBlog>
                                        {t(`common.blogsPage.blogKey5.content.${text}`)}
                                    </CustomizeTypographyBlog>
                                </Box>
                            ))}
                            <Box
                                component="img"
                                src={blog.blogImage}
                                alt="Blog Image"
                                sx={{
                                    borderRadius: 0,
                                    height: '550px',
                                    width: 750,
                                    objectFit: 'cover',
                                    margin: '24px 0',
                                    [mobileScreen]: {
                                        width: '100%',
                                    },
                                    mt: 8,
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    ),
    6: (
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
                        src="https://cdn.experimentalperfumeclub.com/wp-content/uploads/2021/10/olia-gozha-J4kK8b9Fgj8-unsplash-scaled.jpg"
                        alt="Blog Image"
                        sx={{
                            borderRadius: 0,
                            height: '550px',
                            width: '750px',
                            objectFit: 'cover',
                            [mobileScreen]: {
                                width: '100%',
                            },
                        }}
                    />
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: '32px',
                            color: '#fff',
                            fontFamily: 'Orator, Courier, sans-serif',
                            [mobileScreen]: {
                                fontSize: '24px',
                            },
                        }}
                    >
                        {/* Our Best Perfume Books to Learn from Perfumers */}
                        {t(`common.blogsPage.blogKey6.title`)}
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
                            [mobileScreen]: {
                                fontSize: '24px',
                                width: '90%',
                            },
                        }}
                    >
                        {t(`common.blogsPage.blogKey6.content.q1`)}
                    </Typography>
                </Box>

                {/* content */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {blogDetailData6.map((blog, index) => (
                        <Box key={index}>
                            <Typography
                                sx={{
                                    fontSize: '30px',
                                    color: theme.palette.text.secondary,
                                    fontWeight: 'bold',
                                    maxWidth: 750,
                                    fontFamily: 'Courier, sans-serif',
                                    mt: 6,
                                    textAlign: 'center',
                                }}
                            >
                                {t(`common.blogsPage.blogKey6.content.${blog.bigTitle}`)}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '26px',
                                    color: theme.palette.text.secondary,
                                    fontWeight: 'bold',
                                    maxWidth: 750,
                                    fontFamily: 'Courier, sans-serif',
                                    mt: 2,
                                }}
                            >
                                {t(`common.blogsPage.blogKey6.content.${blog.blogTitle}`)}
                            </Typography>
                            {blog.blogContent.map((text, index) => (
                                <Box sx={{ maxWidth: 750, mt: 1 }} key={index}>
                                    <CustomizeTypographyBlog>
                                        {t(`common.blogsPage.blogKey6.content.${text}`)}
                                    </CustomizeTypographyBlog>
                                </Box>
                            ))}
                            {blog.blogImage !== '' && (
                                <Box
                                    component="img"
                                    src={blog.blogImage}
                                    alt="Blog Image"
                                    sx={{
                                        borderRadius: 0,
                                        height: '550px',
                                        width: 750,
                                        objectFit: 'cover',
                                        margin: '24px 0',
                                        [mobileScreen]: {
                                            width: '100%',
                                        },
                                        mt: 8,
                                    }}
                                />
                            )}
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    ),
    9: (
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
                            [mobileScreen]: {
                                width: '100%',
                            },
                        }}
                    />
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: '32px',
                            color: '#fff',
                            fontFamily: 'Orator, Courier, sans-serif',
                            [mobileScreen]: {
                                fontSize: '24px',
                            },
                        }}
                    >
                        {/* We are nuts about nutty scents */}
                        {t(`common.blogsPage.blogKey9.title`)}
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
                            [mobileScreen]: {
                                width: '90%',
                            },
                        }}
                    >
                        {t(`common.blogsPage.blogKey9.content.qoute`)}
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
                        <Grid item xs={12} lg={12}>
                            <CustomizeTypographyBlog
                                sx={{
                                    mb: 2,
                                    fontSize: '24px',
                                    color: theme.palette.text.secondary,
                                    fontWeight: 'bold',
                                }}
                            >
                                {t(`common.blogsPage.blogKey9.content.title2`)}
                            </CustomizeTypographyBlog>
                            <CustomizeTypographyBlog>
                                {t(`common.blogsPage.blogKey9.content.content1`)}
                            </CustomizeTypographyBlog>
                            <CustomizeTypographyBlog>
                                {t(`common.blogsPage.blogKey9.content.content2`)}
                            </CustomizeTypographyBlog>
                            <CustomizeTypographyBlog>
                                {t(`common.blogsPage.blogKey9.content.content3`)}
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
                            <Grid item xs={12} sm={6} md={4} lg={6}>
                                <Box>
                                    <CustomizeTypographyBlog
                                        sx={{
                                            fontSize: '32px',
                                            fontWeight: 'bold',
                                            mb: 2,
                                        }}
                                    >
                                        {t(`common.blogsPage.blogKey9.content.${blog.blogKey}`)}
                                    </CustomizeTypographyBlog>
                                    {blog.blogContent?.map((text, index) => (
                                        <CustomizeTypographyBlog
                                            key={index}
                                            sx={{
                                                textAlign: 'justify',
                                                mb: 2,
                                            }}
                                        >
                                            {t(`common.blogsPage.blogKey9.content.${text}`)}
                                        </CustomizeTypographyBlog>
                                    ))}
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={6}>
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
    ),
    7: (
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
                        src="https://cdn.experimentalperfumeclub.com/wp-content/uploads/2023/03/Instagram-post-portrait-1.png"
                        alt="Blog Image"
                        sx={{
                            borderRadius: 0,
                            height: '550px',
                            width: '750px',
                            objectFit: 'cover',
                            [mobileScreen]: {
                                width: '100%',
                            },
                        }}
                    />
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: '32px',
                            color: '#fff',
                            fontFamily: 'Orator, Courier, sans-serif',
                            [mobileScreen]: {
                                fontSize: '24px',
                            },
                        }}
                    >
                        {t(`common.blogsPage.blogKey7.title`)}
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
                            [mobileScreen]: {
                                fontSize: '24px',
                                width: '90%',
                            },
                        }}
                    >
                        {t(`common.blogsPage.blogKey7.content.q1`)}
                        <br />
                        <br />
                        {t(`common.blogsPage.blogKey7.content.q2`)}
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
                                {t(`common.blogsPage.blogKey7.content.h1`)}
                            </CustomizeTypographyBlog>
                            <CustomizeTypographyBlog>
                                {t(`common.blogsPage.blogKey7.content.p11`)}
                                <br />
                                <br />
                                {t(`common.blogsPage.blogKey7.content.p12`)}
                            </CustomizeTypographyBlog>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Container>
                <Grid container spacing={4}>
                    {blogDetailData8.map((blog, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={12} key={index}>
                            <Box>
                                <CustomizeTypographyBlog
                                    sx={{
                                        fontSize: '32px',
                                        fontWeight: 'bold',
                                        mb: 2,
                                    }}
                                >
                                    {t(`common.blogsPage.blogKey7.content.${blog.blogTitle}`)}
                                </CustomizeTypographyBlog>
                                {blog.blogContent?.map((text, index) => (
                                    <CustomizeTypographyBlog
                                        key={index}
                                        sx={{
                                            textAlign: 'justify',
                                            mb: 2,
                                        }}
                                    >
                                        {t(`common.blogsPage.blogKey7.content.${text}`)}
                                    </CustomizeTypographyBlog>
                                ))}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    ),
    8: (
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
                            [mobileScreen]: {
                                width: '100%',
                            },
                        }}
                    />
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: '32px',
                            color: '#fff',
                            fontFamily: 'Orator, Courier, sans-serif',
                            [mobileScreen]: {
                                fontSize: '24px',
                            },
                        }}
                    >
                        {t(`common.blogsPage.blogKey8.title`)}
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
                            [mobileScreen]: {
                                width: '85%',
                            },
                        }}
                    >
                        {t(`common.blogsPage.blogKey8.content.q1`)}
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
                                {t(`common.blogsPage.blogKey8.content.h1`)}
                            </CustomizeTypographyBlog>
                            <CustomizeTypographyBlog>
                                {t(`common.blogsPage.blogKey8.content.p11`)}
                                <br />
                                <br />
                                {t(`common.blogsPage.blogKey8.content.p12`)}
                                <br />
                                <br />
                                {t(`common.blogsPage.blogKey8.content.p13`)}
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
                                    {t(`common.blogsPage.blogKey7.content.${blog.blogTitle}`)}
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
                                        {t(`common.blogsPage.blogKey7.content.${text}`)}
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
    ),
});
