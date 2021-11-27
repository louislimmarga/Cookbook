/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Grid, Button, Divider, RadioGroup, Radio, FormControlLabel, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

import PaypalButton from './PaypalButton';
import Notification from './Notification';
import LoadingDialog from './LoadingDialog';
// import PaypalLogo from '../assets/paypal-logo.svg';

function Checkout({checkout, setCheckout, total, sections, deliveryInfo}) {
  const [payment, setPayment] = useState('reward');
  const [openLoading, setOpenLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: 'error',
  });

  useEffect (() => {
    axios.get('http://127.0.0.1:5000/reward/balance', {
      headers: {
        Authorization: `Bearer ${token}`
      }})
      .then((res) => {
        console.log(res.data);
        setBalance(res.data['balance']);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const token = localStorage.getItem('cookbook-token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const CheckoutButton = styled(Button)(() => ({
    backgroundColor: '#89623D',
    color: "#ffffff",
    borderRadius: '3px',
    border: 'none',
    width: '340px',
    '&:hover': {
      backgroundColor: '#89623D',
    },
    textTransform: 'none',
    fontSize: '18px',
    fontWeight: '500',
    marginTop: '30px',
  }));
  const handlePaymentRadio = (event) => {
    console.log(event.target.value);
    setPayment(event.target.value);
  };

  const handlepaymentSuccess = () => {
    setOpenLoading(true);
    const data = {
      firstname: deliveryInfo['firstName'], 
      lastname: deliveryInfo['lastName'],
      email: deliveryInfo['email'],
      address: deliveryInfo['address'],
      state: deliveryInfo['state'],
      postcode: deliveryInfo['postcode'],
      phone: deliveryInfo['phone'],
      details: sections,
      total,
    }
    axios.post('http://127.0.0.1:5000/cart/paypal', data, {
      headers: headers,
    })
    .then(() => {
      setNotify({
        isOpen: true,
        message: "Payment Success, Please check your email for the invoice",
        type: 'success',
      });
    })
    .catch((err) => {
      setNotify({
        isOpen: true,
        message: err.response.data.message,
        type: 'error',
      });
    })
    .finally(() => {
      setOpenLoading(false);
    })
  }

  const handleRewardPayment = () => {
    setOpenLoading(true);
    const data = {
      token,
      firstname: deliveryInfo['firstName'], 
      lastname: deliveryInfo['lastName'],
      email: deliveryInfo['email'],
      address: deliveryInfo['address'],
      state: deliveryInfo['state'],
      postcode: deliveryInfo['postcode'],
      phone: deliveryInfo['phone'],
    }
    axios.post('http://127.0.0.1:5000/cart/reward', data, {
      headers: headers,
    })
    .then(() => {
      setNotify({
        isOpen: true,
        message: "Payment Success, Please check your email for the invoice",
        type: 'success',
      });
    })
    .catch((err) => {
      setNotify({
        isOpen: true,
        message: err.response.data.message,
        type: 'error',
      });
    })
    .finally(() => {
      setOpenLoading(false);
    })
  }
  return (
    <Paper elevation={3} sx={{width: '90%', display: 'flex', justifyContent: 'center',flexDirection: 'column', padding: "60px 40px"}}>
      <LoadingDialog open={openLoading} />
      <Notification notify={notify} setNotify={setNotify} /> 
      <Grid container spacing={2} >
        <Grid item xs={6}>
          <Typography paragraph variant="h5" gutterBottom align="left" sx={{color: "#FE793D", fontWeight: "lighter", fontSize: "1.25rem"}}>Sub-total</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography paragraph variant="h5" gutterBottom align="right" sx={{color: "#FE793D", fontWeight: "lighter", fontSize: "1.25rem"}}>$ {parseFloat(total).toFixed(2)}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography paragraph variant="h5" gutterBottom align="left"  sx={{color: "#FE793D", fontWeight: "lighter", fontSize: "1.25rem"}}>Postage</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography paragraph variant="h5" gutterBottom align="right"  sx={{color: "#FE793D", fontWeight: "lighter", fontSize: "1.25rem"}}>Free</Typography>
        </Grid>
      </Grid>
      <Divider variant="middle" flexItem sx={{margin: '10px 0'}}/>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography paragraph variant="h5" gutterBottom align="left"  sx={{color: "#FE793D",  fontWeight: "bold", fontSize: "1.75rem"}}>Total</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography paragraph variant="h5" gutterBottom align="right" sx={{color: "#FE793D",  fontWeight: "bold", fontSize: "1.75rem"}}>$ {parseFloat(total).toFixed(2)} </Typography>
        </Grid>
      </Grid>
      {!checkout ? <CheckoutButton sx={{width: '100%'}} onClick={() => setCheckout(true)}>Proceed to Checkout</CheckoutButton>
      :
      <>
        <Typography paragraph variant="h5" gutterBottom sx={{color: "#767676", alignSelf: 'flex-start'}}>Payment Methods</Typography>
        <RadioGroup value={payment} onChange={handlePaymentRadio}>
          <FormControlLabel value="paypal" control={<Radio />} label="Paypal" sx={{color: "#767676", width: "150px"}}/>
          <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <FormControlLabel value="reward" control={<Radio />} label="Reward Cash" sx={{color: "#767676", width: "150px"}}/>
            <Typography variant="p" sx={{color: "#FE793D",  fontWeight: "bold", alignSelf: 'center'}}>Balance: $ {balance} </Typography>
          </Box>
        </RadioGroup>
        {payment === 'paypal' ? <PaypalButton total={total} onSuccess={handlepaymentSuccess}/> : <CheckoutButton sx={{width: '100%'}} onClick={handleRewardPayment}>Pay Now</CheckoutButton>}
      </> 
      }
    </Paper>
  )
}

export default Checkout;

Checkout.propTypes = {
  checkout: PropTypes.bool,
  setCheckout: PropTypes.func,
}
