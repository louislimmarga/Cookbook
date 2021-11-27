import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Stack, Typography, Box, CircularProgress } from '@mui/material';

import Navbar from '../components/Navbar';
import HomeRecipeContainer from '../components/HomeRecipeContainer';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function RecipeSearch() {
  let query = useQuery();
  const label = query.get('label');
  const search = query.get('searchTerm');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const URI = (label == 'false') ? "http://127.0.0.1:5000/recipe/search_keyword" : "http://127.0.0.1:5000/recipe/search_label";
    console.log(label, URI);
    axios.get(URI, {
    params: {keyword: search, label: search},
    })
      .then((res) => {
        console.log(res.data);
        setRecipes(res.data['recipe_ids']);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search, label]);
  return (
    <>
      <Navbar />
      <Stack
        direction="column"
        alignItems="center"
        pt={25}
        spacing={5}
        sx={{ backgroundColor:'#F9FAF9', minHeight: '90vh' }}
      >
        <Typography component="h2" variant="h4" gutterBottom sx={{color: "#FE793D"}}>Search Result for &quot;{search}&quot;</Typography>
      {loading ? <CircularProgress sx={{position: 'relative'}}/> :
        recipes.length > 0 ? 
          <Box sx={{display: 'flex', flexWrap: 'wrap', width: '60%'}}>
            <HomeRecipeContainer recipesData={recipes} />
          </Box>
          :
          <Typography component="p" variant="h6" gutterBottom sx={{color: "#FE793D"}}>No result found</Typography>
        
      }
      </Stack>
    </>
  )
}

export default RecipeSearch;