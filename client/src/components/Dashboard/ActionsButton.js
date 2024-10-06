import * as React from 'react';

import { Box, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
export default function ActionsButton({ onHandleClickEdit, onHandleClickDelete }) {
    return (
        <Box>
            <IconButton
                sx={{
                    bgcolor: '#fbe5ff',
                    borderRadius: '10px',
                    '&:hover': {
                        bgcolor: '#fbe5ff',
                    },
                    mr: 1,
                }}
            >
                <VisibilityIcon sx={{ color: '#be0ee1', fontSize: '16px' }} />
            </IconButton>
            <IconButton
                sx={{
                    bgcolor: '#ddfbe9',
                    borderRadius: '10px',
                    '&:hover': {
                        bgcolor: '#ddfbe9',
                    },
                    mr: 1,
                }}
                onClick={onHandleClickEdit}
            >
                <EditIcon sx={{ color: '#1a9f53', fontSize: '16px' }} />
            </IconButton>
            <IconButton
                sx={{
                    bgcolor: '#ffdfe4',

                    borderRadius: '10px',
                    '&:hover': {
                        bgcolor: '#ffdfe4',
                    },
                }}
                onClick={onHandleClickDelete}
            >
                <DeleteIcon sx={{ color: '#f11133', fontSize: '16px' }} />
            </IconButton>
        </Box>
    );
}
