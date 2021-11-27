import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import CloseSharpIcon from '@mui/icons-material/CloseSharp';

const useStyles = makeStyles(({
  root: {
    width: '35vw',
    padding: '20px',

    color: '#977554',
    backgroundColor: '#FFFFFF',

    borderRadius: '10px',

    wordWrap: 'break-word',
  },
}));

function AddRecipeStepsCard({ data, handleRemove }) {
  const classes = useStyles();
  return (
    <div style={{ display: 'flex' }}>
      <div className={classes.root}>
        {data}
      </div>
      <CloseSharpIcon sx={{ margin: '15px', cursor: 'pointer'}} onClick={() => handleRemove(data)} />
    </div>
  )
}

AddRecipeStepsCard.propTypes = {
  data: PropTypes.string,
  handleRemove: PropTypes.func
}

export default AddRecipeStepsCard;