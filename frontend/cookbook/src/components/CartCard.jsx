/* eslint-disable react/prop-types */
import React from 'react';
import { Card, CardContent, CardMedia, Stack, Typography, OutlinedInput } from '@mui/material';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';


function CartCard({ ingredient, recipeId, removeIngredient, changeQuantity }) {
  return (  
    <Card sx={{width: '100%', marginTop: '20px', display: 'flex', flexDirection:'row', position: 'relative'}}>
      <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={ingredient['photo']}
            alt="Ingredient Image"
      />
      <CardContent>
        <Stack
          direction="column"
          spacing={3}
          sx={{width: '250px'}}
        >
          <Typography variant="h6" sx={{color: '#977554'}}>{ingredient['title']}</Typography>
          <Typography variant="h6" sx={{color: '#977554'}}>$ {parseFloat(ingredient['subtotal']).toFixed(2)}</Typography>
        </Stack>
      </CardContent>
      {/* <Typography variant="h6" sx={{color: '#977554', alignSelf: 'center'}}>Quantity: {ingredient['quantity']}</Typography> */}
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h6" sx={{color: '#977554', alignSelf: 'center'}}>Quantity</Typography>
        <OutlinedInput value={ingredient['quantity']} type="number" onChange={(event) => changeQuantity(ingredient['_id'], recipeId, event)} sx={{borderRadius: '3px', width: "50%", backgroundColor:'#ffffff', color: '#000000'}} />
      </Stack>
      <CloseSharpIcon onClick={() => removeIngredient(ingredient['_id'], recipeId)} sx={{position: 'absolute', right: 0, padding: '10px', cursor: 'pointer'}}/>
    </Card>
  )
}

export default CartCard;