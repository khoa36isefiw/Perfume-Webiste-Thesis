import { Box } from '@mui/material';
import React from 'react';
import bg from '../../assets/images/about_us-bg2.png';

function AboutUsBackground() {
    return <Box component={'img'} src={bg} alt="About Us Image" sx={{ height: '600px' }} />;
}

export default AboutUsBackground;
