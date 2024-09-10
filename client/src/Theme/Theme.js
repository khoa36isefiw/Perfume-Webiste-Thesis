import { createTheme } from '@mui/material';

export const theme = createTheme({
    // define colors
    palette: {
        text: {
            main: '#AB572D',
            primary: '#e38454',
            secondary: '#fe9727',
            subText: '#d9d9d9',
            verified: '#52b858',
        },

        background: {
            main: '#3D3D3D',
            primary: '#858585',
            secondary: '#AB572D',
            thirth: '#fe9727',
            fourth: '#d5d5d5',
            fiveth: '#ededed',
        },
        primaryText: '#fff',
        secondaryText: '#AB572D',
        thirth: {
            main: '#d57748',
        },
        notification: {
            successBg: '#E4F5E2',
            successIcon: '#39BF2D',
            successBorder: '#18920D',
            errorBg: '#F7E4E4',
            errorIcon: '#EC0C0C',
            warningBg: '#F5EDDA',
            warningBorder: '#D6B464',
            warningIcon: '#FAAD14',
            inforBg: '#E9EBF5',

            inforBorder: '#8BADF0',
            inforIcon: '#4F78E8',
        },
        // just color
        orderHistory: {
            total: {
                icon: '#4F46E5',
                bg: '#EEF2FF',
            },
            deliveried: {
                icon: '#059669',
                bg: '#ECFDF5',
            },
            pending: {
                icon: '#D97706',
                bg: '#FFFBEB',
            },
            cancel: {
                icon: '#DC2626',
                bg: '#FEF2F2',
            },
        },
        flashSale: {
            bg: '#ffe97a',
            icon: '#f45930',
        },

        bestSelling: '#3D3D3D',
        bestSelling2: '#858585',
        // : '#858585',
    },
    spacingAxis: {
        boxVerticalAxis: 8,
        boxVerticalAxis16: 16,
    },

    icon: {
        color: {
            main: '#AB572D',
            primary: '#e38454',
            secondary: '#fe9727',
        },
        size: {
            desktop: 24,
            mobile: 16,
        },
    },
    // breakpoints for responsive
    breakpoints: {
        values: {
            xs: 0, // Extra small devices (phones, 600px and down)
            sm: 739, // 600 or 739 - Small devices (portrait tablets and large phones, 600px and up)
            md: 740, // Medium devices (landscape tablets, 768px and up) --> tablet
            lg: 1023, // Large devices (laptops/desktops, 1024px and up) --> ipad pro
            xl: 1025, // Extra large devices (large laptops and desktops, 1025px and up)
        },
    },
    fontSize: {
        mobile: {
            heading: 28,
            text: 18,
            normal: 16,
            text14: 14,
            text12: 12,
        },
        tablet: { heading: 32, text: 18, normal: 16 },
        ipadPro: { heading: 36, text: 18, normal: 16 },
    },
});

export const mobileScreen = `@media only screen and (max-width: ${theme.breakpoints.values.sm}px)`;

export const tabletScreen = `@media only screen and (min-width: ${theme.breakpoints.values.md}px) and (max-width: ${theme.breakpoints.values.lg}px)`;

// put this size in the first when make responsive
export const ipadProScreen = `@media only screen and (max-width: ${
    theme.breakpoints.values.xl - 1
}px)`;
export const desktopScreen = `@media only screen and (min-width: ${
    theme.breakpoints.values.xl - 1
}px)`;
