import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Divider, Rating } from '@mui/material';

const useStyles = makeStyles({
  root: {
    width: '70%',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  container: {
    width: '90%',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subcontainer: {
    width: '40%',
    height: '20vw',
    margin: '2vw',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  picture: {
    height: '17vw',
    width: '17vw',
    border: '1px solid black',
  },
  header: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: '2vw',
  
    color: '#FE793D',
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    color:'#89623D', 
    fontSize:'18',
  }
})

function MostPopular() {
  const classes = useStyles();
  const location = useLocation();
  const id = (location.pathname.split('/')).pop();

  const [recipeId, setRecipeId] = useState();
  const [recipe, setRecipe] = useState({});
  const [loadingState, setLoadingState] = useState(true);
  const [rating, setRating] = useState(0);

  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/profile/most_popular?user_id=' + id, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
        Accept: 'applicaton/json',
        'Content-Type': 'application/json'
      },
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          setRecipeId(res.recipe_id);
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  React.useEffect(() => {
    if (typeof recipeId === "string") {
      fetch('http://127.0.0.1:5000/recipe/view?recipe_id=' + recipeId, {
        method: 'GET',
      }).then((data) => {
        if (data.status === 200) {
          data.json().then((res) => {
            setRecipe(res);
            setRating(res.rating);
          })
        }
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoadingState(false);
      })
    }
  }, [recipeId])

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      
      {loadingState
        ? <> </>
        : <>
          <p className={classes.header}>Most Popular</p>
          <div className={classes.root}>
            <div className={classes.container}>
              <div className={classes.subcontainer}>
                <img src={recipe.photo} alt='thumbnail' className={classes.picture} />
              </div>
              <Divider orientation="vertical" variant="middle" flexItem sx={{ borderColor:'#FE793D' }}/>
              <div className={classes.subcontainer}>
                <p className={classes.header}>{recipe.title}</p>
                <div className={classes.text}>
                  <p>Sold: {recipe.sold}</p>
                  <p>Difficulty: {recipe.difficulty} / 5.0</p>
                  <p>
                    <Rating 
                      name="read-only"
                      value={rating} 
                      readOnly 
                      size={"large"}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
          </>
      }
    </div>
  )
}

export default MostPopular;