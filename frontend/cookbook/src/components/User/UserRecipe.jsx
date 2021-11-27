import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import HomeRecipeContainer from '../HomeRecipeContainer';
import RoundButton from '../RoundButton';

const useStyles = makeStyles(({
  root: {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: '30px',
  
    color: '#FE793D',
  },
  container: {
    width: '100%',
    backgroundColor: '#F9FAF9',

    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '20px',
  },
}));

function UserRecipe({ allRecipes }) {
  const classes = useStyles();
  const [count, setCount] = useState(1);
  const [recipes, setRecipes] = useState([]);
  const [done, setDone] = useState(false);

  React.useEffect(() => {
    setRecipes([allRecipes.slice(0, 4)]);
  }, [allRecipes]);

  const showMore = () => {
    const newRecipes = [...recipes, allRecipes.slice(count * 4, (count + 1) * 4)];

    setCount(count + 1);
    setRecipes(newRecipes);
    
    if (allRecipes.length < (count + 1) * 4) {
      setDone(!done);
    }
  }

  return (
    <div className={classes.root}>
      <p className={classes.header}>Recipes</p>


      <div className={classes.container}>
        {recipes.map((recipe, index) => {
          return (
            <HomeRecipeContainer recipesData={recipe} key={index} />
          )
        })}
        {done
          ? <></>
          : <RoundButton name='Show More' onClick={showMore} />
        }
      </div>
      
    </div>
  )
}

UserRecipe.propTypes = {
  allRecipes: PropTypes.array,
}

export default UserRecipe;