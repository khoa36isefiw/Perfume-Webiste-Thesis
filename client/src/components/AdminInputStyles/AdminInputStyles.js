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
