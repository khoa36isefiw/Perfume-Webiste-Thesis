import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';
import { theme } from '../../Theme/Theme';

export default function ConfirmMessage({
    msgTitle,
    msgContent,
    openConfirmMessage,
    onHandleClickClose,
    onHandleConfirmAgree,
    onHandleConfirmDisagree,
}) {
    return (
        <React.Fragment>
            <Dialog
                open={openConfirmMessage}
                onClose={onHandleClickClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{msgTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {msgContent}
                    </DialogContentText>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <ConfirmMessageButton
                        onHandleAction={onHandleConfirmDisagree}
                        autoFocus
                        textAction={'Cancel'}
                        bgColorHovered={'transparent'}
                        textColor={theme.palette.background.secondary}
                    />

                    <ConfirmMessageButton
                        variant="contained"
                        onHandleAction={onHandleConfirmAgree}
                        autoFocus
                        textAction={'Yes'}
                        bgcolor={theme.palette.background.secondary}
                        bgColorHovered={theme.palette.background.secondary}
                    />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export const ConfirmMessageButton = ({
    textAction,
    onHandleAction,
    variant,
    textColor,
    bgcolor,
    bgColorHovered,
}) => {
    return (
        <Button
            variant={variant}
            onClick={onHandleAction}
            sx={{
                color: textColor ? textColor : '#fff',
                borderRadius: '24px',
                padding: '4px 24px',
                fontSize: '14px',
                fontWeight: 'bold',
                textTransform: 'initial',
                bgcolor: bgcolor,
                '&:hover': {
                    bgcolor: bgColorHovered,
                },
            }}
        >
            {textAction}
        </Button>
    );
};
