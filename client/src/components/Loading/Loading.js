import { Box } from '@mui/material';
import React from 'react';

function Loading() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
        >
            <iframe
                title="loading api"
                src="https://lottie.host/embed/718acbea-52fd-43e3-9367-cc62f8a6d435/PiwO2n2nyM.json"
                style={{ border: 0, width: '500px', height: '500px' }}
            />
        </Box>
    );
}

export default Loading;
