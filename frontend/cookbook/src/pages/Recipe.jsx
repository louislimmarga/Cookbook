import React, { useState } from 'react';
import { CircularProgress, Stack } from '@mui/material';
import { useLocation } from 'react-router-dom';

import Navbar from '../components/Navbar';
import RecipeIngredients from '../components/Recipe/RecipeIngredients';
import RecipeDescription from '../components/Recipe/RecipeDescription';
import RecipeReview from '../components/Recipe/RecipeReview';
import RecipeRecommendation from '../components/Recipe/RecipeRecommendation';
import BuyRecipeModal from '../components/Recipe/BuyRecipeModal';

function Recipe() {
  const location = useLocation();
  const recipeId = (location.pathname.split('/')).pop();
  const [recipe, setRecipe] = useState();
  const [state, setState] = useState(false);
  const [loadingState, setLoadingState] = useState(true);
  const [id, setId] = useState();
  const [following, setFollowing] = useState([]);

  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/recipe/view?recipe_id=' + recipeId, {
      method: 'GET',
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          setRecipe(res);
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/id/check', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
        Accept: 'applicaton/json',
        'Content-Type': 'application/json'
      }
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          setId(res.id);
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }, [recipe])

  React.useEffect(() => {
    if (id !== undefined) {
      fetch('http://127.0.0.1:5000/user/listfollow?user_id=' + id, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
          Accept: 'applicaton/json',
          'Content-Type': 'application/json'
        }
      }).then((data) => {
        if (data.status === 200) {
          data.json().then((res) => {
            setFollowing(res.following);
          })
        }
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoadingState(false);
      })
    }
  }, [id])

  return (
    <div style={{ backgroundColor:'#F9FAF9', minHeight: '100vh' }}>
      <Navbar />
      {loadingState
        ? <div style={{ height: '100vh', backgroundColor: '#F9FAF9', paddingTop: '150px', display: 'flex', justifyContent: 'center' }}>
            <CircularProgress
            />
          </div>
        
        : <div style={{ backgroundColor: '#F9FAF9' }}>
          <Stack
            pt={25}
            spacing={5}
            sx={{ backgroundColor:'#F9FAF9' }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ width: '100%' }}
            >
              <Stack
                sx={{ width: '50%' }}
              >
                <RecipeIngredients setState={setState} recipe={recipe} />
              </Stack>
              <Stack
                sx={{ width: '50%' }}
              >
                <RecipeDescription recipe={recipe} selfId={id} following={following}/>
              </Stack>
            </Stack>
            
            <Stack
              sx={{ width:'100%' }}
              pt={10}
            >
              <RecipeReview id={recipeId}/>
            </Stack>

            <Stack
              sx={{ width:'100%' }}
              pt={10}
            >
                <RecipeRecommendation id={recipeId}/>
            </Stack>
          </Stack>
          <BuyRecipeModal state={state} setState={setState} recipe={recipe}/>
        </div>
      }
    </div>
  )
}

export default Recipe;