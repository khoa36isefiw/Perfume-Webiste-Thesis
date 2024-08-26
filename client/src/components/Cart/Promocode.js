import { Box, Button } from '@mui/material';
import React from 'react';
import { TextFieldCustomize } from '../TextFieldCustomize/TextFieldCustomize';
import { theme } from '../../Theme/Theme';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';

function Promocode({ textAction, onHandleClick }) {
    return (
        <Box
            sx={{
                display: 'flex',

                alignItems: 'center',
            }}
        >
            <TextFieldCustomize placeholder={'Promocode'} />
            <Button
                variant="outlined"
                onClick={onHandleClick}
                sx={{
                    position: 'relative',
                    display: 'block',
                    color: '#fff',
                    textDecoration: 'none',
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderColor: theme.palette.background.secondary,

                    textTransform: 'initial',
                    py: 1,
                    overflow: 'hidden',
                    transition: '1s all ease',
                    zIndex: 1,
                    '&::before': {
                        backgroundColor: theme.palette.background.secondary,
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        //background is behind the text
                        zIndex: 0,
                        transition: 'all 0.6s ease',
                        width: '100%',
                        height: '0%',
                        // transform: 'translate(-50%,-50%) rotate(-45deg)',
                    },
                    '&:hover::before': {
                        height: '100%',
                    },
                    '&:hover': {
                        color: '#fff',
                        borderColor: theme.palette.background.secondary,
                    },
                }}
            >
                <CustomizeTypography
                    sx={{
                        position: 'relative',
                        zIndex: 2,
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        mb: 0,
                    }}
                >
                    {textAction}
                </CustomizeTypography>
            </Button>
        </Box>
    );
}

export default Promocode;
