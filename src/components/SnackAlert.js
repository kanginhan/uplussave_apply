import React from 'react';
import { Snackbar } from "@material-ui/core";

const SnackAlert = ({open, setOpen, message}) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            onClose={() => setOpen(false)}
            message={message}
            key={message}
        />
    );
};

export default SnackAlert;