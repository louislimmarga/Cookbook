import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Stack, Typography, Button, Box } from '@mui/material';
import PropTypes from 'prop-types';
import image from '../assets/cheese.png';


function IngredientCard({ ingredient, handleRemove }) {
  return (
    <Box mt={2} sx={{width: '781px'}}>
      <Typography component="p" sx={{color: '#9D9D9D', fontWeight: '600'}}>{ingredient.ingredient}</Typography>  
      <Card sx={{width: '100%', marginTop: '10px', display: 'flex', flexDirection:'row'}}>
        <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={image}
              alt="Ingredient Image"
        />
        <CardContent>
          <Stack
            direction="column"
            spacing={3}
            sx={{width: '250px'}}
          >
            <Typography variant="subtitle1" sx={{color: '#977554'}}>Best Parmesan Cheese</Typography>
            <Typography variant="subtitle1" sx={{color: '#977554'}}>$10</Typography>
          </Stack>
        </CardContent>
        <CardActions sx={{display: 'flex', flexDirection:'row', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
          {/* <Button sx={{color: '#FE793D', textTransform: 'none', fontSize: '18px'}}>Edit</Button> */}
          <Button sx={{color: '#FE793D', textTransform: 'none', fontSize: '18px'}} onClick={() => handleRemove(ingredient)} >Remove</Button>
        </CardActions>
      </Card>
    </Box>
  )
}

IngredientCard.propTypes = {
  ingredient: PropTypes.object,
  handleRemove: PropTypes.func,
}

export default IngredientCard;