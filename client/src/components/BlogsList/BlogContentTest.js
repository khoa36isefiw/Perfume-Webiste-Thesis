import React from 'react';
import { Box, Container, IconButton, Typography } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { CustomizeTypographyBlog } from '../CustomizeTypography/CustomizeTypography';

function BlogContentTest() {
    return (
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
                        Why doesn’t my perfume last long enough?
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
                        }}
                    >
                        It is one of – if not the – most asked questions in perfumery. But, like all
                        great questions, the answer is complicated.
                        <br />
                        <br />
                        Here are five reasons you may not smell a fragrance for as long as you wish.
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
                        1. Olfactory fatigue: Your brain is getting “blind” to your own scent.
                    </Typography>
                    <Box sx={{ maxWidth: 750, mt: 1 }}>
                        <CustomizeTypographyBlog>
                            Perfumers always talk about the olfactory pyramid, and for good reason.
                            It provides the building blocks of any good perfume. But why? I hear you
                            ask. The pyramid represents the stages in which fragrances evolve. Most
                            perfume ingredients are volatile, meaning they have a shelf life.
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog>
                            Perfumes must be constructed with volatile compounds (better known as
                            VOC or volatile organic compounds) to be smelled and enjoyed in the
                            first place. If they are volatile, this means your fragrance is bound to
                            evaporate over time. Some ingredients (or molecules) evaporate quicker
                            than others!
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog>
                            The most volatile are those fresh-smelling citruses, aromatic and green
                            notes. Each ingredient has an individual lifespan – generally speaking,
                            top notes stay on the skin for up to 30 minutes.
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog>
                            Heart notes – the ingredients that provide the core of any good perfume
                            last around one to two hours. Mellow florals, spices and some gourmand
                            notes dominate this time frame.
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog>
                            Lastly, we have the base notes. These include rich scents such as woody
                            (sandalwood, cedarwood), ambery (vanilla, labdanum, frankincense) and
                            leather.
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog>
                            If you love these deeper scents, your perfume probably lasts longer than
                            the average. Stronger scents will have a robust sillage for others to
                            enjoy (or hate!). It is common for these notes to last all day, at the
                            very least, a few hours.
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog>
                            On the contrary, if you favour fresh, citrusy and floral notes, you’ll
                            find your fragrance lasts less, and you will need to re-spray throughout
                            the day to continue enjoying your fragrance. Each of these categories of
                            notes comes with its olfactory characteristics, which is very much down
                            to personal preferences. Your skin chemistry also plays a significant
                            part in how each ingredient behaves and how long it lasts. Very dry or
                            oily skin can dampen the longevity of any fragrance, no matter the
                            notes.
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
                        3. Extract vs Eau de parfum vs Eau de toilette: Choose concentration
                    </Typography>
                    <Box sx={{ maxWidth: 750, mt: 1 }}>
                        <CustomizeTypographyBlog>
                            Buying a stronger concentration is an easy way to make your perfume last
                            longer.
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog>
                            Confusing an Extract with an Eau de toilette will leave you bitterly
                            disappointed. But what’s the difference again?
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog>
                            Your perfume is predominantly a mixture of two things – fragrance
                            concentrate + alcohol.
                        </CustomizeTypographyBlog>

                        <CustomizeTypographyBlog>
                            Eau de toilette is the least concentrated = typically around 10-12%
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog>
                            Eau de parfum is more concentrated and usually one of the best choice =
                            typically 20-25%
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog>
                            Extract is the most concentrated = typically, over 25%
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog>
                            While the choice of one of the above formats will have an impact on
                            longevity, it also has an impact on the price you pay. Concentration is
                            the main expense. Sometimes, the price tag can be eye-watering. By
                            contrast, an EdT is the least pricey. EdPs fall in the middle, hence why
                            most people (and perfumers) prefer Eau de Parfums.
                        </CustomizeTypographyBlog>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default BlogContentTest;
