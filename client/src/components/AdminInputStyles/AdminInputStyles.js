import { TextField, styled } from '@mui/material';

export const AdminInputStyles = styled(TextField)(() => ({
    mb: 2,
    // for label
    '.MuiInputLabel-root': {
        fontSize: '14px',
        color: '#000',
    },
    '.MuiInputBase-root': {
        fontSize: '14px',
        height: '50px',
    },
    // change the border color of the input field
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#ccc',
        },
        '&:hover fieldset': {
            borderColor: '#ccc',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#ccc',
        },
    },
}));

// export const AdminInputStyles = styled(TextField)(() => ({
//     mb: 2,
//     // for label
//     '.MuiInputLabel-root': {
//         fontSize: '14px',
//         color: '#000',
//     },
//     '.MuiInputLabel-shrink': {
//         transform: 'translate(14px, -6px) scale(0.75)', // Adjust position when label shrinks
//     },
//     '.MuiInputBase-root': {
//         fontSize: '14px',
//         height: '50px',
//     },
//     // change the border color of the input field
//     '& .MuiOutlinedInput-root': {
//         '& fieldset': {
//             borderColor: '#ccc',
//         },
//         '&:hover fieldset': {
//             borderColor: '#999',
//         },
//         '&.Mui-focused fieldset': {
//             borderColor: '#333',
//         },
//     },
// }));

export const AdminTextAreaStyles = styled(TextField)(() => ({
    mb: 2,
    // for label
    '.MuiInputLabel-root': {
        fontSize: '14px',
        color: '#000',
    },
    '.MuiInputBase-root': {
        fontSize: '14px',
    },
    // change the border color of the input field
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#ccc',
        },
        '&:hover fieldset': {
            borderColor: '#ccc',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#ccc',
        },
    },
}));

export const AdminNormalInput = ({ label, type, value, onHandleChange, onHandleBlur }) => {
    return (
        <TextField
            label={label}
            fullWidth
            type={type}
            value={value}
            onChange={onHandleChange}
            onBlur={onHandleBlur}
            sx={{
                mb: 2,
                // for label
                '.MuiInputLabel-root': {
                    fontSize: '14px',
                    color: '#000',
                },
                '.MuiInputBase-root': {
                    fontSize: '14px',
                    height: '50px',
                },
                // change the border color of the input field
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#ccc',
                    },
                    '&:hover fieldset': {
                        borderColor: '#ccc',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#ccc',
                    },
                },
            }}
        />
    );
};

export const AdminAreaInput = ({ label, type, value, onHandleChange, onHandleBlur }) => {
    return (
        <TextField
            multiline
            rows={4}
            label={label}
            fullWidth
            type={type}
            value={value}
            onChange={onHandleChange}
            onBlur={onHandleBlur}
            sx={{
                mb: 2,
                // for label
                '.MuiInputLabel-root': {
                    fontSize: '14px',
                    color: '#000',
                },
                '.MuiInputBase-root': {
                    fontSize: '14px',
                },
                // change the border color of the input field
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#ccc',
                    },
                    '&:hover fieldset': {
                        borderColor: '#ccc',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#ccc',
                    },
                },
            }}
        />
    );
};
