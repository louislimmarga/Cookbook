import React, { useState } from 'react';
import { Stack, Typography, Card, CardContent } from '@mui/material';
import PropTypes from 'prop-types';
import CustomTextField from './TextField/CustomTextField';
import SquareButton from './SquareButton';
import Notification from './Notification';

function DeliveryForm({deliveryInfo, setDeliveryInfo}) {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: 'error',
  });
  const [save, setSave] = useState(false);
  const validateInput = () => {
    let valid = true;
    if (!valid) {
      return false;
    } else {
      for (const [key, value] of Object.entries(deliveryInfo)) {
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
  const handleSave = () => {
    if (validateInput) {
      setSave(!save);
    }
  }
  const handleEdit = () => {
    setSave(!save);
  }
  return (
    <Stack direction="column" sx={{width: '100%'}}>
      <Notification notify={notify} setNotify={setNotify} /> 
      <Typography component="h2" variant="h4" gutterBottom sx={{color: "#FE793D"}}> Delivery Details</Typography>
      {save ? 
      <>
        <Stack
          direction="row"
          sx={{"div:first-child": {
            marginRight: '55px',
          }}}
        >
          <CustomTextField id="firstName" required name="First Name" value={deliveryInfo['firstName']} setValue={setDeliveryInfo}  field="object" width="100%"/>
          <CustomTextField id="lastName" required name="Last Name" value={deliveryInfo['lastName']} setValue={setDeliveryInfo}  field="object" width="100%"/>
        </Stack>
        <CustomTextField id="email" required name="Email" value={deliveryInfo['email']} setValue={setDeliveryInfo}  field="object" width="100%"/>
        <CustomTextField id="phone" required name="Phone" value={deliveryInfo['phone']} setValue={setDeliveryInfo}  field="object" width="100%"/>
        <CustomTextField id="address" required name="Address" value={deliveryInfo['address']} setValue={setDeliveryInfo}  field="object" width="100%"/>
        <Stack
          direction="row"
          sx={{"div:first-child": {
            marginRight: '55px',
          }, marginBottom: '20px'}}
        >
          <CustomTextField id="state" required name="State" value={deliveryInfo['state']} setValue={setDeliveryInfo}  field="object" width="100%"/>
          <CustomTextField id="postcode" required name="Postcode" value={deliveryInfo['postcode']} setValue={setDeliveryInfo}  field="object" width="100%"/>
        </Stack>
        <SquareButton onClick={handleSave} name="Save"/>
      </>
      : 
      <>
        <Card sx={{marginBottom: '20px', width: '300px', color: "#767676"}}>
          <CardContent>
          <Typography gutterBottom>{deliveryInfo['firstName']} {deliveryInfo['lastName']}</Typography>
          <Typography gutterBottom>{deliveryInfo['email']}</Typography>
          <Typography gutterBottom>{deliveryInfo['phone']}</Typography>
          <Typography gutterBottom>{deliveryInfo['address']}</Typography>
          <Typography gutterBottom>{deliveryInfo['state']} {deliveryInfo['postcode']}</Typography>
          </CardContent>
        </Card>
        <SquareButton onClick={handleEdit} name="Edit"/>
      </>}
      
    </Stack>
  )
}

DeliveryForm.propTypes = {
  deliveryInfo: PropTypes.object,
  setDeliveryInfo: PropTypes.func,
}

export default DeliveryForm