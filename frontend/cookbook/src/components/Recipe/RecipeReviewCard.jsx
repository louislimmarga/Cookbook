import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Avatar, Divider, Rating } from '@mui/material';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',

    marginBottom: '30px',
    
    backgroundColor: '#FFFFFF',

    display: 'flex',
    gap: '15px',
  },
  block: {
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    padding: '20px',

    gap: '5px',
  },
  text: {
    width: '55vh',
    wordWrap: 'break-word'
  }
})

function RecipeReviewCard({ comment }) {
  const classes = useStyles();
  const history = useHistory();
  const [photo, setPhoto] = useState();
  const [loadingState, setLoadingState] = useState(true);

  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/user/photo?user_id=' + comment.user_id, {
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
        })
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoadingState(false);
    })
  }, [])

  const handleUser = () => {
    history.push('/user/' + comment.user_id);
  }
  return (
    <div className={classes.root}>
      <a href={'/user/' + comment.user_id} className={classes.block} style={{ textDecoration: 'none', color:'#000000', marginLeft:'75px' }}>
          {loadingState
            ? <Avatar sx={{ width: 60, height: 60 }} />
            : <Avatar src={photo} sx={{ width: 60, height: 60 }} />
          }
      </a>
      <div className={classes.block} style={{ width:'10vh', wordWrap:'break-word '}} onClick={handleUser}>
        {comment.username}
      </div>
      <Divider orientation="vertical" variant="middle" flexItem/>
      <div className={classes.block}>
        <div style={{ marginLeft: '2px' }}>Posted: {comment.time}</div>
        <Rating name="read-only" value={comment.rating} readOnly size="small"/>
        <div className={classes.text} style={{ marginLeft: '2px' }}>{comment.comment}</div>
      </div>
    </div>
  )
}

RecipeReviewCard.propTypes = {
  comment: PropTypes.object,
}

export default RecipeReviewCard;