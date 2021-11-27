import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    
    margin: '20px 50px 20px 50px',

    borderRadius: '5px',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',

    cursor: 'pointer',
    backgroundColor: '#F9FAF9',
    '&:hover': {
      backgroundColor: '#F9FAF9',
    }
  },
  thumbnail: {
    maxWidth: '250px',
    maxHeight: '250px',

  },
  text: {
    color: '#89623D',
    
  }
})

function RecommendationCard({ data }) {
  const classes = useStyles();
  const history = useHistory();

  const handleRecipe = () => {
    history.push('/recipe/' + data.index);
  }

  return (
    <div className={classes.root} onClick={handleRecipe}>
      <img src={data.picture} alt='thumbnail' className={classes.thumbnail} />
      <p className={classes.text}>{data.title}</p>
    </div>
  )
}

RecommendationCard.propTypes = {
  data: PropTypes.object
}

export default RecommendationCard;