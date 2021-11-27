import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

import { CircularProgress, Stack } from '@mui/material';
import CustomTextField from '../TextField/CustomTextField';
import FileTextField from '../TextField/FileTextField';
import RoundButton from '../RoundButton';
import Notification from '../Notification';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#F9FAF9',
    height: '100%',
    width: '60vw',

    border: '3px solid #89623D',
    borderRadius: '10px',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center ',
    alignItems: 'center',

    marginTop: '30px',
  },
  title: {
    top: '20px',
    left: '20px',
    position: "relative",

    height: '35px',
    width: '170px',

    textAlign: 'center',

    backgroundColor: '#F9FAF9',

    fontFamily: 'Roboto',
    fontSize: '24px',
    fontWeight: 'bold',

    color: '#89623D',
  },
})

function SettingsDashboard() {
  const classes = useStyles();
  const [id, setId] = useState();
  const [personalInfo, setPersonalInfo] = useState({
    first_name: '',
    last_name: '',
    photo: '',
    email: '',
    address: '',
    state: '',
    postcode: '',
    phone: '',
  })
  const [loadingState, setLoadingState] = useState(true);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: 'error',
  });

  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/id/check', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
        Accept: 'applicaton/json',
        'Content-Type': 'application/json'
      }
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          setId(res.id);
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  React.useEffect(() => {
    if (id === undefined) {
      return;
    }
    fetch('http://127.0.0.1:5000/profile/view?user_id=' + id, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
        Accept: 'applicaton/json',
        'Content-Type': 'application/json'
      }
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          const info = {
            first_name: res.first_name,
            last_name: res.last_name,
            photo: res.photo,
            email: res.email,
            address: res.address,
            state: res.state,
            postcode: res.postcode,
            phone: res.phone,
          }
          setPersonalInfo(info);
        })
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoadingState(false);
    })
  }, [id])

  const handleSave = () => {
    fetch('http://127.0.0.1:5000/user/edit', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
        Accept: 'applicaton/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(personalInfo)
    }).then((data) => {
      if (data.status === 200) {
        setNotify({
          isOpen: true,
          message: 'Saved changes',
          type: 'success',
        });
      } else {
        data.json().then((res) => {
          setNotify({
            isOpen: true,
            message: res.message,
            type: 'error',
          });
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div>
      <Notification notify={notify} setNotify={setNotify} />
      {loadingState
        ? <div style={{ height: '100vh', backgroundColor: '#F9FAF9', paddingTop: '150px', display: 'flex', justifyContent: 'center' }}>
            <CircularProgress/>
          </div>
        : <> 
          <div className={classes.title}>
            Settings
          </div>
          <div className={classes.root}>
            <div className={classes.container} >
              <Stack
              >
                <Stack
                  direction="row"
                  sx={{"div:first-child": {
                    marginRight: '55px',
                    },
                  }}
                >
                  <CustomTextField id="first_name" required name="First Name" value={personalInfo['first_name']} setValue={setPersonalInfo}  field="object" width="205px"/>
                  <CustomTextField id="last_name" required name="Last Name" value={personalInfo['last_name']} setValue={setPersonalInfo}  field="object" width="205px"/>
                </Stack>
                <FileTextField id="photo" name="Photo" setValue={setPersonalInfo} field="object" width="466px" accept="image/*"/>
                <img src={personalInfo['photo']} style={{ maxWidth: '466px', maxHeight:'466px' }}/>
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
              </Stack>
            </div>
            <div style={{ margin: '20px'}}>
              <RoundButton name="Save Changes" onClick={handleSave}/>
            </div>
          </div>
          </>
      }
    </div>
  )
}

export default SettingsDashboard;