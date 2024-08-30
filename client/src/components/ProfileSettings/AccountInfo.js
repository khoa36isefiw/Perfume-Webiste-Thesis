import { Box, Grid } from '@mui/material';
import React from 'react';
import {
    CustomizeAccountText,
    CustomizeTypography,
} from '../CustomizeTypography/CustomizeTypography';
import { TextFieldLogin } from '../TextFieldCustomize/TextFieldCustomize';
import { theme } from '../../Theme/Theme';

function AccountInfo() {
    return (
        <Grid container spacing={2}>
            <Grid lg={12}>
                <CustomizeAccountText variant="h6" sx={{ mb: 2 }}>
                    Account Information
                </CustomizeAccountText>
            </Grid>
            <Grid container item spacing={2} sx={{ mb: 4 }}>
                <Grid item md={4} lg={4}>
                    <CustomizeAccountText
                        sx={{ fontWeight: 'bold', color: theme.palette.text.secondary }}
                    >
                        Email
                    </CustomizeAccountText>
                    <CustomizeAccountText
                        sx={{ fontSize: '14px', color: theme.palette.text.subText }}
                    >
                        Enter your email address
                    </CustomizeAccountText>
                </Grid>
                <Grid item md={8} lg={8}>
                    <TextFieldLogin fullWidth placeholder="hisalim.ux@gmail.com" />
                </Grid>
            </Grid>

            <Grid container item spacing={2} sx={{ mb: 4 }}>
                <Grid item md={4} lg={4}>
                    <CustomizeAccountText
                        sx={{ fontWeight: 'bold', color: theme.palette.text.secondary }}
                    >
                        First Name
                    </CustomizeAccountText>
                    <CustomizeAccountText
                        sx={{ fontSize: '14px', color: theme.palette.text.subText }}
                    >
                        Enter the first part of your name
                    </CustomizeAccountText>
                </Grid>
                <Grid item md={8} lg={8}>
                    <TextFieldLogin fullWidth placeholder="Muhammad" />
                </Grid>
            </Grid>

            <Grid container item spacing={2} sx={{ mb: 4 }}>
                <Grid item md={4} lg={4}>
                    <CustomizeAccountText
                        sx={{ fontWeight: 'bold', color: theme.palette.text.secondary }}
                    >
                        Last Name
                    </CustomizeAccountText>
                    <CustomizeAccountText
                        sx={{ fontSize: '14px', color: theme.palette.text.subText }}
                    >
                        Enter the last part of your name
                    </CustomizeAccountText>
                </Grid>
                <Grid item md={8} lg={8}>
                    <TextFieldLogin fullWidth placeholder="Salim" />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default AccountInfo;
