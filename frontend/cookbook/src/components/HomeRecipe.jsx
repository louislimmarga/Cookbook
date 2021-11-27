import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

import RoundButton from './RoundButton';
import HomeRecipeContainer from './HomeRecipeContainer';
import { CircularProgress } from '@mui/material';

const useStyles = makeStyles(({
  root: {
    width: '100%',
    flexDirection: 'column',
    display: 'flex',
  },
  textHolder: {
    width: '31%',
    height: '41px',
    left: '0px',
    top: '507px',
    textAlign: 'right',
    background: '#C4C4C4',
  },
  text: {
    paddingTop: '6px',
    paddingRight: '100px',
  
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '25px',
  
    color: "#FFFFFF",
  },
  container: {
    width: '100%',
    backgroundColor: '#F9FAF9',

    paddingTop: '20px',
    paddingBottom: '20px',

    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '20px',
  },
  recommendationContainer: {
    width: '60%',
    alignSelf: 'center',
    backgroundColor: '#F9FAF9',

    paddingTop: '20px',
    paddingBottom: '20px',

    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '20px',
  },
}));

function HomeRecipe() {
  const classes = useStyles();
  const [count, setCount] = useState(1);
  const [allRecipes, setAllRecipes] = useState([])
  const [recipes, setRecipes] = useState([]);
  const [done, setDone] = useState(false);
  const [loadingState, setLoadingState] = useState(true);
  const [recommendation, setRecommendation] = useState([]);
  const [recommendationCount, setRecommendationCount] = useState(1);
  const [recommendationDone, setRecommendationDone] = useState(false);
  const [allFollowing, setAllFollowing] = useState([])
  const [following, setFollowing] = useState([]);
  const [followingCount, setFollowingCount] = useState(1);
  const [followingDone, setFollowingDone] = useState(false);

  React.useEffect(() => {
    if (localStorage.getItem('cookbook-token') !== null) {
      fetch('http://127.0.0.1:5000/recommendation/user_following', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
          Accept: 'applicaton/json',
          'Content-Type': 'application/json'
        },
      }).then((data) => {
        if (data.status === 200) {
          data.json().then((res) => {
            setAllFollowing(res.recipe_ids);
          })
        }
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoadingState(false);
      })
    }
  }, [])

  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/recipe/listall', {
      method: 'GET',
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          setAllRecipes(res.recipe_list);
        })
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoadingState(false);
    })
  }, []);

 React.useEffect(() => {
    const token = localStorage.getItem('cookbook-token');
    if (token) {
      const auth = {"Authorization": `Bearer ${token}`};
      axios.get('http://127.0.0.1:5000/recommendation/history', {headers: auth})
      .then((res) => {
        setRecommendation(res.data['recipe_ids']);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, []);

  React.useEffect(() => {
    setRecipes([allRecipes.slice(0, 4)]);
  }, [allRecipes]);

  const showMore = () => {
    const newRecipes = [...recipes, allRecipes.slice(count * 4, (count + 1) * 4)];

    setCount(count + 1);
    setRecipes(newRecipes);
    
    if (allRecipes.length < (count + 1) * 4) {
      setDone(!done);
    }
  }

  React.useEffect(() => {
    setFollowing([allFollowing.slice(0, 4)]);
  }, [allFollowing]);

  const showMoreFollowing = () => {
    const newFollowing = [...following, allFollowing.slice(followingCount * 4, (followingCount + 1) * 4)];

    setFollowingCount(followingCount + 1);
    setFollowing(newFollowing);
    
    if (allFollowing.length < (followingCount + 1) * 4) {
      setFollowingDone(!done);
    }
  }

  const showMoreRecommendation = () => {
    setRecommendationCount(recommendationCount + 1);
    
    if (recommendation.length < (recommendationCount + 1) * 4) {
      setRecommendationDone(!done);
    }
  }

  return (
    <div className={classes.root}>
      {localStorage.getItem('cookbook-token') === null
        ? <>
          <div className={classes.textHolder}>
            <div className={classes.text}>All Recipes</div>
          </div>
          {loadingState
            ? <div style={{ height: '30vh', backgroundColor: '#F9FAF9', display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </div>
            : <div className={classes.container}>
                {recipes.map((recipe, index) => {
                  return (
                    <HomeRecipeContainer recipesData={recipe} key={index} />
                  )
                })}
                {done
                  ? <></>
                  : <RoundButton name='Show More' onClick={showMore} />
                }
              </div>
          }
          </>
        : <>
          <div className={classes.textHolder}>
            <div className={classes.text}>All Recipes</div>
          </div>
          <div className={classes.container}>
            {recipes.map((recipe, index) => {
              return (
                <HomeRecipeContainer recipesData={recipe} key={index} />
              )
            })}
            {done
              ? <></>
              : <RoundButton name='Show More' onClick={showMore} />
            }
          </div>
          
          <div className={classes.textHolder}>
            <div className={classes.text}>Following</div>
          </div>
          {loadingState
            ? <div style={{ height: '30vh', backgroundColor: '#F9FAF9', display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </div>
            : <div className={classes.container}>
              {following.map((recipe, index) => {
                return (
                  <HomeRecipeContainer recipesData={recipe} key={index} />
                )
              })}
              {followingDone
                ? <></>
                : <RoundButton name='Show More' onClick={showMoreFollowing} />
              }
            </div>
          }
          <div className={classes.textHolder}>
            <div className={classes.text}>Recommendation</div>
          </div>
          {loadingState
            ? <div style={{ height: '30vh', backgroundColor: '#F9FAF9', display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </div>
            : <div className={classes.recommendationContainer}>
                <HomeRecipeContainer recipesData={recommendation.slice(0, recommendationCount*4+4)}/>
              {recommendationDone
                ? <></>
                : <RoundButton name='Show More' onClick={showMoreRecommendation} />
              }
            </div>
          }
          </>
      }
    </div>
  )
}

export default HomeRecipe;