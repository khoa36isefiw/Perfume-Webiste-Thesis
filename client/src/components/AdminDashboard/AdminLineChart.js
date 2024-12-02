import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { AdminTypography } from '../CustomizeTypography/CustomizeTypography';
import { Box } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { theme } from '../../Theme/Theme';
import useRevenue from '../../api/useRevenue';
import useLoadingV2 from '../../hooks/useLoadingV2';

export default function TopSales() {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check for mobile screen
    const { data: revenue, isLoading } = useRevenue(2024); // only call for 2024
    const { LoadingAPI } = useLoadingV2();
    console.log('revenue: ', revenue?.data);
    // list data of each months
    // array of month
    const monthNames = [
        'January', // 0
        'February', // 1
        'March', //2
        'April', // 3
        'May', //4
        'June', //5
        'July', //6
        'August', //7
        'September', //8
        'October', // 9
        'November', // 10
        'December', // 11
    ];
    // map months to their names
    const pTotalRevenueData = revenue?.data.revenueByMonth.map(
        (item) => monthNames[item.month - 1],
    );
    // list of months in one year
    const xLabels = revenue?.data.revenueByMonth.map((item) => item.totalRevenue); // an array

    if (isLoading) {
        return <LoadingAPI />;
    }

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
                    width={isMobile ? 380 : 900} // Adjust width for mobile
                    height={isMobile ? 300 : 500} // Adjust height for mobile
                    series={[{ data: xLabels, label: 'Total Sales in 2024', id: 'pvId' }]}
                    xAxis={[{ data: pTotalRevenueData, scaleType: 'band' }]}
                    sx={{
                        '.MuiBarElement-root': {
                            fill: '#64b3f6',
                        },
                        '.MuiChartsLegend-mark': {
                            fill: '#64b3f6',
                        },
                    }}
                />
            </Box>
        </Box>
    );
}
