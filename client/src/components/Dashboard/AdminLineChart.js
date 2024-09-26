import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { AdminTypography } from '../CustomizeTypography/CustomizeTypography';
import { Box } from '@mui/material';
import { theme } from '../../Theme/Theme';

const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; // Days of the week

export default function TopSales() {
    return (
        <Box sx={{ p: 1 }}>
            <AdminTypography
                sx={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: theme.palette.admin.primaryColor,
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
                    width={800}
                    height={500}
                    series={[{ data: pData, label: 'Total Sales', id: 'pvId' }]}
                    xAxis={[{ data: xLabels, scaleType: 'band' }]}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
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
