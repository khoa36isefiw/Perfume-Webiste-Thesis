import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';

function CustomizeTitle({ heading }) {
    return (
        <CustomizeTypography
            sx={{
                fontSize: '46px',
                fontWeight: 'bold',
                color: theme.palette.secondaryText,
                textAlign: 'center',
                mb: 4,
            }}
        >
            {heading}
        </CustomizeTypography>
    );
}

export default CustomizeTitle;
