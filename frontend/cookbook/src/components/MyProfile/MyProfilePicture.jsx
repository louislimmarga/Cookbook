import React, { useState } from "react";
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { Avatar } from "@mui/material";
import RoundButton from "../RoundButton";
import { useHistory } from 'react-router-dom';

import Notification from "../Notification";

const useStyles = makeStyles({
  root: {
    backgroundColor: '#FFFFFF',
    height: '250px',
    width: '250px',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
})

function MyProfilePicture() {
  const classes = useStyles();
  const history = useHistory();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: 'error',
  });
  const [id, setId] = useState();
  const [photo, setPhoto] = useState();
  const [loadingState, setLoadingState] = useState(true);

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
    })
  }, [])

  React.useEffect(() => {
    if (id !== undefined) {
      fetch('http://127.0.0.1:5000/user/photo?user_id=' + id, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
          Accept: 'applicaton/json',
          'Content-Type': 'application/json'
        },
      }).then((data) => {
        if (data.status === 200) {
          data.json().then((res) => {
            setPhoto(res.photo);
          })
        }
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoadingState(false);
      })
    }
  }, [id])

  const handleLogout = () => {
    const token = localStorage.getItem('cookbook-token');
    axios.post('http://127.0.0.1:5000/auth/logout', {
        token,
      })
      .then((res) => {
        const {is_success} = res.data;
        if(is_success) {
          localStorage.removeItem('cookbook-token');
          localStorage.removeItem('cookbook-profile');
          history.push('/');
        } else {
          setNotify({
            isOpen: true,
            message: "Invalid token",
            type: 'error',
          });
        }
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err.response.data.message,
          type: 'error',
        });
      })
  }

  return (
    <div className={classes.root}>
      <Notification notify={notify} setNotify={setNotify} /> 
      {loadingState
        ?<Avatar
            alt="Profile Picture"
            src="a"
            sx={{ width:'120px', height: '120px', marginBottom:'30px' }}
          />
        : <Avatar
            alt="Profile Picture"
            src={photo}
            sx={{ width:'120px', height: '120px', marginBottom:'30px' }}
          />
      }
      <RoundButton name="Sign out" onClick={handleLogout} />
    </div>
  )
}

export default MyProfilePicture;