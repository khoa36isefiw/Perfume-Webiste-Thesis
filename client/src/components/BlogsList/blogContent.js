import React from 'react';
import { Box, Container, IconButton, Typography } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

export const blogContent = {
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
                <Box>
                    <Box
                        component="img"
                        src="https://cdn.experimentalperfumeclub.com/wp-content/uploads/2023/12/Untitled-design-39.png"
                        alt="Blog Image"
                        sx={{
                            borderRadius: 0,
                            height: '450px',
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
                            width: '600px',
                            // textAlign: 'center',
                        }}
                    >
                        Why doesn’t my perfume last long enough?
                    </Typography>
                </Box>
            </Box>

            <Container sx={{ padding: '0 16px', mt: 4, maxWidth: '750px' }}>
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
            </Container>

            <Box
                sx={{
                    height: '650px',
                    width: '100%',
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
                        height: '650px',
                        width: '80%',
                        objectFit: 'cover',
                        margin: '24px 0',
                    }}
                />
                <Typography
                    sx={{
                        fontSize: '26px',
                        color: '#fff',
                        fontStyle: 'italic',
                        fontFamily: 'Courier, sans-serif',
                        width: '80%',
                        textAlign: 'center',
                    }}
                >
                    1. Olfactory fatigue: Your brain is getting “blind” to your own scent.
                </Typography>
            </Box>
        </Box>
    ),
};
