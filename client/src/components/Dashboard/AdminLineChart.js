import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { AdminTypography } from '../CustomizeTypography/CustomizeTypography';
import { Box } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { theme } from '../../Theme/Theme';

const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; // Days of the week

export default function TopSales() {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check for mobile screen
    const isTablet = useMediaQuery(theme.breakpoints.down('md')); // Check for mobile screen
    const isIpadPro = useMediaQuery(theme.breakpoints.down('lg')); // Check for mobile screen

    return (
        <Box>
            <AdminTypography
                sx={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: theme.palette.admin.primaryColor,
                    textAlign: isMobile ? 'center' : 'left', // Center text for mobile
                }}
            >
                Total Sales
            </AdminTypography>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <BarChart
                    width={isMobile ? 380 : 1000} // Adjust width for mobile
                    height={isMobile ? 300 : 500} // Adjust height for mobile
                    series={[{ data: pData, label: 'Total Sales', id: 'pvId' }]}
                    xAxis={[{ data: xLabels, scaleType: 'band' }]}
                    sx={{
                        '.MuiBarElement-root': {
                            fill: '#49bc87',
                        },
                        '.MuiChartsLegend-mark': {
                            fill: '#49bc87',
                        },
                    }}
                />
            </Box>
        </Box>
    );
}
