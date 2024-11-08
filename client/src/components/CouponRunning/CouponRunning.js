import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { backTop } from '../goBackTop/goBackTop';
import { blue } from '@mui/material/colors';

const scrollAnimation = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

function CouponRunning() {
    const navigate = useNavigate();
    const handleNavCoupon = () => {
        navigate('/coupon');
        backTop();
    };

    return (
        <Box
            sx={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                width: '100%',
                bgcolor: 'primary.light',
                py: 1,
                position: 'relative',
                bgcolor: '#ccc',
                // pauses animation on hover
                '&:hover .scrollText': {
                    animationPlayState: 'paused',
                },
            }}
        >
            <Typography
                component="div"
                className="scrollText"
                sx={{
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    animation: `${scrollAnimation} 15s linear infinite`,
                    fontSize: '1.2em',
                    fontWeight: 'bold',
                    color: '#000',
                    animationPlayState: 'running',
                }}
            >
                🎉 Tomtoc promotions code 🎉 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 🎉 Get more discount
                from here 🎉 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 🎉{' '}
                <Link
                    onClick={handleNavCoupon}
                    sx={{
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        color: blue[500],
                    }}
                >
                    Click me to know more promotions information
                </Link>{' '}
                🎉
            </Typography>
        </Box>
    );
}

export default CouponRunning;
