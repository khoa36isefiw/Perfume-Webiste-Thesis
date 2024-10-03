import React from 'react';

import { Button } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { theme } from '../../Theme/Theme';

function AdminButtonBackPage({ title }) {
    return (
        <Button
            startIcon={<ArrowBackIos />}
            onClick={() => window.history.back(-1)}
            sx={{
                // bgcolor: theme.palette.admin.bgColor,
                color: 'black',
                fontSize: '18px',
                textTransform: 'initial',
                fontWeight: 'bold',
                '&:hover': {
                    bgcolor: 'transparent',
                    color: theme.palette.admin.bgColor,
                },
            }}
        >
            {title}
        </Button>
    );
}

export default AdminButtonBackPage;
