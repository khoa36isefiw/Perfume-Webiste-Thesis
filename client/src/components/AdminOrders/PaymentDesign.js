import { Box, Typography } from '@mui/material';

export const CODPayment = () => {
    return (
        <Box
            sx={{
                bgcolor: '#bdf5d3',

                borderRadius: 2,
                boxShadow: 1,
                padding: '4px 0',
            }}
        >
            <Typography
                sx={{
                    fontSize: '14px',
                    color: '#187d44',
                    fontWeight: 'bold',
                    textAlign: 'center',
                }}
            >
                COD
            </Typography>
        </Box>
    );
};

export const PaypalPayment = () => {
    return (
        <Box
            sx={{
                bgcolor: '#c1e1fc',
                borderRadius: 2,
                boxShadow: 1,
                padding: '4px 0',
            }}
        >
            <Typography
                sx={{
                    fontSize: '14px',
                    color: '#2262d3',
                    fontWeight: 'bold',
                    textAlign: 'center',
                }}
            >
                Paypal
            </Typography>
        </Box>
    );
};

export const VNPayPayment = () => {
    return (
        <Box
            sx={{
                bgcolor: '#f5f5f5',
                borderRadius: 2,
                boxShadow: 1,
                padding: '4px 8px',
            }}
        >
            <Typography
                sx={{
                    fontSize: '13px',
                    color: '#005baa',
                    fontWeight: 'bold',
                    textAlign: 'center',
                }}
            >
                <span
                    style={{
                        color: '#8c131a',
                    }}
                >
                    VN
                </span>
                PAY
            </Typography>
        </Box>
    );
};
