import React, { useState } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { Stack, Typography, Button, InputAdornment} from "@mui/material";
import { styled } from '@mui/material/styles';

import CustomTextField from "../components/TextField/CustomTextField";
import Navbar from '../components/Navbar';
import FileTextField from "../components/TextField/FileTextField";
import NumberTextField from "../components/TextField/NumberTextField";
import RoundButton from "../components/RoundButton";
import Notification from "../components/Notification";
import LabelSelect from "../components/LabelSelect";


export const AddButton = styled(Button)(() => ({
  backgroundColor: '#89623D',
  color: "#ffffff",
  borderRadius: '3px',
  border: 'none',
  padding: '10px 16px',
  '&:hover': {
    backgroundColor: '#89623D',
  },
  textTransform: 'none',
  fontSize: '16px',
  margin: '16px 0',
}));


function AddProduct() {
  const history = useHistory();
  const location = useLocation();
  
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: 'error',
  });
  const [productInfo, setProductInfo] = useState(
    {
      productName: '',
      photo: '',
      description: '',
      labels: [],
      price: 0,
    });
  const [edit, setEdit] = useState(false);

  const sendToBack = () => {
    const productBody = {
      token: localStorage.getItem('cookbook-token'),
      title: productInfo.productName,
      photo: productInfo.photo,
      description: productInfo.description,
      labels: productInfo.labels,
      price: parseFloat(productInfo.price),
    }

    if (edit !== true) {
      fetch('http://127.0.0.1:5000/product/add', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
          Accept: 'applicaton/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productBody)
      }).then(() => {
        history.push('/');
      }).catch((err) => {
        setNotify({
          isOpen: true,
          message: err.response.data.message,
          type: 'error',
        });
      })
    } else {
      productBody.product_id =  location.state.id;
      console.log(productBody);
      fetch('http://127.0.0.1:5000/product/edit', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
          Accept: 'applicaton/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productBody)
      }).then(() => {
        history.push('/profile');
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  React.useEffect(() => {
    if (location.state) {
      setProductInfo({
        id: location.state.id,
        productName: location.state.productName,
        photo: location.state.photo,
        description: location.state.description,
        labels: location.state.labels,
        price: location.state.price,
      })
      setEdit(true);
    }
  }, [])

  return (
    <>
      <Notification notify={notify} setNotify={setNotify} /> 
      <Navbar />
      <Stack
        direction="column"
        alignItems="center"
        pt={20}
        sx={{backgroundColor: '#F9FAF9', minHeight: '90vh'}}>
        <Typography component="h1" variant="h3" sx={{color: "#FE793D", marginBottom: '36px'}}>Add Product</Typography>
        <Stack
          direction="column"
          alignItems="flex-start"
        >
          <CustomTextField id="productName" name="Product Name" value={productInfo['productName']} setValue={setProductInfo} field="object" width="781px"/>
          <FileTextField id="photo" name="Photo" setValue={setProductInfo} field="object" width="781px" accept="image/*"/>
          <img src={productInfo['photo']} style={{ maxWidth: '450px', maxHeight:'450px' }}/>
          <CustomTextField id="description" name="Description" multiline value={productInfo['description']} setValue={setProductInfo} field="object" width="781px"/>
          <LabelSelect labels={productInfo['labels']} setLabels={setProductInfo}/>
          <NumberTextField id="price" name="Price"  value={productInfo['price']} setValue={setProductInfo} field="object" width="100px" min="0" startAdornment={<InputAdornment position="start">$</InputAdornment>}/>
        </Stack>
        <div style={{ marginBottom: '20px'}}>
          <RoundButton name="Add Product" onClick={sendToBack}/>
        </div>
      </Stack>
    </>
  )
}

export default AddProduct;