import { Container, Grid, Box } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { listServices } from './listServicesData';
import { theme } from '../../Theme/Theme';

function ListServices() {
    return (
        <Container sx={{ my: theme.spacingAxis.boxVerticalAxis }}>
            <>
                <Grid container spacing={4}>
                    {listServices.map((service, index) => (
                        <Grid
                            container
                            spacing={4}
                            sx={{ mt: 4 }}
                            flexDirection={index % 2 === 0 ? 'row-reverse' : 'row'}
                        >
                            <Grid item xs={12} sm={6} md={4} lg={5} key={index}>
                                <Box
                                    sx={{
                                        p: 2,
                                        // background: theme.palette.bestSelling,
                                        borderRadius: 2,
                                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                        height: '100%',
                                    }}
                                >
                                    <CustomizeTypography
                                        sx={{
                                            fontSize: '46px',
                                            fontWeight: 'bold',
                                            mb: 2,
                                            color: theme.palette.secondaryText,
                                        }}
                                    >
                                        0{index + 1}.
                                    </CustomizeTypography>
                                    <CustomizeTypography
                                        sx={{ fontSize: '32px', fontWeight: 'bold', mb: 8 }}
                                    >
                                        {service.serviceTitle}
                                    </CustomizeTypography>
                                    <CustomizeTypography
                                        sx={{
                                            textAlign: 'justify',
                                            fontSize: '16px',
                                        }}
                                    >
                                        {service.serviceContent}
                                    </CustomizeTypography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={7} key={index}>
                                <Box
                                    component={'img'}
                                    src={service.serviceImage}
                                    sx={{ width: '100%' }}
                                />
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </>
        </Container>
    );
}

export default ListServices;

// serviceTitle
// serviceImage
// serviceContent
