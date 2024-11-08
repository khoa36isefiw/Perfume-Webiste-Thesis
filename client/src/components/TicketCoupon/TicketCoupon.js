import { Box } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';

function TicketCoupon() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 20`` }}>
            <Box sx={{ height: '200px', display: 'flex' }}>
                {/*  */}
                <Box
                    sx={{
                        height: '100%',
                        width: '140px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'gold',
                        borderRadius: 2,
                        position: 'relative',
                        borderRight: '3px dashed #ccc',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            height: 50,
                            width: 50,
                            top: '50%',
                            left: '0%',
                            transform: 'translate(0%, -50%)',
                            bgcolor: '#000',
                            backgroundImage:
                                'radial-gradient(circle at 0 50%,transparent 20px,gold 15px)',
                        },
                    }}
                >
                    <CustomizeTypography
                        sx={{
                            fontSize: '20px',
                            color: '#000',
                            fontWeight: 'bold',
                            fontFamily: 'Libre Barcode',
                            textAlign: 'center',
                            zIndex: 2,

                            mb: 2,
                        }}
                    >
                        Tomtoc
                    </CustomizeTypography>
                    <CustomizeTypography
                        sx={{
                            fontSize: '18px',
                            color: '#000',
                            textAlign: 'center',
                            zIndex: 2,
                            fontWeight: 'bold',
                            fontFamily: 'Libre Barcode',
                        }}
                    >
                        Summer
                    </CustomizeTypography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        width: '400px',
                        bgcolor: 'gold',
                        borderRadius: 2,
                        position: 'relative',
                        borderleft: '3px dashed #ccc',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            height: 50,
                            width: 50,
                            top: '50%',
                            right: '0%',
                            transform: 'translate(0%, -50%)',
                            bgcolor: 'green',
                            backgroundImage:
                                'radial-gradient(circle at 100% 50%,transparent 20px,gold 15px)',
                        },
                    }}
                >
                    {/* Discription */}
                    <CustomizeTypography
                        sx={{
                            fontSize: '20px',
                            color: '#000',
                            textAlign: 'center',
                            zIndex: 2,
                            fontFamily: 'Libre Barcode',
                        }}
                    >
                        Summer discount 10% off.
                    </CustomizeTypography>
                    {/* Code */}

                    <CustomizeTypography
                        sx={{
                            fontSize: '32px',
                            textAlign: 'center',
                            padding: '0 14px',
                            zIndex: 2,
                            color: 'gold',
                            fontFamily: 'Libre Barcode',
                            bgcolor: '#000',
                            fontWeight: 'bold',
                        }}
                    >
                        Summer2020
                    </CustomizeTypography>
                    <CustomizeTypography
                        sx={{
                            fontSize: '18px',
                            color: '#000',
                            textAlign: 'center',
                            zIndex: 2,
                            fontFamily: 'Libre Barcode',
                        }}
                    >
                        Valid until: 30/11/2024
                    </CustomizeTypography>
                </Box>
            </Box>
        </Box>
    );
}

export default TicketCoupon;
