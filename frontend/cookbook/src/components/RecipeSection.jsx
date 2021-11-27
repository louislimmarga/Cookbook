/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import { Divider, Paper, Stack, Typography, CircularProgress, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

import CartCard from '../components/CartCard';

function RecipeSection({recipeId, ingredients, removeIngredient, changeQuantity}) {
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/recipe/view', {
      params: {recipe_id: recipeId}
    })
    .then((res) => {
      // console.log(res.data);
      setRecipeInfo(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    })
  }, [])

  return (
    <Paper sx={{width: "90%", padding: '20px', marginBottom: '10px'}}>
      {loading ? <CircularProgress sx={{position: 'relative', left: '50%', top: '20%'}}/> :
        <Stack
          direction="row"
          alignItems="center"
          sx={{height: 'auto', marginBottom: '16px'}}
        >
          <img src={recipeInfo['photo']} alt='thumbnail' style={{ width:'120px', height:'120px', borderRadius:'3px', marginBottom:'20px' }} />
          <Link to={`/recipe/${recipeId}`}>
            <Typography component="p" variant="h6" gutterBottom sx={{ padding: '20px'}}>{recipeInfo['title']}</Typography>
          </Link>
          <Stack
            alignSelf='flex-start'>
            <Typography component="p" variant="p" gutterBottom sx={{ padding: '20px'}}>Quantity per Recipe:</Typography>
            {recipeInfo['ingredients'].map(ingredient =>
              <Box key={ingredient['product_id']} sx={{display: 'flex', flexDirection: 'row'}}>
                <Typography component="p" variant="p" gutterBottom sx={{padding: '0 20px', fontSize: '14px'}}>{ingredient['product_name']}:</Typography>
                <Typography component="p" variant="p" gutterBottom sx={{fontWeight: 700, fontSize: '14px'}}>{ingredient['quantity']}</Typography>
              </Box>
            )}
          </Stack>
        </Stack>
      }
      <Divider sx={{border: "1.5px solid", borderRadius: '5px'}}/>
      {ingredients.map(ingredient => <CartCard removeIngredient={removeIngredient} recipeId={recipeId} ingredient={ingredient} key={ingredient['_id']} changeQuantity={changeQuantity} />)}
    </Paper>
  )
}

export default RecipeSection;