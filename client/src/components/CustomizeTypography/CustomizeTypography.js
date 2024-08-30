import { Typography, styled, Box } from '@mui/material';
import { theme } from '../../Theme/Theme';

export const CustomizeTypography = styled(Typography)(({ fontSize, fontBold = false, color }) => ({
    fontSize: fontSize || '16px',
    fontWeight: fontBold ? 'bold' : 'normal',
    color: color ? color : 'white',
    // marginBottom: 16,
    marginBottom: '8px',
}));

export const CustomizeProductDescriptionText = ({ title, text }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <CustomizeTypography
                sx={{ color: theme.palette.text.primary, width: '200px', fontWeight: 'bold' }}
            >
                {title}:
            </CustomizeTypography>
            <CustomizeTypography> {text}</CustomizeTypography>
        </Box>
    );
};

export const CustomizeListText = ({ title, text }) => {
    return (
        <CustomizeTypography>
            <strong style={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
                {title}:
            </strong>
            <span> {text}</span>
        </CustomizeTypography>
    );
};

export const CustomizeAccountText = styled(Typography)(({ fontSize, color }) => ({
    fontSize: fontSize || '16px',
    color: color ? color : 'white',
}));
