/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import { Typography, Stack, Box } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import axios from 'axios';

import BuyRecipeModalCard from './BuyRecipeModalCard';
import RoundButton from '../RoundButton';
import LoadingDialog from '../LoadingDialog';


function BuyRecipeModal({ state, setState, recipe }) {
  const [loadingState, setLoadingState] = useState(true);
  const [ingredientList, setIngredientList] = useState([]);
  const [openLoading, setOpenLoading] = useState(false);
  let { recipeId } = useParams();
  React.useEffect(() => {
    if (recipe === undefined) {
      setLoadingState(true);
    } else {
      setLoadingState(false);
      setIngredientList(getItems);
    }
  }, [recipe, state])


  
  const handleClose = () => {
    setState(false);
    
  }
  
  const getItems = () => {
    const items = [];
    recipe['ingredients'].map((ingredient) => {
      items.push({
        "_id": ingredient['product_id'], 
        "quantity": ingredient['quantity'],
      })
    })
    return items;
  }

  const swapIngredient = (id, newId) => {
    const newList = [...ingredientList];
    newList.map(item => {
      if (item['_id'] === id) {
        item['_id'] = newId;
      }
    });
    setIngredientList(newList);
  }

  const addToCart = () => {
    setOpenLoading(true);
    const token = localStorage.getItem('cookbook-token');
    const headers =  {
      Authorization: `Bearer ${token}`,
    };
    const data = {
      "ingredients": ingredientList,
      "recipe_id": recipeId,
    }
    axios.post('http://127.0.0.1:5000/cart/add', data, {
      headers: headers,
    })
    .then(() => {
      setOpenLoading(true);
      handleClose();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const removeItem = (id) => {
    const newList = ingredientList.filter(item => item['_id'] !== id);
    setIngredientList(newList);
  }

  const changeQuantity = (id,event) => {
    const newList = [...ingredientList];
    newList.map(item => {
      if (item['_id'] === id) {
        item['quantity'] = parseInt(event.target.value);
      }
    });
    setIngredientList(newList);
  }

  return (
    <Drawer anchor="right" open={state} onClose={handleClose} PaperProps={{ sx: {width: '50vw', backgroundColor: '#C4C4C4'} }}>
      <LoadingDialog open={openLoading} />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        p={3}
        sx={{backgroundColor: '#FE793D', color: '#ffffff'}}
      >
        <Typography component="h1" variant="h5" sx={{fontWeight: 600}}>Ingredients</Typography>
        <CancelOutlinedIcon fontSize="large" onClick={handleClose} sx={{cursor: 'pointer'}}/>
      </Stack>
      <Stack
        direction="column"
        alignItems="center"
        p={2}
      >
        {loadingState
          ? <></>
          : <>
              {ingredientList.map((ingredient) => {
                return (
                  <BuyRecipeModalCard key={ingredient['_id']} id={ingredient['_id']} quantity={ingredient['quantity']} removeItem={removeItem} changeQuantity={changeQuantity} swapIngredient={swapIngredient}/>
                )
              })}
            </>
        }
        <Box mt={5}>
          <RoundButton name="Add to Cart" onClick={addToCart} />
        </Box>
      </Stack>
    </Drawer>
)
}

BuyRecipeModal.propTypes = {
  state: PropTypes.bool,
  setState: PropTypes.func,
  recipe: PropTypes.object,
}

export default BuyRecipeModal;