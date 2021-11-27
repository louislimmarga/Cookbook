/* eslint-disable react/prop-types */
import React from 'react';
import { Snackbar, Alert } from '@mui/material';

function Notification(props) {
  const { notify, setNotify } = props;

  const handleClose = () => {
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  const parseInput = (message) => {
    return message.replace(/<.?p>+/g, "");
  };

  return (
    <Snackbar
      open={notify.isOpen}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert sx={{width: '551px',}} severity={notify.type} onClose={handleClose}>
        {parseInput(notify.message)}
      </Alert>
    </Snackbar>
  );
}

export default Notification;