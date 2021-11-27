import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';


import RecipeStepsCard from './RecipeStepsCard';
import { Stack } from '@mui/material';
// import SquareButton from './SquareButton';


const useStyles = makeStyles(({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  title: {
    color: '#9D9D9D',
    fontSize: '18px',
  },
  buttons: {

  }
}));

function RecipeStepsContainer({ recipesData }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {recipesData.map((step, index) => {
        return (
          <div key={index}>
            <p className={classes.title}>Step {index + 1}</p>
            <RecipeStepsCard data={step}/>
            <Stack direction="row" spacing={2} mt={2}>
              {/* <SquareButton name="Edit" />
              <SquareButton name="Remove" /> */}
            </Stack>
          </div>
        )
      })}
    </div>
  )
}

RecipeStepsContainer.propTypes = {
  recipesData: PropTypes.array,
  // setRemove: PropTypes.func
}

export default RecipeStepsContainer;