import React from 'react';
import { TextField } from '@mui/material';
export const CustomizeCheckoutInput = ({
    placeholder,
    value,
    onHandleChange,
    onBlur,
    helperText,
}) => {
    return (
        <TextField
            onBlur={onBlur}
            helperText={helperText}
            value={value}
            placeholder={placeholder}
            onChange={onHandleChange}
            fullWidth
            sx={{
                mb: 2,
                '.MuiInputBase-root': {
                    fontSize: '14px',
                    height: '40px',
                    color: 'white',
                },
                '& .MuiFormHelperText-root': {
                    fontSize: '12.5px',
                    color: 'red',
                    mx: 1,
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#555',
                    },
                    '&:hover fieldset': {
                        borderColor: '#fff',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#fff',
                    },
                },
            }}
        />
    );
};
