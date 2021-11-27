import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CustomTextField from "../TextField/CustomTextField";
import SquareButton from '../SquareButton';
import { Rating } from '@mui/material';
import Notification from '../Notification';

function AddComment({ setAllComments, setNewComment, id }) {
  const [comment, setComment] = useState('');
  const [value, setValue] = React.useState(2);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: 'error',
  });
  
  const handlePost = () => {
    console.log(localStorage.getItem("test"));
    if (localStorage.getItem("cookbook-token") === null ) {
      setNotify({
        isOpen: true,
        message: 'Login to post comment',
        type: 'error',
      });
      return;
    }
    if (comment !== '') {
      const body = {
        "comment": comment,
        "rating": value,
        "recipe_id": id
      }
      fetch('http://127.0.0.1:5000/recipe/comment', {
        method:'POST',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
          Accept: 'applicaton/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then((data) => {
        if (data.status === 200) {
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
          })
        }
      })
    }
    setNewComment(false);
  }

  const handleCancel = () => {
    setNewComment(false);
  }

  return (
    <>
    <div>
      <CustomTextField id="newComment" name="New Comment" multiline value={comment} setValue={setComment} width="781px"/>
      <Rating
      name="simple-controlled"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      size="large"
    />
    </div>
    <div style={{ display: 'flex', gap: '10px' }}>
      <SquareButton name="Post" onClick={handlePost} />
      <SquareButton name="Cancel" onClick={handleCancel} />
    </div>
    <Notification notify={notify} setNotify={setNotify} />
    </>
  )
}

AddComment.propTypes = {
  setAllComments: PropTypes.func,
  setNewComment: PropTypes.func,
  id: PropTypes.string
}

export default AddComment;