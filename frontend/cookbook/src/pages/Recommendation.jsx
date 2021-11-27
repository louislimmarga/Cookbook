import React, { useState } from 'react';
import { Stack, Typography, Box } from '@mui/material';

import PreferenceDialog from '../components/PreferenceDialog';
import Navbar from '../components/Navbar';
import Notification from '../components/Notification';
import RoundButton from '../components/RoundButton';
import HomeRecipeContainer from '../components/HomeRecipeContainer';


function Recommendation() {
  const [open, setOpen] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: 'error',
  });

  const refreshPage = () => {
    window.location.reload(false);
  }
  return (
    <>
      <Navbar />
      <Notification notify={notify} setNotify={setNotify} />
      <PreferenceDialog open={open} setOpen={setOpen} setRecipes={setRecipes}/>
      <Stack
        direction="column"
        alignItems="center"
        pt={25}
        spacing={5}
        sx={{ backgroundColor:'#F9FAF9', minHeight: '90vh', paddingBottom: '20px' }}
      >
        <Typography component="h2" variant="h4" gutterBottom sx={{color: "#FE793D"}}>Recommendation</Typography>
        {recipes.length > 0 ? 
          <Box sx={{display: 'flex', flexWrap: 'wrap', width: '60%'}}>
            <HomeRecipeContainer recipesData={recipes} />
          </Box>
        :
          <Typography component="p" variant="h6" gutterBottom sx={{color: "#FE793D"}}>No recipe match with your preferences</Typography>
        }
        <RoundButton name='Recommend me' onClick={refreshPage} />
      </Stack>
    </>
  )
}

export default Recommendation;