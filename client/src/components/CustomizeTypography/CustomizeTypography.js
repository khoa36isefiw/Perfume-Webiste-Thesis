import { Typography, styled } from '@mui/material';

export const CustomizeTypography = styled(Typography)(({ fontSize, fontBold = false, color }) => ({
    fontSize: fontSize || '14px',
    fontWeight: fontBold ? 'bold' : 'normal',
    color: color ? color : 'white',
}));
