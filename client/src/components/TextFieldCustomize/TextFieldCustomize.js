import { TextField, IconButton, InputAdornment, styled } from '@mui/material';
import React from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { mobileScreen, theme } from '../../Theme/Theme';

export const TextFieldCustomize = ({
    inputValue,
    onChangeValue,
    placeholder,
    onHandleKeyDown,
    width,
    fullWidth = false,
}) => {
    return (
        <TextField
            variant="outlined"
            fullWidth={fullWidth}
            placeholder={placeholder}
            // value={cityName}
            value={inputValue}
            // value current value in text field
            // onChange={(e) => setCityName(e.target.value)}
            onChange={onChangeValue}
            onKeyDown={onHandleKeyDown}
            sx={{
                '.MuiInputBase-root': {
                    width: width ? width : '220px',
                    fontSize: '14px',
                    height: '40px',
                    color: 'white',
                    borderTopLeftRadius: '12px',
                    borderBottomLeftRadius: '12px',
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    [mobileScreen]: {
                        width: '250px',
                    },
                },
                '& .MuiFormHelperText-root': {
                    fontSize: '12.5px',
                    color: 'red',
                    mx: 1,
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#333',
                    },
                    '&:hover fieldset': {
                        borderColor: '#333',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#333',
                    },
                },
            }}
        />
    );
};

export const CustomizeTextFieldCreditCard = ({
    type,
    name,
    label,
    placeholder,
    value,
    onChange,
    onFocus,
    variant,
}) => {
    return (
        <TextField
            fullWidth
            type={type}
            name={name}
            label={label}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            variant={variant}
            // MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1jy569b-MuiFormLabel-root-MuiInputLabel-root
            sx={{
                // padding: '12.5px 13px',
                '.MuiInputBase-root': {
                    fontSize: '14px',
                    color: 'white',
                    borderRadius: 1,
                },
                '& .MuiFormHelperText-root': {
                    fontSize: '14px',

                    mx: 1,
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#d9d9d9',
                    },
                    '&:hover fieldset': {
                        borderColor: '#d9d9d9',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#d9d9d9',
                    },
                },
                // MuiFormLabel-root MuiInputLabel-root
                '.MuiFormLabel-root ': {
                    color: 'white',
                    fontSize: '12px',
                },
                '.MuiInputLabel-root': {
                    color: 'white',
                    fontSize: '12px',
                },
                '.MuiInputBase-input ': {
                    padding: '13.5px 13px',
                },
            }}
        />
    );
};

export const TextFieldLogin = ({
    inputValue,
    inputRef,
    onChangeValue,
    placeholder,
    onHandleKeyDown,
    disabled = false,
    fullWidth = true,
    defaultValue,
}) => {
    return (
        <TextField
            inputRef={inputRef}
            disabled={disabled}
            variant="outlined"
            fullWidth={fullWidth}
            placeholder={placeholder}
            value={inputValue}
            defaultValue={defaultValue}
            // value current value in text field
            // onChange={(e) => setCityName(e.target.value)}
            onChange={onChangeValue}
            onKeyDown={onHandleKeyDown}
            sx={{
                '.MuiInputBase-root': {
                    fontSize: '14px',
                    height: '40px',
                    color: 'white',
                    borderRadius: '12px',
                },
                '& .MuiFormHelperText-root': {
                    fontSize: '12.5px',
                    color: 'red',
                    mx: 1,
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#d9d9d9',
                    },
                    '&:hover fieldset': {
                        borderColor: '#d9d9d9',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#d9d9d9',
                    },
                },
            }}
        />
    );
};

export const TextFieldPassword = ({
    inputValue,
    onChangeValue,
    placeholder,
    onHandleKeyDown,
    showPassword,
    onHandleClick,
}) => {
    return (
        <TextField
            variant="outlined"
            fullWidth
            placeholder={placeholder}
            value={inputValue}
            // value current value in text field
            // onChange={(e) => setCityName(e.target.value)}
            onChange={onChangeValue}
            onKeyDown={onHandleKeyDown}
            sx={{
                '.MuiInputBase-root': {
                    fontSize: '14px',
                    height: '40px',
                    color: 'white',
                    borderRadius: '12px',
                },
                '& .MuiFormHelperText-root': {
                    fontSize: '12.5px',
                    color: 'red',
                    mx: 1,
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#d9d9d9',
                    },
                    '&:hover fieldset': {
                        borderColor: '#d9d9d9',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#d9d9d9',
                    },
                },
            }}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={onHandleClick} edge="end">
                            {showPassword ? (
                                <VisibilityOff sx={{ color: 'white' }} />
                            ) : (
                                <Visibility sx={{ color: 'white' }} />
                            )}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export const TextFieldVerifyCode = ({
    inputValue,
    onChangeValue,
    placeholder,
    onHandleKeyDown,
    disabled = false,
}) => {
    return (
        <TextField
            disabled={disabled}
            variant="outlined"
            placeholder={placeholder}
            value={inputValue}
            // value current value in text field
            // onChange={(e) => setCityName(e.target.value)}
            onChange={onChangeValue}
            onKeyDown={onHandleKeyDown}
            sx={{
                mr: 2,
                '.MuiInputBase-input': {
                    padding: '21px',
                },

                '.MuiInputBase-root': {
                    fontSize: '14px',
                    height: '50px',
                    width: '50px',
                    color: 'white',
                    borderRadius: '12px',
                },
                '& .MuiFormHelperText-root': {
                    fontSize: '12.5px',
                    color: 'red',
                    mx: 1,
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#d9d9d9',
                    },
                    '&:hover fieldset': {
                        borderColor: '#d9d9d9',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: theme.palette.text.secondary,
                        borderWidth: 2,
                    },
                },
            }}
        />
    );
};

export const TextFieldCustomizeV2 = styled(({ width, fullWidth, ...otherProps }) => (
    <TextField {...otherProps} fullWidth={fullWidth} />
))(({ width }) => ({
    mr: 2,
    width: width,

    '.MuiInputBase-root': {
        width: width,

        fontSize: '14px',
        height: '40px',
        color: 'white',
        borderTopLeftRadius: '12px',
        borderBottomLeftRadius: '12px',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    '& .MuiFormHelperText-root': {
        fontSize: '12.5px',
        color: 'red',
        mx: 1,
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#333',
        },
        '&:hover fieldset': {
            borderColor: '#333',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#333',
        },
    },
}));
