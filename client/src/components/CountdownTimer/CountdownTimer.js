import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';

export const CountdownTimer = () => {
    const [time, setTime] = useState(300);
    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    return 0;
                } else {
                    return prevTime - 1;
                }
            });
        }, 1000);

        // clear interval when component unmounts
        return () => clearInterval(timer);
    }, []);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ height: '30px', width: '30px', bgcolor: '#000', borderRadius: 1, mx: 1 }}>
                <CustomizeTypography
                    sx={{ fontSize: '20px', fontWeight: 'bold', mb: 0, textAlign: 'center' }}
                >
                    00
                </CustomizeTypography>
            </Box>
            <Box
                sx={{
                    height: '30px',
                    width: '30px',
                    bgcolor: '#000',
                    borderRadius: 1,
                    mr: 1,
                }}
            >
                <CustomizeTypography
                    sx={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}
                >
                    {`${Math.floor(time / 60)}`.padStart(2, 0)}
                </CustomizeTypography>
            </Box>
            <Box sx={{ height: '30px', width: '30px', bgcolor: '#000', borderRadius: 1, mr: 1 }}>
                <CustomizeTypography
                    sx={{ fontSize: '20px', fontWeight: 'bold', mb: 0, textAlign: 'center' }}
                >
                    {`${time % 60}`.padStart(2, 0)}
                </CustomizeTypography>
            </Box>
        </Box>
    );
};
