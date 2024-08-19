import { Box } from '@mui/material';
import React from 'react';
import bg from '../../assets/images/about_us-bg.png';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';
import CustomizeTitle from '../CustomizeTitle/CustomizeTitle';

function Introduce() {
    return (
        <Box
            sx={{
                height: '600px',
                backgroundImage: `url(${bg})`,
                position: 'relative',
                width: '100%',
            }}
        >
            {/* make overlay above background image */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    // overlay modal
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    zIndex: 1,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: '50%',
                    transform: 'translate(50%,-50%)',
                    textAlign: 'center',
                    zIndex: 2,
                }}
            >
                <CustomizeTitle heading={'About Us'} />
                <CustomizeTypography sx={{ fontSize: '18px', color: '#FFFFFF' }}>
                    At Tomtoc Perfumes, we believe that perfumes are more than just scents; they are
                    expressions of one's individuality and style. Our passion for exquisite
                    fragrances led us to curate a collection that captures the essence of diverse
                    personalities, bringing you an unparalleled olfactory experience.
                </CustomizeTypography>
            </Box>
        </Box>
    );
}

export default Introduce;
