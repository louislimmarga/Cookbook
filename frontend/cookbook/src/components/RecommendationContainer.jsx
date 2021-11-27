/* eslint-disable react/prop-types */
import React  from 'react';
import { makeStyles } from '@mui/styles';

import HomeRecipeContainer from '../components/HomeRecipeContainer';

const useStyles = makeStyles({
  root: {
    width: '100%',
    minWidth: '736px',
    display: 'flex',
    justifyContent: 'center',
  },
  header: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: '24px',

    color: '#FE793D',
  },
 
})

function RecommendationContainer({data}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <HomeRecipeContainer recipesData={data} />
    </div>
  )
}

export default RecommendationContainer;