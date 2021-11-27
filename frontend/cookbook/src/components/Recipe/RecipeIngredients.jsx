import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import RoundButton from '../RoundButton';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textHolder: {
    width: '100%',
    height: '41px',
  },
  text: {
    top: '640px',
    position: "absolute",
    
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '25px',
  
    color: "#FFFFFF",
  },
  ingredientsText: {
    backgroundColor: '#FFFFFF',
    width: '56%',

    marginTop: '10px',
    marginBottom: '15px',

    padding: '2%',

    fontFamily: 'Roboto',
    fontSize: '14px',
    color: '#89623D',

    lineHeight: '0.4',
  },
});

function RecipeIngredients({ setState, recipe }) {
  const classes = useStyles();
  const history = useHistory();
  const token = localStorage.getItem('cookbook-token');
  const [loadingState, setLoadingState] = useState(true);

  React.useEffect(() => {
    if (recipe === undefined) {
      setLoadingState(true);
    } else {
      setLoadingState(false);
    }
  }, [recipe])

  const buyRecipe = () => {
    if (token !== null) {
      setState(true);
    } else {
      history.push('/login');
    }
  }

  return (
    <div>
      {loadingState
        ? <>
          </>
        : <div className={classes.root}>
            <img src={recipe.photo} alt='thumbnail' style={{ width:'415px', height:'415px', border:'1px solid', borderRadius:'7px', marginBottom:'20px' }} />
      
            <div className={classes.text}>Ingredients</div>
            <div className={classes.textHolder}>
              <div style={{ backgroundColor:'#C4C4C4', width: '80%', height:'100%' }} />
              <div style={{ width:'20%' }} />
            </div>
            
            <div className={classes.ingredientsText}>
              {recipe.ingredients.map((ingredient) => {
                return (
                  <p key={ingredient['product_id']}>{ingredient['ingredient']}</p>
                )
              })}
            </div>
      
            <RoundButton name='Buy Recipe' onClick={buyRecipe} />
          </div>

      }
    </div>
  )
}

RecipeIngredients.propTypes = {
  setState: PropTypes.func,
  recipe: PropTypes.object
}

export default RecipeIngredients;
