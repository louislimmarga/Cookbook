import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack, Paper, Button, CircularProgress, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import Navbar from '../components/Navbar';
import Checkout from '../components/Checkout';
import DeliveryForm from '../components/DeliveryForm';
import Notification from '../components/Notification';
import RecipeSection from '../components/RecipeSection';

const ContinueButton = styled(Button)(() => ({
  color: "#89623D",
  textTransform: 'none',
  fontSize: '18px',
  fontWeight: '500',
}));

function Cart() {
  const token = localStorage.getItem('cookbook-token');
  const headers = {"Authorization": `Bearer ${token}`};
  const history = useHistory();
  const [checkout, setCheckout] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState([]);
  const [update, setUpdate] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'JohnDoe@example.com',
    address: '23 Anzac Parade',
    state: 'NSW',
    postcode: '2033',
    phone: '04123456789',
  })
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: 'error',
  });

  useEffect(() => {
    // console.log(update);
    axios.get('http://127.0.0.1:5000/cart/retrieve', {headers: headers})
    .then((res) => {
      const {section_list, total} = res.data;
      setSections(section_list);
      setTotal(total);
    })
    .catch((err) => {
      setNotify({
        isOpen: true,
        message: err.response.data.message || 'Connection Error',
        type: 'error',
      });
    })
    .finally(() => {
      setLoading(false);
    })
  }, [checkout, update])

  useEffect(() => {
    const user_id = localStorage.getItem('cookbook-profile');
    console.log(user_id);
    axios.get('http://127.0.0.1:5000/profile/view', {
      headers: headers,
      params: {
        user_id: user_id,
      }
    })
    .then((res) => {
      console.log(res.data)
      const profile = res.data;
      setDeliveryInfo({
        firstName: profile['first_name'],
        lastName: profile['last_name'],
        email: profile['email'],
        address: profile['address'],
        state: profile['state'],
        postcode: profile['postcode'],
        phone: profile['phone'],
      });
    })
    .catch((err) => {
      console.log(err);
    })
  }, [token]);
  
  const goHome = () => {
    history.push('/');
  }
  const removeIngredient = (id, recipe_id) => {
    const data = {
      'ingredient': id,
      'recipe_id': recipe_id,
    }
    axios.post('http://127.0.0.1:5000/cart/remove', data, {
      headers: headers
    })
    .then(() => {
      setLoading(true);
      setUpdate(!update);
    })
    .catch((err) => {
      setNotify({
        isOpen: true,
        message: err.response.data.message || 'Connection Error',
        type: 'error',
      });
    })
  }
  const changeQuantity = (id,recipe_id,event) => {
    const recipe = sections.reduce(section => section['recipe_id'] === recipe_id);
    recipe['recipe_ingredients'].map(item => {
      if (item['_id'] === id) {
        // console.log(id, item);
        item['quantity'] = parseInt(event.target.value);
      }
    });
    // console.log(recipe['recipe_ingredients']);
    const data = {
      'ingredients': recipe['recipe_ingredients'],
      'recipe_id': recipe_id,
    }
    axios.post('http://127.0.0.1:5000/cart/update', data, {
      headers: headers
    })
    .then(() => {
      setLoading(true);
      setUpdate(!update);
    })
    .catch((err) => {
      setNotify({
        isOpen: true,
        message: err.response.data.message || 'Connection Error',
        type: 'error',
      });
    })
  }

  return (
    <>
      <Navbar />
      <Notification notify={notify} setNotify={setNotify} /> 
      <Stack
        direction="row"
        justifyContent="center"
        pt={20}
        spacing={5}
        sx={{ backgroundColor:'#F9FAF9', minHeight: '84vh' }}
      >
        {checkout ? 
          <Paper sx={{width: "30%", padding: '20px', height: '80%'}}><DeliveryForm deliveryInfo={deliveryInfo} setDeliveryInfo={setDeliveryInfo}/></Paper> 
        :
          loading ? <CircularProgress sx={{position: 'relative', top: '20%'}}/> 
          :
          <Stack
            direction="column"
            sx={{width: "50%"}}
          >
            <Typography component="h1" variant="h4" gutterBottom sx={{color: "#FE793D"}}>My Cart</Typography>
            {sections.map(section => <RecipeSection removeIngredient={removeIngredient} ingredients={section['recipe_ingredients']} key={section['recipe_id']} recipeId={section['recipe_id']} changeQuantity={changeQuantity} />)}
          </Stack>
          
          }
        <Stack direction="column" sx={{width: "20%"}}>
          {loading ? <CircularProgress sx={{position: 'relative', left: '50%', top: '20%'}}/> :
            <>
              <ContinueButton endIcon={<ArrowForwardIosIcon />} sx={{alignSelf: 'flex-end', paddingTop: 0, marginBottom: '20px'}} onClick={goHome}>Continue Shopping</ContinueButton>
              <Checkout checkout={checkout} setCheckout={setCheckout} total={total} sections={sections} deliveryInfo={deliveryInfo}/>
            </>
          }
        </Stack>
      </Stack>
    </>
  );
}

export default Cart;

