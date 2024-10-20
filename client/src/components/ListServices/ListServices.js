import { Container, Grid, Box } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { listServices } from './listServicesData';
import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../../Theme/Theme';

function ListServices() {
    return (
        <Container
            sx={{
                my: theme.spacingAxis.boxVerticalAxis,
                [ipadProScreen]: {
                    paddingRight: 0,
                },
                [tabletScreen]: {
                    paddingRight: 0,
                },
                [mobileScreen]: {
                    paddingRight: 0,
                },
            }}
        >
            <>
                <Grid container spacing={4}>
                    {listServices.map((service) => (
                        <Grid
                            key={service.service_id}
                            container
                            spacing={4}
                            sx={{
                                mt: 4,
                                [mobileScreen]: {
                                    flexDirection: 'row',
                                },
                            }}
                            flexDirection={service.service_id % 2 === 0 ? 'row-reverse' : 'row'}
                        >
                            <Grid item xs={12} sm={6} md={5} lg={5}>
                                <Box
                                    sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                        height: '100%',
                                        [ipadProScreen]: {
                                            paddingTop: 4,
                                            paddingBottom: 4,
                                            paddingLeft: 4,
                                        },
                                        [mobileScreen]: {
                                            paddingTop: 4,
                                            paddingBottom: 4,
                                            paddingLeft: 4,
                                        },
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
                                        0{service.service_id}.
                                    </CustomizeTypography>
                                    <CustomizeTypography
                                        sx={{ fontSize: '32px', fontWeight: 'bold', mb: 6 }}
                                    >
                                        {service.serviceTitle}
                                    </CustomizeTypography>
                                    <CustomizeTypography
                                        sx={{
                                            textAlign: 'justify',
                                        }}
                                    >
                                        {service.serviceContent}
                                    </CustomizeTypography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={7} lg={7}>
                                <Box
                                    component={'img'}
                                    src={service.serviceImage}
                                    sx={{
                                        width: '100%',
                                        objectFit: 'cover',
                                        [tabletScreen]: {
                                            height: '500px',
                                        },
                                    }}
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
