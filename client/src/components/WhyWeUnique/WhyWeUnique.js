import { Container, Grid, Box } from '@mui/material';
import React from 'react';
import CustomizeTitle from '../CustomizeTitle/CustomizeTitle';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';

const aboutUsUnique = [
    {
        title: 'Locally Inspired',
        content:
            'Our perfumes are meticulously crafted to reflect the cultural heritage, traditions, and landscapes of various regions. From the vibrant streets of Marrakech to the serene cherry blossom gardens of Kyoto, each fragrance tells a unique story that resonates with its origin',
    },
    {
        title: 'High-Quality Ingredients',
        content:
            "We believe that the key to an extraordinary scent lies in the quality of ingredients. That's why we collaborate with expert perfumers who source the finest and ethically-sourced materials from around the world. We never compromise on the quality of our products, ensuring a long-lasting and luxurious experience.",
    },
    {
        title: 'Personalized Service',
        content:
            "We understand that choosing the perfect scent is a deeply personal experience. Our team of fragrance experts is always ready to assist you in finding a fragrance that complements your personality and style. Whether you're exploring new scents or seeking to rediscover an old favorite, we're here to guide you every step of the way.",
    },
];

function WhyWeUnique() {
    return (
        <Container sx={{ my: 4 }}>
            <CustomizeTitle heading={'What Makes Us Unique'} />
            <Grid container spacing={4} sx={{ mt: 4 }}>
                {aboutUsUnique.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                        <Box
                            sx={{
                                p: 2,
                                background: theme.palette.bestSelling,
                                borderRadius: 2,
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                height: '100%',
                                // Smooth transition
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    cursor: 'pointer',
                                    transform: 'translateY(-20px)',
                                },
                            }}
                        >
                            <CustomizeTypography
                                sx={{ fontSize: '20px', fontWeight: 'bold', mb: 2 }}
                            >
                                {item.title}
                            </CustomizeTypography>
                            <CustomizeTypography
                                sx={{
                                    textAlign: 'justify',

                                    // position: 'relative',
                                    // '::after': {
                                    //     content: '"Tomtoc"',
                                    //     position: 'absolute',
                                    //     // right: '-50px',
                                    //     top: '0',
                                    //     right: 0,
                                    //     bottom: '0',
                                    //     writingMode: 'vertical-rl',
                                    //     transform: 'rotate(180deg)',
                                    //     fontSize: '24px',
                                    //     color: theme.palette.secondaryText,
                                    // },
                                }}
                            >
                                {item.content}
                            </CustomizeTypography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default WhyWeUnique;
