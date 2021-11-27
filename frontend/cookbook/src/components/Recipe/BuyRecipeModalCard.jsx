/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import { Card, CardContent, CardMedia, Stack, Typography, OutlinedInput, Box } from '@mui/material';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import RoundButton from '../RoundButton';
import SwapIngredientModal from './SwapIngredientModal';


function BuyRecipeModalCard({ id, quantity, removeItem, changeQuantity, swapIngredient}) {
  const [ingredientInfo, setIngredientInfo] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/product/view', {
      params: {product_id: id}
    })
    .then((res) => {
      // console.log(res.data);
      setIngredientInfo(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  const handleClose = () => {
    setOpen(!open);
  }

  return (
    <Card sx={{width: '100%', marginTop: '20px', display: 'flex', flexDirection:'row', position: 'relative'}}>
      <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={ingredientInfo['photo']}
            alt="Ingredient Image"
      />
      <CardContent>
        <Stack
          direction="column"
          spacing={3}
          sx={{width: '250px'}}
        >
          <Typography variant="h6" sx={{color: '#977554'}}>{ingredientInfo['title']}</Typography>
          <Typography variant="h6" sx={{color: '#977554'}}>$ {(ingredientInfo['price'] * quantity).toFixed(2)}</Typography>
        </Stack>
      </CardContent>
      <Box sx={{alignSelf: 'center'}}>
        <RoundButton name='Swap' onClick={() => setOpen(true)} />
      </Box>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h6" sx={{color: '#977554', alignSelf: 'center'}}>Quantity</Typography>
        <OutlinedInput value={quantity} type="number" onChange={(event) => changeQuantity(id, event)} sx={{borderRadius: '3px', width: "50%", backgroundColor:'#ffffff', color: '#000000'}} />
      </Stack>
      <CloseSharpIcon sx={{position: 'absolute', right: 0, padding: '10px', cursor: 'pointer'}} onClick={() => removeItem(id)}/>
      <SwapIngredientModal open={open} onClose={handleClose} ingredient={ingredientInfo} id={id} swapIngredient={swapIngredient}/>
    </Card>
  )
}

// BuyRecipeModalCard.propTypes = {
//   name: PropTypes.string,
// }

export default BuyRecipeModalCard;