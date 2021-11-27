/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import { useHistory } from 'react-router-dom';

import Notification from './Notification';

function AccountMenu({anchorEl, open, onClose, onClick, setOpenLoading}) {
  const history = useHistory();
  const [isAdmin, setIsAdmin] = useState(false);
  const [balance, setBalance] = useState(0);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: 'error',
  });
  const token = localStorage.getItem('cookbook-token');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/admin/check', {
      headers: {
        Authorization: `Bearer ${token}`
      }})
      .then((res) => {
        setIsAdmin(res.data['admin']);
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err.response.data.message,
          type: 'error',
        });
      })
    axios.get('http://127.0.0.1:5000/reward/balance', {
      headers: {
        Authorization: `Bearer ${token}`
      }})
      .then((res) => {
        setBalance(res.data['balance']);
      })
      .catch((err) => {
        console.log(err);
      });    
  }, [])

  const handleLogout = () => {
    setOpenLoading(true);
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
      .finally(() => {
        localStorage.removeItem('cookbook-token');
        localStorage.removeItem('cookbook-profile');
        setOpenLoading(false);
        window.location.reload();
      })
  }
  const handleAddProduct = () => {
    history.push('/product/add');
  }

  const handleProfile = () => {
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
          history.push('/user/' + res.id);
        })
      }
    })
  }

  const handleAccount = () => {
    history.push('/profile');
  }
  return (
    <>
      
      <Notification notify={notify} setNotify={setNotify} /> 
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        onClick={onClick}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 0.5,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {isAdmin ?
          <MenuItem onClick={handleAddProduct}>
            Add product
          </MenuItem>
        : <MenuItem>Reward Balance: ${balance}</MenuItem>}
        <MenuItem onClick={handleProfile}>
          Profile
        </MenuItem>
        <MenuItem onClick={handleAccount}>
          Account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default AccountMenu;