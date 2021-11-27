/* eslint-disable react/prop-types */
import React from 'react';
import {Backdrop, CircularProgress} from '@mui/material';

function LoadingDialog({open}) {
  return (
    <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, margin: 0 }}
    open={open}
    >
      <CircularProgress />
    </Backdrop>
  )
}

export default LoadingDialog;