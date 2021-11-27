import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import RecommendationContainer from '../RecommendationContainer';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: '30px',

    color: '#FE793D',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: '75px',
  },
  arrowLeft: {
    paddingRight: '1.5%',

    width: '24px',
    height: '24px',
    cursor: 'pointer',
  },
  arrowRight: {
    paddingLeft: '1.5%',

    width: '24px',
    height: '24px',
    cursor: 'pointer',
  },
})

function RecipeRecommendation({ id }) {
  const classes = useStyles();
  const [recipes, setRecipes] = useState([]);
  const [index, setIndex] = useState(0);
  const [loadingState, setLoadingState] = useState(true);
  // const recipeData = RecipeData.properties.slice(0,3);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/recommendation/recipe', {
      params: {recipe_id: id}
    })
    .then((res) => {
      setRecipes(res.data['recipe_list']);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoadingState(false);
      console.log(recipes);
    })
  }, []);

  const handleBack = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  }
  const handleForward = () => {
    if (index * 3 + 3 < recipes.length) {
      setIndex(index + 1);
    }
  }

  useEffect(() => {

  }, [index])

  return (
    <div className={classes.root}>
      <p className={classes.header}>Recommendations</p>
      {loadingState
        ? <></>
        : <div className={classes.container}>
            <ArrowBackIosIcon className={classes.arrowLeft}  onClick={handleBack}/>
            <RecommendationContainer data={recipes.slice(index*3, index*3 + 3)}/>
            <ArrowForwardIosIcon className={classes.arrowRight} onClick={handleForward}/>
          </div>
      }
    </div>
  )
}

RecipeRecommendation.propTypes = {
  id: PropTypes.string,
}
export default RecipeRecommendation;