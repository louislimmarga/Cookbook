/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useState} from "react";
import axios from 'axios';
import { FormControl, Stack, Typography } from "@mui/material";
import { styled } from '@mui/system';
import { useHistory } from "react-router-dom"; 

import CustomTextField from "./TextField/CustomTextField";
import SquareButton from "./SquareButton";
import RegisterDialog from "./RegisterDialog";
// import PreferenceDialog from './PreferenceDialog';

const SignIn = styled(Typography)({
  fontWeight: '500',
  fontSize: '36px',
  lineHeight: '42px',
  color: '#FE793D',
  paddingTop: '10%',
});

function LoginForm({setNotify}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [open, setOpen] = useState(false);
  const history = useHistory();

 
  const showRegister = () => {
    setOpen(true);
  };

  const validateInput = () => {
    if (username.trim() === '') {
      setNotify({
        isOpen: true,
        message: 'Username field should not be empty',
        type: 'error',
      });
      return false;
    } else if (password.trim() === '') {
      setNotify({
        isOpen: true,
        message: 'Password field should not be empty',
        type: 'error',
      });
      return false;
    } else {
      return true;
    }
  }
  const handleLogin = () => {
    if (validateInput()) {
      axios.post('http://127.0.0.1:5000/auth/login', {
        username: username.trim(),
        password: password.trim()
      })
      .then((res) => {
        const {token, user_id} = res.data;
        localStorage.setItem('cookbook-token', token);
        localStorage.setItem('cookbook-profile', user_id);
        history.push('/');
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err.response.data.message,
          type: 'error',
        });
      })
    }
  };

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      sx={{ background: '#F9FAF9', borderRadius: '10px', width: '458px', height: '476px' }}
      spacing={3}
    >
      <SignIn component="h1" variant="h2" align="center">Sign In</SignIn>
      <FormControl>
        <CustomTextField id="username" name="Username" required value={username} setValue={setUsername}   width="362px"/>
        <CustomTextField id="password" name="Password" required value={password} setValue={setPassword}   width="362px" type="password"/>
      </FormControl>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{width: '78%'}}
      >
        <SquareButton name="Login" onClick={handleLogin}/>
        <SquareButton name="Register" onClick={showRegister}/>
      </Stack>
      <RegisterDialog open={open} setOpen={setOpen} />
      {/* <PreferenceDialog open={open} setOpen={setOpen} /> */}
    </Stack>
  )
}

export default LoginForm;