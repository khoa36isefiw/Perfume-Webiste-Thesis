import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { Box, Container, Grid, IconButton } from '@mui/material';
import { theme } from '../../Theme/Theme';
import { missionsData } from './missionsData';

function Missions() {
    return (
        <Container sx={{ my: theme.spacingAxis.boxVerticalAxis }}>
            <Box sx={{ textAlign: 'center' }}>
                <CustomizeTypography sx={{ fontSize: '18px' }}>
                    Our mission is to empower individuals with knowledge and facilitate meaningful
                    connections through our platform.
                </CustomizeTypography>
                <CustomizeTypography sx={{ fontSize: '18px' }}>
                    We understand the importance of reliable and up-to-date information in today's
                    fast-paced world.
                </CustomizeTypography>
            </Box>
            <Grid container spacing={4} sx={{ mt: 4 }}>
                {missionsData.map((mission, index) => (
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
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: 2,
                                }}
                            >
                                <CustomizeTypography
                                    sx={{
                                        fontSize: '28px',
                                        fontWeight: 'bold',

                                        color: theme.palette.secondaryText,
                                    }}
                                >
                                    {mission.missionTitle}
                                </CustomizeTypography>
                                <IconButton>{mission.missionIcon}</IconButton>
                            </Box>
                            <CustomizeTypography
                                sx={{
                                    textAlign: 'justify',
                                    fontSize: '16px',
                                }}
                            >
                                {mission.missionContent}
                            </CustomizeTypography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Missions;
