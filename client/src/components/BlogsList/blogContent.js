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
                        {/* Why doesn’t my perfume last long enough? */}
                        {/* {t('common.ets')} */}
                        ahiahiahi
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
                        1. Olfactory fatigue: Your brain is getting “blind” to your own scent.
                    </Typography>
                    <Box sx={{ maxWidth: 750, mt: 1 }}>
                        <CustomizeTypographyBlog>
                            Our nervous system – your body’s control centre, has evolved to become
                            less sensitive to recurring stimuli. Back in the day, this gave us a
                            fighting chance to deal with all the dangers we encountered. It’s why a
                            new scent, sight, texture or taste heightens our interest. Our body is
                            saying, hang on a minute, that’s new. What is it?
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog>
                            When it comes to scents, it means we always lose perspective. If you
                            wear the same fragrance daily, you’re bound to think the potency has
                            dwindled over the years, or even throughout the day. It’s why you can’t
                            smell the scent of your home, while other people will pick up on it
                            immediately.
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog>
                            The same goes for the perfume you are wearing on your neck. Your nose
                            and brain will naturally get used to it. You may even lose the scent
                            completely. But it’s there, just as you remember it, and other people
                            will smell it more than you since they have not adapted to it!
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog>
                            If you can’t smell your perfume anymore, try to spray your fragrance on
                            your wrists or another part of your body. The trick is distancing the
                            location from your nose. This small modification can alter the chemistry
                            and reignite your detection. At the very least, the change will catch
                            you by surprise when you move around and get a fresh waft.
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
                        2. Your perfume preferences: The style of perfume you enjoy wearing will
                        dictate its longevity
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
                        4. Partial Anosmia: Know your sensitivity to one or a group of ingredients
                    </Typography>
                    <Box sx={{ maxWidth: 750, mt: 1 }}>
                        <CustomizeTypographyBlog>
                            *Anosmic/anosmia – commonly known as smell blindness.
                        </CustomizeTypographyBlog>

                        <CustomizeTypographyBlog>
                            Only a few people experience anosmia permanently. For the anosmic, scent
                            is just a concept. They are unable to detect any smell. But many of us
                            know what it is like, especially after the last few years. One of the
                            common symptoms of COVID-19 was a temporary lack of smell (temporary
                            anosmia).
                        </CustomizeTypographyBlog>

                        <CustomizeTypographyBlog>
                            Some people experience partial anosmia, meaning you may not be sensitive
                            to a scent or perfume others can smell strongly. This boils down to
                            nasal characteristics and a lot of science. People can be anosmic to
                            base ingredients – molecules in the musky, woody or ambery category are
                            common.
                        </CustomizeTypographyBlog>

                        <CustomizeTypographyBlog>
                            This is why perfumers will often mix several different musks
                            (galaxolide, muscenone, habanolide etc…) in their formula in the hope
                            that the user will be more sensitive to one or another.
                        </CustomizeTypographyBlog>

                        <CustomizeTypographyBlog>
                            Other ingredients in the amber-wood category, such as Ambroxan and Iso E
                            Super, can be hard to detect for some people, while others will smell
                            them very strongly.
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog>
                            Being anosmic to some ingredients is neither here nor there. However, it
                            is good to be aware of your limitations. You don’t want to be the one
                            who overdoes it because you’re none the wiser.
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
                        5. Your skin: Your chemical makeup will make your fragrance change
                    </Typography>
                    <Box sx={{ maxWidth: 750, mt: 1 }}>
                        <CustomizeTypographyBlog>
                            Our skin is our biggest organ and one of our most complicated. It has to
                            be with all we put it through. When it comes to perfume – and how long
                            it lasts – we should give it a thought. Whether your skin is ‘normal’,
                            dry, or oily, it all makes a difference. Even our environment wreaks
                            havoc on our skin and the perfume we wear. Everything from pH levels,
                            hormones, diet, humanity and the weather has an effect.
                        </CustomizeTypographyBlog>

                        <CustomizeTypographyBlog>
                            Oily skin tends to hold the top notes (those volatile ingredients)
                            longer. This is because of the extra moisture on the skin.
                        </CustomizeTypographyBlog>

                        <CustomizeTypographyBlog>
                            Drier skin has the opposite effect. However, dry skin, in general, is
                            bad news for perfume longevity. If you have dry skin, try adding some
                            extra (unscented) moisturiser to the spots you’re going to spritz. This
                            will help your skin hold the scent for longer.
                        </CustomizeTypographyBlog>

                        <CustomizeTypographyBlog>
                            pH levels are one of the biggest players on your skin. Most skin lies
                            around 4.5 to 6.2 on the scale (0 being extremely acidic and 14 being
                            extremely alkaline). If your skin is acidic, your perfume will dry and
                            fade faster. But whether you have acidic or alkaline skin, the pH level
                            will have an effect.
                        </CustomizeTypographyBlog>

                        <CustomizeTypographyBlog>
                            We recommend keeping tabs on what perfumes work well/last longest on
                            your skin. Remember, you’re only as good as your nose. And more often
                            than not, our noses are lousy. Second opinions are always a good idea.
                        </CustomizeTypographyBlog>

                        <CustomizeTypographyBlog>
                            Here’s a handy checklist for your next perfume-shopping trip:
                        </CustomizeTypographyBlog>

                        <CustomizeTypographyBlog>
                            Know your skin type: Dry skin makes fragrances smell less intense and
                            fade faster.
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog>
                            Test before you buy: Always test a fragrance on your skin before
                            purchasing. What smells amazing on a paper blotter or someone else might
                            not work the same for you.
                        </CustomizeTypographyBlog>
                        <CustomizeTypographyBlog>
                            Consider natural perfumes: Natural perfumes often have a different, more
                            complex interaction with skin compared to synthetic ones. Natural
                            ingredients contain many molecules, and their scent will evolve (just
                            like the perfume itself).
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
                        How to Choose your Perfume Palettes for the Changing Seasons
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
                            Winter is here with her arms wide open. With the cooler weather, we’re
                            all changing a lot. Our linen jacket is making way for our leather one
                            and it’s time to rethink our daily scent.
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
                                Picking a new perfume can be overwhelming. Of course, we should pay
                                attention to trends. But more than anything, we should prioritise
                                our personal needs. Nothing’s worse than picking a perfume you’re
                                not confident wearing or something that doesn’t suit your needs.
                            </CustomizeTypographyBlog>

                            <CustomizeTypographyBlog sx={{ mb: 2 }}>
                                First, look ahead and ask yourself, what am I doing this season?
                            </CustomizeTypographyBlog>

                            <CustomizeTypographyBlog sx={{ mb: 2 }}>
                                Are you planning to wine and dine your way through a new city, chase
                                the sun across the world or embrace the first flakes of snow in the
                                mountains? Whatever you need, there’s a scent for you. Whether you
                                need top tips or perfume recommendations, we’re here to help you be
                                experimental.
                            </CustomizeTypographyBlog>

                            <CustomizeTypographyBlog sx={{ mb: 2 }}>
                                When moving from autumn to winter, we should consider a balanced
                                fragrance that blends the best of both worlds into one. There’s no
                                point hanging on to your summer all-citrus and floral sensation. It
                                might get lost in a heavy-scented crowd. Equally, it’s a fraction
                                early to re-order that rich winter favourite.
                            </CustomizeTypographyBlog>

                            <CustomizeTypographyBlog sx={{ mb: 2 }}>
                                In the spirit of EPC and experimentation in general, here are some
                                ingredients perfect for blending and some perfume options for cosy
                                winter.
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
                                        {blog.blogDetailContentTitle}
                                    </CustomizeTypographyBlog>
                                    {blog.blogDetailContentText?.map((text, indexText) => (
                                        <CustomizeTypographyBlog
                                            key={indexText}
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
                        How to Make Your Bespoke Perfume
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
                        At EPC, we know a thing or two about personalised fragrances as we empower
                        people to explore, experience and experiment with fragrances.
                        <br />
                        <br />
                        We believe everyone can be the designer of their own personalised perfume.
                        <br />
                        <br />
                        Here are 4 ways you can create a fragrance truly unique to you!
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
                                {blog.blogTitle}
                            </Typography>
                            {blog.blogContent.map((text, index) => (
                                <Box sx={{ maxWidth: 750, mt: 1 }} key={index}>
                                    <CustomizeTypographyBlog>{text}</CustomizeTypographyBlog>
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
                        How To Choose A Perfume For Someone Else
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
                        With so many fragrances to choose from, how do you know which one to pick?
                        Choosing a perfume for someone else can be tricky, but it’s not impossible.
                        <br />
                        <br />
                        Here are our 5 top tips to help you on your way.
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
                                {blog.blogTitle}
                            </Typography>
                            {blog.blogContent.map((text, index) => (
                                <Box sx={{ maxWidth: 750, mt: 1 }} key={index}>
                                    <CustomizeTypographyBlog>{text}</CustomizeTypographyBlog>
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
                        Understand Your Fragrance Family And Find Your Perfect Match
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
                        Just like in our world of people, the world of scent uses ‘families’ to
                        group and classify our ingredients and perfumes, but what are they and what
                        do they mean?
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
                    We’re all used to categorising what we like. Be it from films such as Rom-Coms,
                    Horror, Action to music such as Pop, RnB, Classical. The fragrance world isn’t
                    much different.
                </CustomizeTypographyBlog>
                <CustomizeTypographyBlog sx={{ mb: 2 }}>
                    If you’re like us you might find yourself wearing perfumes all with a similar
                    smell. That’s because without knowing it, we’re naturally drawn to fragrances
                    that have a signature scent from one or more fragrance families. Sometimes this
                    can vary depending on the time of year but on the whole we’re creatures of
                    familiarity.
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
                    SCENT SPECTRUM OR FRAGRANCE WHEEL
                </Typography>
                <CustomizeTypographyBlog sx={{ mb: 2 }}>
                    Traditionally there are six to seven fragrance families such as citrus, floral,
                    woody, oriental and so on. Then within each family, there are sub-families that
                    define the second most important olfactory note.
                    <br />
                    <br />A Scent Spectrum or Fragrance Wheel can help you understand how families
                    are organised and by extension, to understand how the world of perfumery works.
                    Viewing the whole spectrum allows you to see what scents complement and clash
                    with each other. Contrasts can be colourful but harmony is key.
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
                            Let’s take a closer look at some of the most famous Fragrance Families
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
                                {blog.blogTitle}
                            </Typography>
                            {blog.blogContent.map((text, index) => (
                                <Box sx={{ maxWidth: 750, mt: 1 }} key={index}>
                                    <CustomizeTypographyBlog>{text}</CustomizeTypographyBlog>
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
                        Our Best Perfume Books to Learn from Perfumers
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
                        We are often asked about our favourite books about perfumery, and there are
                        plenty out there to stick your nose into, but these are our favourite.
                        Instead of poetic perfumed prose these are the most comprehensive books
                        written by perfumers and professionals of the perfume industry covering the
                        art of perfumery, the perfumer, the industry, and of course, ingredients –
                        giving proper insights into the world of fragrance, and the profession of a
                        perfumer, rather than whimsical words on pretty perfumes. Enjoy, and we hope
                        they pique your interests in perfume even further.
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
                                {blog.bigTitle}
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
                                {blog.blogTitle}
                            </Typography>
                            {blog.blogContent.map((text, index) => (
                                <Box sx={{ maxWidth: 750, mt: 1 }} key={index}>
                                    <CustomizeTypographyBlog>{text}</CustomizeTypographyBlog>
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
                            [mobileScreen]: {
                                width: '90%',
                            },
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
                        <Grid item xs={12} lg={12}>
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
                            <Grid item xs={12} sm={6} md={4} lg={6}>
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
                                            key={index}
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
                        The best scents for spring
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
                        Spring is a season of change. It’s a time between sunny beaches and cosy
                        cottages. And with that in mind, our fragrances should be a tweener too.
                        <br />
                        <br />
                        It’s this time of year that blended and bespoke scents come into their own
                        because, without them, we would all be hunting for a handful of perfumes to
                        change between the rainy and sunny days. But there is no need to open all
                        those tabs on your laptop. All you need is creating your own scent with EPC.
                        Let us show you how…
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
                                Spring Scent 101
                            </CustomizeTypographyBlog>
                            <CustomizeTypographyBlog>
                                When blending or creating bespoke perfumes, we should keep a few
                                rules of the season in mind. Firstly, let’s face it, it’s not summer
                                yet. So however you like your scent, ensure you keep a base of
                                heavier, wintery notes. This rich foundation will ensure sensuality
                                and provide a contrast to whatever lighter notes you prefer.
                                <br />
                                <br />
                                When it comes to the heart and top notes, it’s really a matter of
                                preference. Some of us love the sparkle of citrus, and nothing but
                                bergamot will do. On the other hand, there are a lot of floral
                                lovers out there who have waited all winter for spring to blossom.
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
                                    {blog.blogTitle}
                                </CustomizeTypographyBlog>
                                {blog.blogContent?.map((text, index) => (
                                    <CustomizeTypographyBlog
                                        key={index}
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
                            [mobileScreen]: {
                                width: '85%',
                            },
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
    ),
});
