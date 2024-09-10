import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { mobileScreen, theme } from '../../Theme/Theme';

function CustomizeTitle({ heading }) {
    return (
        <CustomizeTypography
            sx={{
                fontSize: '46px',
                fontWeight: 'bold',
                color: theme.palette.secondaryText,
                textAlign: 'center',
                mb: 4,
                [mobileScreen]: {
                    fontSize: theme.fontSize.mobile.heading,
                    textAlign: 'center',
                    mb: 0,
                },
            }}
        >
            {heading}
        </CustomizeTypography>
    );
}

export default CustomizeTitle;
