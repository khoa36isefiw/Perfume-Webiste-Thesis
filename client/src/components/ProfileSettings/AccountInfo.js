import { Avatar, Container, Grid, Tooltip, IconButton } from '@mui/material';
import React, { useState, useRef } from 'react';
import {
    CustomizeAccountText,
    CustomizeTypography,
} from '../CustomizeTypography/CustomizeTypography';
import { TextFieldLogin } from '../TextFieldCustomize/TextFieldCustomize';
import { mobileScreen, theme } from '../../Theme/Theme';
import { CustomizeHoverButton, CustomizeHoverButtonV2 } from '../CustomizeButton/CustomizeButton';
import { CustomizeDividerVertical8 } from '../CustomizeDivider/CustomizeDivider';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import { useDispatch, useSelector } from 'react-redux';
import { userAPI } from '../../api/userAPI'; //???

function AccountInfo() {
    const dispatch = useDispatch();
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const [editAccount, setEditAccount] = useState(true);
    const [selectedImage, setSelectedImage] = useState(userData?.imagePath);
    const loggedInAccount = useSelector((state) => state.accountManagement.loggedInAccount);

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);

    const handleClickEdit = () => {
        setEditAccount(false);
    };

    const handleSaveInformation = async () => {
        const firstName = firstNameRef.current.value.trim();
        const lastName = lastNameRef.current.value.trim();

        const data = {
            ...userData,
            firstName,
            lastName,
            imagePath: selectedImage,
        };
        window.localStorage.setItem('user_data', JSON.stringify(data));
        const updateUserInfor = await userAPI.updateUserProfile(userData.userId, data);

        console.log('updateUserInfor: ', updateUserInfor);

        setEditAccount(true);

        // if (loggedInAccount) {
        //     dispatch(
        //         updateAccountInformation({
        //             email: loggedInAccount.email, // Sử dụng email của tài khoản đã đăng nhập để xác định tài khoản cần cập nhật
        //             firstName,
        //             lastName,
        //             userImage: selectedImage,
        //         }),
        //     );
        //     setEditAccount(true);
        // }
    };

    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    console.log('current account information: ', loggedInAccount);

    return (
        <Container
            sx={{
                [mobileScreen]: {
                    padding: 0,
                },
            }}
        >
            <Grid item xs={12} md={12} lg={12}>
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
            <Grid item xs={12} md={12} lg={12}>
                <CustomizeAccountText variant="h6" sx={{ mb: 2 }}>
                    Your profile is a record of your information that defines who you are.
                </CustomizeAccountText>
            </Grid>
            <CustomizeDividerVertical8 />
            {/* Photo */}
            <Grid container item xs={12} spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} md={12} lg={12}>
                    <CustomizeAccountText variant="h6" sx={{ mb: 2 }}>
                        Show your styles to everyone
                    </CustomizeAccountText>
                </Grid>
                <Grid item xs={12} md={12} lg={4}>
                    <Avatar
                        alt="User Image"
                        src={selectedImage || userData?.imagePath}
                        sx={{
                            height: '250px',
                            width: '250px',
                            borderRadius: 0,
                            objectFit: 'cover',
                            [mobileScreen]: {
                                width: '100%',
                            },
                        }}
                    />

                    {!editAccount && (
                        <label>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleUploadImage}
                            />
                            <Tooltip
                                title={
                                    <CustomizeTypography sx={{ fontSize: '13px', mb: 0 }}>
                                        Upload Photo
                                    </CustomizeTypography>
                                }
                                placement="top"
                                arrow
                                sx={{
                                    '& .MuiTooltip-tooltip': {
                                        fontSize: '14px',
                                    },
                                    '& .MuiTooltip-popper': {
                                        fontSize: '14px',
                                    },
                                }}
                            >
                                <IconButton component="span">
                                    <CameraEnhanceIcon sx={{ fontSize: '24px' }} />
                                </IconButton>
                            </Tooltip>
                        </label>
                    )}
                </Grid>
            </Grid>
            <Grid container item spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} md={12} lg={4}>
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
                <Grid item xs={12} md={12} lg={8}>
                    <TextFieldLogin
                        disabled={true}
                        fullWidth
                        placeholder="hisalim.ux@gmail.com"
                        inputValue={userData?.email} // just show
                    />
                </Grid>
            </Grid>

            <Grid container item spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} md={12} lg={4}>
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
                <Grid item xs={12} md={12} lg={8}>
                    <TextFieldLogin
                        disabled={editAccount}
                        fullWidth
                        placeholder="Muhammad"
                        defaultValue={userData?.firstName}
                        inputRef={firstNameRef}
                    />
                </Grid>
            </Grid>

            <Grid container item spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} md={12} lg={4}>
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
                <Grid item xs={12} md={12} lg={8}>
                    <TextFieldLogin
                        disabled={editAccount}
                        fullWidth
                        placeholder="Salim"
                        // use default value to get value of ref input
                        defaultValue={userData?.lastName}
                        inputRef={lastNameRef}
                    />
                </Grid>
            </Grid>
            {editAccount ? (
                <CustomizeHoverButtonV2 textAction={'Edit'} onHandleClick={handleClickEdit} />
            ) : (
                <CustomizeHoverButton textAction={'Save'} onHandleClick={handleSaveInformation} />
            )}
        </Container>
    );
}

export default AccountInfo;
