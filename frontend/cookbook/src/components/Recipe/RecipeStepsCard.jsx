import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(({
  root: {
    padding: '20px',

    color: '#977554',
    backgroundColor: '#FFFFFF',

    borderRadius: '10px'
  },
}));

function RecipeStepsCard({ data }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {data}
    </div>
  )
}

RecipeStepsCard.propTypes = {
  data: PropTypes.string
}

export default RecipeStepsCard;