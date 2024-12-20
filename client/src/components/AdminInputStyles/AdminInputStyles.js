import { TextField, styled } from '@mui/material';

export const AdminInputStyles = styled(TextField)(() => ({
    mb: 2,
    // for label
    '.MuiInputLabel-root': {
        fontSize: '13px',
        color: '#000',
    },
    '.MuiInputBase-root': {
        fontSize: '13px',
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
