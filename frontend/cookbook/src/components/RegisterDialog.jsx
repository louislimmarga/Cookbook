/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import { Dialog,DialogActions, DialogContent, DialogTitle, Stack} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';

import CustomTextField from './TextField/CustomTextField';
import FileTextField from './TextField/FileTextField';
import SquareButton from './SquareButton';
import Notification from './Notification';


const dialogTheme = createTheme({
  components: {
    // Name of the component
    MuiDialog: {
      styleOverrides: {
        // Name of the slot
        paper: {
          backgroundColor: '#F9FAF9',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '42px 223px',
        },
      },
    },
  },
});

function RegisterDialog({open, setOpen}) {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    photo: '',
    email: '',
    address: '',
    state: '',
    postcode: '',
    phone: '',
  }) 

  const [accountInfo, setAccountInfo] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [next, setNext] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: 'error',
  });
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
  }
  const validateInput = () => {
    let valid = true;
    for (const [key, value] of Object.entries(personalInfo)) {
      if (value === '' && ! ["address","state","postcode","photo"].includes(key) ) {
        setNotify({
          isOpen: true,
          message: `${key} field should not be empty`,
          type: 'error',
        });
       valid = false;
       break;
      }
    }
    if (!valid) {
      return false;
    } else {
      for (const [key, value] of Object.entries(accountInfo)) {
        if (value === '') {
          setNotify({
            isOpen: true,
            message: `${key} field should not be empty`,
            type: 'error',
          });
         valid = false;
         break;
        }
      }
    }
    return valid;
  };
  const handleRegister = () => {
    if(validateInput()) {
      axios.post('http://127.0.0.1:5000/auth/register', {
        first_name: personalInfo['firstName'],
        last_name:  personalInfo['lastName'],
        photo: personalInfo['photo'],
        email: personalInfo['email'],
        address: personalInfo['address'],
        state:  personalInfo['state'],
        postcode:  personalInfo['postcode'],
        phone:  personalInfo['phone'],
        username: accountInfo['username'],
        password: accountInfo['password'],
        confirmpassword: accountInfo['confirmPassword']
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
  }
  
  return(
    <ThemeProvider theme={dialogTheme}>
      <Notification notify={notify} setNotify={setNotify} />
      <Dialog 
        open={open} 
        onClose={handleClose}
        sx={{height: '80vh', justifySelf: 'center', position: 'absolute', top: '10%'}}
      > 
        <DialogTitle sx={{color: '#FE793D', fontSize: '2rem'}}>Register</DialogTitle>
        <DialogContent sx={{display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "center", flexWrap: 'wrap', width: '466px'}}>
        {!next ? 
          <>
            <Stack
              direction="row"
              sx={{"div:first-child": {
                marginRight: '55px',
              },
              }}
            >
              <CustomTextField id="firstName" required name="First Name" value={personalInfo['firstName']} setValue={setPersonalInfo}  field="object" width="205px"/>
              <CustomTextField id="lastName" required name="Last Name" value={personalInfo['lastName']} setValue={setPersonalInfo}  field="object" width="205px"/>
            </Stack>
            <FileTextField id="photo" name="Photo" setValue={setPersonalInfo} field="object" width="466px" accept="image/*"/>
            <CustomTextField id="email" required name="Email" value={personalInfo['email']} setValue={setPersonalInfo}  field="object" width="466px"/>
            <CustomTextField id="phone" required name="Phone" value={personalInfo['phone']} setValue={setPersonalInfo}  field="object" width="466px"/>
            <CustomTextField id="adress" name="Address" value={personalInfo['adress']} setValue={setPersonalInfo}  field="object" width="466px"/>
            <Stack
              direction="row"
              sx={{"div:first-child": {
                marginRight: '55px',
              },
              }}
            >
              <CustomTextField id="state" name="State" value={personalInfo['state']} setValue={setPersonalInfo}  field="object" width="205px"/>
              <CustomTextField id="postcode" name="Postcode" value={personalInfo['postcode']} setValue={setPersonalInfo}  field="object" width="205px"/>
            </Stack>
          </> 
        :
          <>
            <CustomTextField id="username" required name="Username" value={accountInfo['username']} setValue={setAccountInfo}  field="object" width="466px"/>
            <CustomTextField id="password" required name="Password" value={accountInfo['password']} setValue={setAccountInfo}  field="object" width="466px" type="password" />
            <CustomTextField id="confirmPassword" required name="Confirm Password" value={accountInfo['confirmPassword']} setValue={setAccountInfo}  field="object" width="466px" type="password" />
          </>
        }
        </DialogContent>
        <DialogActions>
            {!next ?
              <SquareButton name="Next" onClick={() => setNext(true)}/>
            :
              <>
                <SquareButton name="Back" onClick={() => setNext(false)} />
                <SquareButton name="Register" onClick={handleRegister}/>
              </>
            }
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )

}

export default RegisterDialog;