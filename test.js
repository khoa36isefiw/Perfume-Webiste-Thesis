<Box>
    <Box
        sx={{
            bgcolor: '#555',
            height: '650px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <Box>
            <Avatar
                src={
                    'https://cdn.experimentalperfumeclub.com/wp-content/uploads/2023/12/Untitled-design-39.png'
                }
                sx={{
                    borderRadius: 0,
                    height: '450px',
                    width: '750px',
                    objectFit: 'cover',
                    my: 3,
                }}
            />
            <CustomizeTypography
                sx={{
                    fontSize: '32px',
                    color: '#fff',
                    fontFamily: 'Orator, Courier,sans-serif',
                    width: '600px',
                }}
            >
                Why doesn’t my perfume last long enough?
            </CustomizeTypography>
        </Box>
    </Box>
    {/* qoute */}
    <Container>
        <FormatQuoteIcon
            sx={{
                fontSize: '48px',
                color: '#fff',
                transform: 'rotate(-180deg)',
                mt: 4,
                mx: 4,
            }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CustomizeTypography
                sx={{
                    fontSize: '26px',
                    fontStyle: 'italic',
                    fontFamily: 'Courier,sans-serif',
                    width: '80%',
                }}
            >
                It is one of – if not the – most asked question in perfumery. But, like all great
                questions, the answer is complicated. <br /> <br /> Here are five reasons you may
                not smell a fragrance for as long as you wish.
            </CustomizeTypography>
        </Box>
        <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                mx: 4,
            }}
        >
            <IconButton>
                <FormatQuoteIcon sx={{ fontSize: '48px', color: '#fff' }} />
            </IconButton>
        </Box>
    </Container>
    <Container
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <Box>
            <Avatar
                src={
                    'https://cdn.experimentalperfumeclub.com/wp-content/uploads/2023/12/Untitled-design-40.png'
                }
                sx={{
                    borderRadius: 0,
                    height: '450px',
                    width: '750px',
                    objectFit: 'cover',
                    my: 3,
                }}
            />
            <CustomizeTypography>
                1. Olfactory fatigue: Your brain is getting “blind” to your own scent
            </CustomizeTypography>
        </Box>
    </Container>
</Box>;
