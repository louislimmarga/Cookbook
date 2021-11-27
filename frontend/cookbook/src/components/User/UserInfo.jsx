import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Avatar, Button, Divider, Rating } from '@mui/material';

import SquareButton from '../SquareButton';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#FFFFFF',
    width: '70%',
    height: '200px',
    marginTop: '75px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '45%',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  block: {
    marginRight: '10%',
  },
})

function UserInfo({ user, following, avgrating }) {
  const classes = useStyles(); 
  const [isFollowing, setIsFollowing] = useState(false);
  const [lst, setLst] = useState(following);
  const [admin, setAdmin] = useState(false);
  const [loadingState, setLoadingState] = useState(true);

  React.useEffect(() => {
    if (user.admin === 'true') {
      setAdmin(true);
    }
    setLoadingState(false);
  }, [])

  const handleUnfollow = () => {
    const payload = {
      user_id: user.user_id
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
        setLst([]);
        setIsFollowing(false);
      })
  }

  const handleFollow = () => {
    const payload = {
      user_id: user.user_id
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
      })
  }

  React.useEffect(() => {
    
    setLst(following);
  }, [following])

  return (
    <div className={classes.root}>
      {loadingState
        ? <> </>
        : <>
          <div className={classes.container}>
            <div style={{ marginRight: '10%' }}> 
              <Avatar 
              alt={user.first_name}
              src={user.photo}
              sx={{ width:'6vw', height: '6vw' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', wordWrap:'break-word' }}>
              <div style={{ color:'#FE793D', fontWeight:'bold', fontSize: '24px',  }}>{user.first_name} {user.last_name}</div>
              <div style={{ color:'#89623D', display: 'flex' }}>
                <p style={{ marginRight: '50px' }}>Followers: {user.follower}</p>
              </div>
                {admin
                  ? <div style={{ color:'#FE793D' }}>Admin</div>
                  : <>
                    {user.email === ""
                      ? <>
                        {isFollowing | lst.includes(user.user_id)
                          ? <Button sx={{ 
                              width: '151px',
                              height: '45px', 
                              backgroundColor: '#755100',
                              color: "#ffffff",
                              borderRadius: '3px',
                              border: 'none',
                              textTransform: 'none',
                              fontSize: '18px',
                              fontWeight: '500',
                              '&:hover': {
                                backgroundColor: '#89623D',
                              },
                            }} onClick={handleUnfollow}>
                              Unfollow
                            </Button>
                          : <SquareButton name="Follow" onClick={handleFollow} />
                        }
                        </>
                        
                      : <div>
                        <p style={{ marginRight: '50px' }}>Email: {user.email}</p>
                        <p>Phone: {user.phone}</p>
                      </div>
                    }
                    </>
                }
                    
                
            </div>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem sx={{ borderColor:'#FE793D', }}/>
          <div className={classes.container}>
            <div>
              <div style={{ color:'#FE793D', fontWeight:'bold', fontSize: '24px' }}>Average Rating</div>
              <Rating 
                value={avgrating} 
                readOnly 
                sx={{ margin: '10px', fontSize:'2.5rem' }}
                size={"large"}
              />
            </div>
          </div>
          </>
      }
    
      
    </div>
  )
}

UserInfo.propTypes = {
  user: PropTypes.object,
  following: PropTypes.array,
  avgrating: PropTypes.number,
}

export default UserInfo;