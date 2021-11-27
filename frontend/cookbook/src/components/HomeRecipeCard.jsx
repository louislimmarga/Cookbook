import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Rating } from '@mui/material';

const useStyles = makeStyles(({
  root: {
    width: '183px',
    height: '207px',

    margin: '20px 30px 20px 30px',

    border: '1px solid black',
    borderRadius: '5px',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '5px',

    cursor: 'pointer',
    backgroundColor: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#FFFFFF',
      border: '1px solid orange'
    },
    overflow: 'hidden',
  },
  thumbnail: {
    minWidth: '106px',
    minHeight: '106px',
    maxWidth: '106px',
    maxHeight: '106px',

    border: '1px solid black',
    borderRadius: '5px',

    marginTop: '15px',
  },
  title: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: '12px',
    color: '#89623D',
  },
  desc: {
    fontFamily: 'Roboto',
    fontSize: '12px',
    color: '#89623D',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  author: {
    fontFamily: 'Roboto',
    fontSize: '12px',
    color: '#000000',
  }
}));

function HomeRecipeCard({ data }) {
  const classes = useStyles();
  const history = useHistory();
  const [recipeData, setRecipeData] = useState({});
  const [loadingState, setLoadingState] = useState(true);
  const [rating, setRating] = useState(2);

  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/recipe/view?recipe_id=' + data, {
      method: 'GET',
      
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          setRecipeData(res);
          setRating(res.rating);
        })
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoadingState(false);
    })
  }, [])

  const handleRecipe = () => {
    history.push('/recipe/' + data);
  }

  return (
    <div className={classes.root}>
      {loadingState
        ? <div style={{ height: '207px', display: 'flex', alignItems: 'center' }}>
            <CircularProgress />
          </div>
        : <a href={'/recipe/' + data} style={{ display:'block', textDecoration: 'none', color:'#000000' }}>
            <div onClick={handleRecipe}>
              <img src={recipeData.photo} alt='thumbnail' className={classes.thumbnail} />
              <div className={classes.title}>{recipeData.title}</div>
              <div className={classes.desc}>
                <div style={{ marginRight: '5px' }}>Prep {recipeData.preptime} min</div>
                <div style={{ marginLeft: '5px' }}>Cook {recipeData.cooktime} min</div>
              </div>
              <div>
                <Rating name="read-only" value={rating} readOnly />
              </div>
              <div className={classes.author}>{recipeData.owner_username}</div>
            </div>
          </a>
      }
    </div>
  )
}

HomeRecipeCard.propTypes = {
  data: PropTypes.string
}

export default HomeRecipeCard;