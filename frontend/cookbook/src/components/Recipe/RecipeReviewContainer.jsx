import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import RecipeReviewCard from './RecipeReviewCard';

const useStyles = makeStyles({
  root: {
    width: '100%',

    marginBottom: '30px',
    
  }
})

function RecipeReviewContainer({ comments }) {
  const classes= useStyles();
  return (
    <div className={classes.root}>
      {comments.map((data, index) => {
        return (
          <RecipeReviewCard comment={data} key={index}/>
        )
      })}
    </div>
  )
}

RecipeReviewContainer.propTypes = {
  comments: PropTypes.array,
}

export default RecipeReviewContainer;