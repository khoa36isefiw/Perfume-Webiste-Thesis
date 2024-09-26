import { Typography, styled, Box } from '@mui/material';
import { mobileScreen, theme } from '../../Theme/Theme';

export const CustomizeTypography = styled(Typography)(({ fontSize, fontBold = false, color }) => ({
    fontSize: fontSize || '16px',
    fontWeight: fontBold ? 'bold' : 'normal',
    color: color ? color : 'white',
    // marginBottom: 16,
    marginBottom: '8px',
}));

export const AdminTypography = styled(Typography)(({ fontSize, fontBold = false, color }) => ({
    fontSize: fontSize || '14px',
    fontWeight: fontBold ? 'bold' : 'normal',
    color: color ? color : 'black',
}));

export const AdminHeadingTypography = styled(Typography)(({ fontBold = false, color }) => ({
    fontSize: '32px',
    fontWeight: 'bold',
    color: theme.palette.admin.primaryColor,
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
                sx={{
                    color: theme.palette.text.primary,
                    width: '200px',
                    fontWeight: 'bold',
                    [mobileScreen]: {
                        width: '150px',
                    },
                }}
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

export const CustomizeTypographyBlog = styled(Typography)(({ fontBold = false, color }) => ({
    textAlign: 'justify',
    // fontFamily: 'Courier, sans-serif',
    fontSize: '18px',
    fontWeight: fontBold ? 'bold' : 'normal',
    color: color ? color : 'white',
}));
