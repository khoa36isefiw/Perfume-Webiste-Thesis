import { Box } from '@mui/material';
import React from 'react';

function TicketCoupon() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ height: '200px', display: 'flex' }}>
                {/*  */}
                <Box
                    sx={{
                        height: '100%',
                        width: '100px',
                        bgcolor: 'gold',
                        borderRadius: 2,
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            height: 50,
                            width: 50,
                            top: '50%',
                            left: '0%',
                            transform: 'translate(0%, -50%)',
                            bgcolor: 'green',
                            backgroundImage:
                                'radial-gradient(circle at 0 50%,transparent 25px,gold 26px)',
                        },
                    }}
                ></Box>
                <Box
                    sx={{
                        height: '100%',
                        width: '400px',
                        bgcolor: 'gold',
                        borderRadius: 2,
                        position: 'relative',
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
                                'radial-gradient(circle at 100% 50%,transparent 25px,gold 26px)',
                        },
                    }}
                ></Box>
            </Box>
        </Box>
    );
}

export default TicketCoupon;
