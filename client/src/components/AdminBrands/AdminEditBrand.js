import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { useLocation, useNavigate } from 'react-router-dom';

import { brandApi } from '../../api/brandApi';
import { useSnackbarMessage } from '../../hooks/useSnackbarMessage';
import { AdminInputStyles } from '../AdminInputStyles/AdminInputStyles';

function AdminEditBrand() {
    const location = useLocation();
    const { brand } = location.state || [];
    const { showNotificationMessage } = useSnackbarMessage(); // multiple notification
    const [name, setName] = React.useState({
        value: brand?.nameEn || '',
        message: '',
    });

    const [description, setDescription] = React.useState({
        value: brand?.descriptionEN || '',
        message: '',
    });

    const navigate = useNavigate();

    const validateName = () => {
        if (name.value.trim() === '') {
            setName({
                ...name,
                message: 'Vui lòng nhập category name',
            });
        }
        setName({ ...name, message: '' });
    };

    const validateDescription = () => {
        if (description.value.trim() === '') {
            setDescription({
                ...description,
                message: 'Vui lòng nhập description',
            });
        }
        setDescription({ ...description, message: '' });
    };

    const checkError = () => {
        if (name.message !== '' || description.message !== '') {
            return true;
        }
        return false;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!checkError()) {
            const brandId = brand?._id;
            const updateData = {
                nameEn: name.value,
                nameVn: name.value,
                descriptionEN: description.value,
            };
            const updateBrandResponse = await brandApi.updateBrand(brandId, updateData);

            // call api to create new user
            if (updateBrandResponse.status === 200) {
                showNotificationMessage('success', 'Update Brand', 'Cập nhật brand mới thành công');
                setTimeout(() => {
                    navigate('/admin/manage-brands');
                }, 2800);
            } else {
                showNotificationMessage('error', 'Update Brand', 'Cập nhật Brand thất bại');
            }
        } else {
            showNotificationMessage(
                'error',
                'Update Brand',
                'Vui lòng kiểm tra các trường đã nhập',
            );
        }
    };
    const handleBack = () => {
        window.history.back(); // return the previous page
    };

    return (
        <Box sx={{ p: 3, height: '100vh' }}>
            <Button
                startIcon={<ArrowBackIosNewIcon />}
                sx={{ display: 'inline-flex', padding: '10px 30px 10px 0px', mb: '16px' }}
                onClick={handleBack}
            >
                Back
            </Button>
            <Typography sx={{ fontSize: '3rem', fontWeight: 600 }}>Edit Brand</Typography>
            <Box sx={{ bgcolor: '#fff', mt: 4, px: 2, borderRadius: 2, minHeight: 200 }}>
                <form onSubmit={handleUpdate}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <AdminInputStyles
                                label="Brand Name"
                                required
                                fullWidth
                                value={name.value}
                                error={name.message ? true : false}
                                variant="outlined"
                                placeholder="Enter Brand Name"
                                onBlur={validateName}
                                onChange={(e) => setName({ ...name, value: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <AdminInputStyles
                                sx={{ width: '100%' }}
                                label="Description"
                                required
                                fullWidth
                                value={description.value}
                                error={description.message ? true : false}
                                variant="outlined"
                                placeholder="Enter Description"
                                onBlur={validateDescription}
                                onChange={(e) =>
                                    setDescription({ ...description, value: e.target.value })
                                }
                            />
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ textTransform: 'initial', fontSize: '14px', my: 4 }}
                    >
                        Update Brand
                    </Button>
                </form>
            </Box>
        </Box>
    );
}

export default AdminEditBrand;
