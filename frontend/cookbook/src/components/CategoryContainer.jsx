import React from 'react';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

import CategoryCircle from './CategoryCircle';
import chickenLabel from '../assets/chicken-category.jpg';
import beefLabel from '../assets/beef-category.jpg';
import vegetarianLabel from '../assets/vegetarian-category.jpg';
import seafoodLabel from '../assets/seafood-category.jpg';
import breakfastLabel from '../assets/breakfast-category.jpg';
import lunchLabel from '../assets/lunch-category.jpg';
import dinnerLabel from '../assets/dinner-category.jpg';
import dessertLabel from '../assets/dessert-category.jpg';

const useStyles = makeStyles(({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  link: {
    color: '#FE793D',
  }
}));

function Category() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Link to="/search?searchTerm=Chicken&label=true" className={classes.link}>
        <CategoryCircle label="Chicken" src={chickenLabel}/>
      </Link>
      <Link to="/search?searchTerm=Beef&label=true" className={classes.link}>
        <CategoryCircle label="Beef" src={beefLabel}/>
      </Link>
      <Link to="/search?searchTerm=Vegetearian&label=true" className={classes.link}>
        <CategoryCircle label="Vegetearian" src={vegetarianLabel}/>
      </Link>
      <Link to="/search?searchTerm=Seafood&label=true" className={classes.link}>
        <CategoryCircle label="Seafood" src={seafoodLabel}/>
      </Link>
      <Link to="/search?searchTerm=Breakfast&label=true" className={classes.link}>
        <CategoryCircle label="Breakfast" src={breakfastLabel}/>
      </Link>
      <Link to="/search?searchTerm=Lunch&label=true" className={classes.link}>
        <CategoryCircle label="Lunch" src={lunchLabel}/>
      </Link>
      <Link to="/search?searchTerm=Dinner&label=true" className={classes.link}>
        <CategoryCircle label="Dinner" src={dinnerLabel}/>
      </Link>
      <Link to="/search?searchTerm=Dessert&label=true" className={classes.link}>
        <CategoryCircle label="Dessert" src={dessertLabel}/>
      </Link>
    </div>
  )
}

export default Category;