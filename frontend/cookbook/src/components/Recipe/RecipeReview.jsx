import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import RecipeReviewContainer from './RecipeReviewContainer';
import AddComment from './AddComment';
import { CircularProgress, Divider, Pagination } from '@mui/material';
import RoundButton from '../RoundButton';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  textHolder: {
    width: '50%',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: '1',
  },
  text: {
    zIndex: '5',

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '25px',
  
    color: "#FFFFFF",
  },
})

function RecipeReview({ id }) {
  const classes = useStyles();
  const [allComments, setAllComments] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(false);
  const [loadingState, setLoadingState] = useState(true);
  const [page, setPage] = useState(1);

  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/recipe/comment_view?recipe_id=' + id, {
      method: 'GET',
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          setAllComments(res.comments);
        })
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoadingState(false);
    })
  }, [])

  const handlePage = (event, value) => {
    setPage(value);
  }

  React.useEffect(() => {
    const newComments = allComments.slice((page - 1) * 2, page * 2);
    setComments(newComments);
  }, [page])

  React.useEffect(() => {
    const newComments = allComments.slice((page - 1) * 2, page * 2);
    setComments(newComments);
  }, [allComments])

  return (
    <div>
    {loadingState
      ? <div style={{ height: '100vh', backgroundColor: '#F9FAF9', paddingTop: '150px', display: 'flex', justifyContent: 'center' }}>
          <CircularProgress
          />
        </div>
      : <div className={classes.root}>
          <div className={classes.textRow}>
            <div className={classes.textHolder}>
              <div className={classes.text}>Reviews ({allComments.length})</div>

              <div style={{width:'100%', height:'41px', marginTop: '-35px'}}>
                <div style={{ backgroundColor:'#C4C4C4', width: '80%', height:'100%' }}/>
              </div>

            </div>
            <div style={{ flex:'1' }}/>
          </div>
          
          <div style={{ width:'50%', margin: '30px' }}>
            <RecipeReviewContainer comments={comments} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Pagination count={Math.ceil(allComments.length / 2)} page={page} onChange={handlePage} />
              {!newComment && <RoundButton name="Add comment" onClick={() => setNewComment(true)} />}
            </div> 
            {newComment && <AddComment setAllComments={setAllComments} setNewComment={setNewComment} id={id}/>}
          </div>
          {/* <Pagination count={10} page={page} onChange={handlePage} /> */}
          

          <Divider 
            sx={{ backgroundColor:'9D9D9D', height: '1px', width: '50%' }}
          />
        </div>
    }
    </div>
  )
}

RecipeReview.propTypes = {
  id: PropTypes.string,
}

export default RecipeReview;