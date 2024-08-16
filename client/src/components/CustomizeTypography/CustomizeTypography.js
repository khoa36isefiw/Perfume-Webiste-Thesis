import { Typography, styled } from '@mui/material';

export const CustomizeTypography = styled(Typography)(({ fontSize, fontBold = false }) => ({
    fontSize: fontSize || '16px',
    fontWeight: fontBold ? 'bold' : 'normal',
}));
