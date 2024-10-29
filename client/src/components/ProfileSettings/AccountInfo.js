import { Avatar, Container, Grid, Tooltip, IconButton, Button, Box } from '@mui/material';
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
import { userAPI } from '../../api/userAPI';
import useValidationWithRef from '../../hooks/useValidationWithRef';
import useShowNotificationMessage from '../../hooks/useShowNotificationMessage';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { RequirementV2 } from '../Requirement/RequirementV2';

function AccountInfo() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const addressRef = useRef(null);
    const firstNameValidation = useValidationWithRef();
    const lastNameValidation = useValidationWithRef();
    const phoneValidation = useValidationWithRef();

    const {
        showNotification,
        showAnimation,
        messageType,
        messageTitle,
        messageContent,
        showMessage,
        handleCloseNotification,
    } = useShowNotificationMessage();

    const userData = JSON.parse(localStorage.getItem('user_data'));
    const [editAccount, setEditAccount] = useState(true);
    const [selectedImage, setSelectedImage] = useState(userData?.imagePath);
    const loggedInAccount = useSelector((state) => state.accountManagement.loggedInAccount);

    const handleClickEdit = () => {
        setEditAccount(false);
    };

    const handleSaveInformation = async () => {
        const firstName = firstNameRef.current.value.trim();
        const lastName = lastNameRef.current.value.trim();
        const phoneNumber = phoneNumberRef.current.value.trim();
        const address = addressRef.current.value.trim();

        const isValidFirstName = firstNameValidation.validateName(firstName);
        const isValidLastName = lastNameValidation.validateName(lastName);
        const isValidPhoneNumber = phoneValidation.validatePhoneNumber(phoneNumber);

        if (firstName && lastName && phoneNumber && address) {
            if (isValidFirstName && isValidLastName && isValidPhoneNumber) {
                const data = {
                    ...userData,
                    firstName,
                    lastName,
                    imagePath: selectedImage,
                    phoneNumber,
                    address,
                };
                const updateUserInfor = await userAPI.updateUserProfile(userData.userId, data);
                if (updateUserInfor.status === 200) {
                    window.localStorage.setItem('user_data', JSON.stringify(data));
                    setEditAccount(true);
                    showMessage(
                        'success',
                        'Account Information',
                        'You have successfully updated your account information!',
                    );
                }
                console.log('updateUserInfor: ', updateUserInfor);
            } else {
                showMessage('warning', 'Account Information', 'Please fill information correctly!');
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                }, 6000);
            }
        } else {
            showMessage(
                'warning',
                'Account Information',
                'Please fill information before changing',
            );
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
            }, 6000);
        }
    };

    const fileInputRef = useRef();
    const handleUploadImage = (e) => {
        const file = e.target?.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
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
                        <React.Fragment>
                            <label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    ref={fileInputRef}
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
                                    <Button
                                        sx={{
                                            textTransform: 'initial',
                                            fontSize: '14px',
                                            color: '#fff',
                                        }}
                                        startIcon={
                                            <CameraEnhanceIcon
                                                sx={{
                                                    fontSize: '24px',
                                                    color: '#fff',
                                                }}
                                            />
                                        }
                                        onClick={handleButtonClick}
                                    >
                                        Upload Photo
                                    </Button>
                                </Tooltip>
                            </label>
                            <RequirementV2
                                onHandleOpen={() => setOpen(true)}
                                open={open}
                                onHandleClose={() => setOpen(false)}
                            />
                        </React.Fragment>
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

            <Grid container item spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} md={12} lg={4}>
                    <CustomizeAccountText
                        sx={{ fontWeight: 'bold', color: theme.palette.text.secondary }}
                    >
                        Phone Number
                    </CustomizeAccountText>
                    <CustomizeAccountText
                        sx={{ fontSize: '14px', color: theme.palette.text.subText }}
                    >
                        Enter your phone number
                    </CustomizeAccountText>
                </Grid>
                <Grid item xs={12} md={12} lg={8}>
                    <TextFieldLogin
                        disabled={editAccount}
                        fullWidth
                        placeholder="0986969869"
                        // use default value to get value of ref input
                        defaultValue={userData?.phoneNumber}
                        inputRef={phoneNumberRef}
                    />
                </Grid>
            </Grid>
            <Grid container item spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} md={12} lg={4}>
                    <CustomizeAccountText
                        sx={{ fontWeight: 'bold', color: theme.palette.text.secondary }}
                    >
                        Address
                    </CustomizeAccountText>
                    <CustomizeAccountText
                        sx={{ fontSize: '14px', color: theme.palette.text.subText }}
                    >
                        Enter your address
                    </CustomizeAccountText>
                </Grid>
                <Grid item xs={12} md={12} lg={8}>
                    <TextFieldLogin
                        disabled={editAccount}
                        fullWidth
                        placeholder="Số 1 Võ Văn Ngân, Thành phố Thủ Đức"
                        // use default value to get value of ref input
                        defaultValue={userData?.address}
                        inputRef={addressRef}
                    />
                </Grid>
            </Grid>
            {editAccount ? (
                <CustomizeHoverButtonV2 textAction={'Edit'} onHandleClick={handleClickEdit} />
            ) : (
                <CustomizeHoverButton textAction={'Save'} onHandleClick={handleSaveInformation} />
            )}
            {showNotification && (
                <Box
                    sx={{ position: 'fixed', top: '5%', right: '1%', zIndex: 9999999 }}
                    className={`animate__animated ${showAnimation}`}
                >
                    <NotificationMessage
                        msgType={messageType}
                        msgTitle={messageTitle}
                        msgContent={messageContent}
                        autoHideDuration={3000} // Auto-hide after 5 seconds
                        onClose={handleCloseNotification}
                    />
                </Box>
            )}
        </Container>
    );
}

export default AccountInfo;
