import { TextField } from '@mui/material';

export const CustomTextArea = () => {
    return (
        <TextField
            label="Custom TextArea"
            multiline
            rows={6}
            variant="outlined"
            fullWidth
            placeholder="Customized textarea"
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                },
                '& .MuiInputBase-multiline': {
                    padding: '16px',
                },
            }}
        />
    );
};
