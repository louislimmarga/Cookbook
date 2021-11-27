/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Card, CardActions, CardContent, CardMedia, Stack, Typography, Button, Box } from '@mui/material';

function IngredientModalCard({id, setSelected}) {
  const [ingredientInfo, setIngredientInfo] = useState({});
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/product/view', {
      params: {product_id: id}
    })
    .then((res) => {
      setIngredientInfo(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  const handleSelect = () => {
    if (setSelected !== undefined) {
      setSelected({
        isSelected: true,
        product_id: id,
      })
    }
  }

  return (
    <Box mt={2} sx={{width: '400px', }}>
      <Card sx={{width: '100%', marginTop: '10px', display: 'flex', flexDirection:'row'}}>
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
          >
            <Typography variant="subtitle1" sx={{color: '#977554', wordWrap: 'break-word'}}>{ingredientInfo['title']}</Typography>
            <Typography variant="subtitle1" sx={{color: '#977554'}}>$ {ingredientInfo['price']}</Typography>
          </Stack>
        </CardContent>
      </Card>
      <CardActions sx={{display: 'flex', flexDirection:'row', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
        <Button sx={{color: '#FE793D', textTransform: 'none', fontSize: '18px'}} onClick={handleSelect}>Select</Button>
      </CardActions>
    </Box>
  )
}

export default IngredientModalCard;