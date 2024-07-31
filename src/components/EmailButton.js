import React, { useState } from 'react';
import { Button, Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const EmailButton = () => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        navigator.clipboard.writeText('meelikalukner@gmail.com');
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <Button onClick={handleClick} style={{padding: 0}}>
                <img src="/images/email_button_svg.svg" alt="Email"
                     style={{ width: '100%', height: 'auto' }}/>
            </Button>
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Email copied to clipboard"
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small"/>
                        </IconButton>
                    </React.Fragment>
                }
            />
        </>
    );
};

export default EmailButton;
