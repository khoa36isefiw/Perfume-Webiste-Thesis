import { Avatar, Box, Container, Divider, Rating } from '@mui/material';
import React from 'react';
import { theme } from '../../Theme/Theme';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import CustomizeDivider from '../CustomizeDivider/CustomizeDivider';

function Comments() {
    return (
        <Container sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex' }}>
                {/* user image */}
                <Avatar
                    alt="user image"
                    src={'https://letdiv.com/wp-content/uploads/2024/04/khoa-hoc-react-native.jpg'}
                />
                {/* name */}
                <Box sx={{ ml: 2 }}>
                    <CustomizeTypography sx={{ fontSize: '14px' }}>Shiina</CustomizeTypography>
                    {/* stars, rating */}
                    <Rating
                        value={5}
                        // MuiRating-root MuiRating-sizeMedium css-1qqgbpl-MuiRating-root
                        sx={{
                            fontSize: '18px',
                            // change border color
                            '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
                                color: theme.palette.thirth.main,
                            },
                            mb: 1,
                        }}
                    />
                    <CustomizeTypography sx={{ fontSize: '14px', color: '#d9d9d9' }}>
                        2024-07-31 11:11
                    </CustomizeTypography>
                    {/* content */}
                    <CustomizeTypography>
                        Hàng giá rẻ nên không đòi hỏi j nhiều, shop cb hàng nhanh
                    </CustomizeTypography>
                </Box>
            </Box>
            <Divider sx={{ bgcolor: '#fff', my: 1 }} />;
        </Container>
    );
}

export default Comments;
