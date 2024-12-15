import { Avatar, Container, Grid, Tooltip, IconButton, Button, Box } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
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
import { RequirementV2 } from '../Requirement/RequirementV2';
import { useTranslation } from 'react-i18next';
import { useSnackbarMessage } from '../../hooks/useSnackbarMessage';
import useUserById from '../../api/useUserById';

function AccountInfo() {
    const [open, setOpen] = useState(false);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const addressRef = useRef(null);
    const firstNameValidation = useValidationWithRef();
    const lastNameValidation = useValidationWithRef();
    const phoneValidation = useValidationWithRef();
    const { showNotificationMessage } = useSnackbarMessage(); // multiple notification

    const { t } = useTranslation('translate');

    const userData = JSON.parse(localStorage.getItem('user_data'));
    console.log('userData: ', userData);
    const { data: userRes, mutate } = useUserById(userData?._id);
    const user = userRes?.data;
    const [editAccount, setEditAccount] = useState(true);
    const [selectedImage, setSelectedImage] = useState('');
    const [imgData, setImgData] = React.useState();
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
                    // ...userData,
                    firstName,
                    lastName,
                    phoneNumber,
                    address,
                };
                const formData = new FormData();
                Object.keys(data).forEach(
                    (key) => key !== 'imagePath' && formData.append(key, data[key]),
                );
                formData.append('imagePath', imgData);
                const updateUserInfor = await userAPI.updateUserProfile(userData._id, formData);
                if (updateUserInfor.status === 200) {
                    mutate();
                    window.localStorage.setItem(
                        'user_data',
                        JSON.stringify(updateUserInfor.data.user),
                    );
                    setEditAccount(true);
                    showNotificationMessage(
                        'success',
                        `${t('common.notifyMessage.accSetting.aT')}`,
                        `${t('common.notifyMessage.accSetting.aC1')}`,
                    );
                }
                console.log('updateUserInfor: ', updateUserInfor);
            } else {
                showNotificationMessage(
                    'warning',
                    `${t('common.notifyMessage.accSetting.aT')}`,
                    `${t('common.notifyMessage.accSetting.aC2')}`,
                );
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                }, 6000);
            }
        } else {
            showNotificationMessage(
                'warning',
                `${t('common.notifyMessage.accSetting.aT')}`,
                `${t('common.notifyMessage.accSetting.aC')}`,
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
            setImgData(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    console.log('current account information: ', loggedInAccount);

    return (
        <Container
            sx={{
                // padding: 2,
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
                    {/* Account Information */}
                    {t('common.accountSettings.accInfor.accInfor')}
                </CustomizeAccountText>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <CustomizeAccountText variant="h6" sx={{ mb: 2 }}>
                    {t('common.accountSettings.accInfor.t1')}
                </CustomizeAccountText>
            </Grid>
            <CustomizeDividerVertical8 />
            {/* Photo */}
            <Grid container item xs={12} spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} md={12} lg={12}>
                    <CustomizeAccountText variant="h6" sx={{ mb: 2 }}>
                        {t('common.accountSettings.accInfor.t2')}
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
                                            {t('common.accountSettings.accInfor.upload')}
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
                                        {t('common.accountSettings.accInfor.upload')}
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
                        {t('common.accountSettings.accInfor.e1')}
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
                        {t('common.accountSettings.accInfor.fName')}
                    </CustomizeAccountText>
                    <CustomizeAccountText
                        sx={{ fontSize: '14px', color: theme.palette.text.subText }}
                    >
                        {t('common.accountSettings.accInfor.fName1')}
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
                        {t('common.accountSettings.accInfor.lName')}
                    </CustomizeAccountText>
                    <CustomizeAccountText
                        sx={{ fontSize: '14px', color: theme.palette.text.subText }}
                    >
                        {t('common.accountSettings.accInfor.lName1')}
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
                        {t('common.accountSettings.accInfor.phone')}
                    </CustomizeAccountText>
                    <CustomizeAccountText
                        sx={{ fontSize: '14px', color: theme.palette.text.subText }}
                    >
                        {t('common.accountSettings.accInfor.phone1')}
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
                        {t('common.accountSettings.accInfor.address')}
                    </CustomizeAccountText>
                    <CustomizeAccountText
                        sx={{ fontSize: '14px', color: theme.palette.text.subText }}
                    >
                        {t('common.accountSettings.accInfor.address1')}
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
                <CustomizeHoverButtonV2
                    textAction={t('common.accountSettings.accInfor.edit')}
                    onHandleClick={handleClickEdit}
                />
            ) : (
                <CustomizeHoverButton
                    textAction={t('common.accountSettings.accInfor.save')}
                    onHandleClick={handleSaveInformation}
                />
            )}
        </Container>
    );
}

export default AccountInfo;
