import { Container, Grid } from '@mui/material';
import React, { useState } from 'react';
import { CustomizeAccountText } from '../CustomizeTypography/CustomizeTypography';
import { TextFieldLogin } from '../TextFieldCustomize/TextFieldCustomize';
import { theme } from '../../Theme/Theme';
import { CustomizeHoverButton, CustomizeHoverButtonV2 } from '../CustomizeButton/CustomizeButton';
import { CustomizeDividerVertical8 } from '../CustomizeDivider/CustomizeDivider';

function AccountInfo() {
    const [editAccount, setEditAccount] = useState(true);

    const handleClickEdit = () => {
        setEditAccount(false);
    };

    const handleClickSave = () => {
        setEditAccount(true);
    };

    return (
        <Container>
            <Grid item lg={12}>
                <CustomizeAccountText
                    variant="h6"
                    sx={{
                        fontSize: '18px',
                        mb: 2,
                        color: theme.palette.text.secondary,
                        fontWeight: 'bold',
                    }}
                >
                    Account Information
                </CustomizeAccountText>
            </Grid>
            <Grid item lg={12}>
                <CustomizeAccountText variant="h6" sx={{ mb: 2 }}>
                    Your profile is a record of your information that defines who you are.
                </CustomizeAccountText>
            </Grid>
            <CustomizeDividerVertical8 />
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
                    <TextFieldLogin
                        disabled={editAccount}
                        fullWidth
                        placeholder="hisalim.ux@gmail.com"
                    />
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
                    <TextFieldLogin disabled={editAccount} fullWidth placeholder="Muhammad" />
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
                    <TextFieldLogin disabled={editAccount} fullWidth placeholder="Salim" />
                </Grid>
            </Grid>
            {editAccount ? (
                <CustomizeHoverButtonV2 textAction={'Edit'} onHandleClick={handleClickEdit} />
            ) : (
                <CustomizeHoverButton textAction={'Save'} onHandleClick={handleClickSave} />
            )}
        </Container>
    );
}

export default AccountInfo;
