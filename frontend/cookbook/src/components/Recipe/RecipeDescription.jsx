import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';
import { Stack, Rating, Avatar, Button } from '@mui/material';

import RoundButton from '../RoundButton';
import RecipeStepsContainer from './RecipeStepsContainer';

const useStyles = makeStyles({
  root: {
    width: '75%',
  },
  profile: {
    height: '80px',
    width: '80px',
    
    display: 'inline-block',
    margin: '20px',
    cursor: 'pointer',
  },
  preptime: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    color: '#9D9D9D',
  },
  unfollow: {
    background: '#F9FAF9',
    color: '#FE793D',
    border: '1px solid #E97048',
    borderRadius: '20px',
    backgroundColor: 'red',
    '&:hover': {
      backgroundColor: '#FFFFFF',
    },
    textTransform: 'none',
    fontsize: '18px',
    fontWeight: 'bold',
  }
})

function RecipeDescription({ recipe, selfId, following }) {
  const classes = useStyles();
  const history = useHistory();
  const [loadingState, setLoadingState] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [photo, setPhoto] = useState();
  const [follower, setFollower] = useState(0);

  React.useEffect(() => {
    if (recipe === undefined) {
      setLoadingState(true);
    } else {
      if (following.includes(recipe.owner_id)) {
        setIsFollowing(true);
      }

      fetch('http://127.0.0.1:5000/user/photo?user_id=' + recipe.owner_id, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
            Accept: 'applicaton/json',
            'Content-Type': 'application/json'
          },
        }).then((data) => {
          if (data.status === 200) {
            data.json().then((res) => {
              setPhoto(res.photo);
              setFollower(recipe.owner_follower);
            })
          }
        }).catch((err) => {
          console.log(err);
        }).finally(() => {
          setLoadingState(false);
        })
    }
  }, [recipe])

  const handleFollow = () => {
    const payload = {
      user_id: recipe.owner_id
    }

    fetch('http://127.0.0.1:5000/user/follow', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
          Accept: 'applicaton/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setIsFollowing(true);
        setFollower(follower + 1);
      })
  }

  const handleUnfollow = () => {
    const payload = {
      user_id: recipe.owner_id
    }

    fetch('http://127.0.0.1:5000/user/unfollow', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
          Accept: 'applicaton/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setIsFollowing(false);
        setFollower(follower - 1);
      })
  }

  const handleProfile = () => {
    history.push('/user/' + recipe.owner_id);
  }

  return (
    <div>
      {loadingState
        ? <>
          </>
        : <Stack className={classes.root}
            justifyContent="center"
            ml={3}
          > 
            <h2 style={{ marginBottom:'0', color: '#FE793D' }}>{recipe.title}</h2>
            <Divider 
              sx={{ backgroundColor:'#FE793D', height: '1px' }}
            />
            <div style={{ color: '#89623D' }}>
              <p>{recipe.intro}</p>
            </div>
      
            <Stack
              justifyContent="space-between"
              direction="row"
              sx={{ width:'90%' }}
            >
              <div style={{ color:'#89623D', fontSize:'18' }}>
                <p>Sold: {recipe.sold}</p>
                <p>Difficulty: {recipe.difficulty}/5</p>
              </div>
              <div style={{ color:'#89623D', fontSize:'18', display: 'flex', flexDirection: 'row' }}>
                <p>Rating: </p>
                <Rating name="read-only" value={recipe.rating} readOnly 
                    sx={{ margin: '10px' }}
                  />
              </div>
            </Stack>
      
            <Stack
              direction="row"
              sx={{ width:"90%" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack
                direction="row"
                alignItems="center"
              >
                <Avatar alt={recipe.owner_username} src={photo} sx={{ width: 70 ,height: 70 }} className={classes.profile} onClick={handleProfile}/>
                <Stack
                >
                  <p style={{ paddingTop:'10%', margin:'0', fontWeight: 'bold' }}>{recipe.owner_username}</p>
                  {recipe.owner_follower === -1
                    ? <></>
                    : <p style={{ paddingTop:'10%', margin:'0' }}>Followers:{follower}</p>
                  }
                </Stack>
              </Stack>
              <div>
                {selfId === recipe.owner_id | recipe.owner_follower === -1
                  ? <></>
                  : <>
                      {isFollowing
                        ? <Button sx={{ border: '1px solid #9EC2E6', borderRadius: '20px', color: '#2271B1', textTransform: 'none', fontsize: '18px', fontWeight: 'bold' }} variant= "outlined" onClick={handleUnfollow}> Unfollow </Button>
                        : <RoundButton name={"Follow"} onClick={handleFollow}/>
                      }
                    </>
                }
              </div>
            </Stack>
      
            <Stack
              alignItems="center"
            >
              <Divider 
                sx={{ backgroundColor:'#9D9D9D', height: '1px', width:'100%' }}
              />
              <div className={classes.preptime}>
                <h3>Prep time: {recipe.preptime}</h3>
                <h3>Cook time: {recipe.cooktime}</h3>
                <h3>Serves: {recipe.serves}</h3>
              </div>
              <Divider 
                sx={{ backgroundColor:'#9D9D9D', height: '1px', width:'100%' }}
              />
            </Stack>
      
            <Stack>
              <h2 style={{ marginBottom: '5px', color:'#89623D' }}>Steps</h2>
              <RecipeStepsContainer recipesData={recipe.steps} />
            </Stack>
          </Stack>
      }
    </div>
  )
}

RecipeDescription.propTypes = {
  recipe: PropTypes.object,
  selfId: PropTypes.string,
  following: PropTypes.array,
}

export default RecipeDescription;