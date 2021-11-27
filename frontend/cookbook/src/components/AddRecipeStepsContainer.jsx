import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';


import AddRecipeStepsCard from './AddRecipeStepsCard';
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

function AddRecipeStepsContainer({ recipesData, handleRemove }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {recipesData.map((step, index) => {
        return (
          <div key={index}>
            <p className={classes.title}>Step {index + 1}</p>
            <AddRecipeStepsCard data={step} handleRemove={handleRemove}/>
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

AddRecipeStepsContainer.propTypes = {
  recipesData: PropTypes.array,
  handleRemove: PropTypes.func
}

export default AddRecipeStepsContainer;