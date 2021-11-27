/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@mui/styles';
import { Stack, Typography } from '@mui/material';

const useStyles = makeStyles(({
  circle: {
    borderRadius: '50%',
    height: '90px',
    width: '90px',

    display: 'inline-block',
    margin: '20px',
  },
}));

function CategoryCircle({label, src}) {
  const classes = useStyles();
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
    >
      <img className={classes.circle} src={src} />
      <Typography component="p" sx={{fontWeight: 'bold'}}>{label}</Typography>
    </Stack>
  )
}

export default CategoryCircle;