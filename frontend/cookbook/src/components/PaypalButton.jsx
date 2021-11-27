/* eslint-disable react/prop-types */
import React from 'react';
// import PaypalExpressBtn from 'react-paypal-express-checkout';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Box } from '@mui/material';

function PaypalButton({total, onSuccess}) {
  const options = {
    "client-id": "ATEn_CU0gTwkdWDpe8EL9R054Y6VHte4nuNTzyFRYlAMXPtIgp950puTxqP-HgAYdt4jp5HRIw_XuSDj",
    currency: "AUD",
    intent: "capture",
    debug: true,
  }
  const onApprove = (data, actions) => {
    return actions.order.capture()
      .then(function(details) {
        console.log(details);
      })
      .finally(onSuccess);
}

const onCancel = (data) => {
    // User pressed "cancel" or close Paypal's popup!
    console.log('The payment was cancelled!', data);
    // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
}

const onError = (err) => {
    // The main Paypal's script cannot be loaded or somethings block the loading of that script!
    console.log("Error!", err);
    // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
    // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
}
const createOrder = (data, actions) => {
  return actions.order.create({
    purchase_units: [{
      amount: {
        value: total
      }
    }]
  });
}
  return (
    <Box mt={3}>
      <PayPalScriptProvider options={options}>
        <PayPalButtons style={{ layout: "horizontal", tagline: false, label: 'paypal' }} createOrder={createOrder} onApprove={onApprove} onCancel={onCancel} onError={onError} />
      </PayPalScriptProvider>
    </Box>
  )
}

export default PaypalButton;