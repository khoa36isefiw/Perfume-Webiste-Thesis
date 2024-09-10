import { Box } from '@mui/material';
import React from 'react';
import bg from '../../assets/images/about_us-bg2.png';
import { mobileScreen } from '../../Theme/Theme';

function AboutUsBackground() {
    return (
        <Box
            component={'img'}
            src={bg}
            alt="About Us Image"
            sx={{
                height: '600px',
                [mobileScreen]: {
                    width: '100%',
                    objectFit: 'cover',
                },
            }}
        />
    );
}

export default AboutUsBackground;
