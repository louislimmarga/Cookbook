import React, { useState } from 'react';
import { Stack } from '@mui/material';

import {ReactComponent as ReactLogo} from '../assets/CookBook.svg';
import LoginForm from '../components/LoginForm';
import Notification from '../components/Notification';

function Login() {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: 'error',
  });

  return (
    <>
      <Stack
        direction="row"
        spacing={0}
        sx={{ width: '100%', height: '100vh' }}
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ backgroundColor: '#FE793D', width: '50%', height: '100%',}}
        >
          <ReactLogo width="419px" height="96px"/>
        </Stack>
        <Notification notify={notify} setNotify={setNotify} />
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ backgroundColor: '#FFFFFF', width: '50%', height: '100%',}}
        >
          <LoginForm setNotify={setNotify} />
        </Stack>
      </Stack>
    </>
  )
}

export default Login;