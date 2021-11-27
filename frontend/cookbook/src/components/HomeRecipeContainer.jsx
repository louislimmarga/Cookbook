import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import HomeRecipeCard from './HomeRecipeCard';

const useStyles = makeStyles(({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
}));

function HomeRecipeContainer({ recipesData }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {recipesData.map((recipe) => {
        return (
          <HomeRecipeCard data={recipe} key={recipe} />
        )
      })}
    </div>
  )
}

HomeRecipeContainer.propTypes = {
  recipesData: PropTypes.array,
}

export default HomeRecipeContainer;