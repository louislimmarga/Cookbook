import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import OrderDetailProduct from './OrderDetailProduct';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',

    padding: '10px',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    gap: '10%',

    backgroundColor: 'white',

    borderTop: '1px solid grey',
    borderBottom: '1px solid grey',
  },
  thumbnail: {
    width: '85px',
    height: '85px',

    margin: '5px',

    border: '1px solid black'
  },
  title: {
    padding: '0px',
    cursor: 'pointer',
    '&:hover': {
      color: 'blue',
    },
  }
})

function OrderDetailCard({ id, products, subtotal }) {
  const classes = useStyles();
  const history = useHistory();
  const [detail, setDetail] = useState({});
  const [loadingState, setLoadingState] = useState(true);

  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/recipe/view?recipe_id=' + id, {
      method: 'GET',
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          setDetail(res);
        })
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoadingState(false);
    })
  }, [])

  const handleRedirect = () => {
    history.push('/recipe/' + id);
  }

  return (
    <div className={classes.root}>
      {loadingState
        ? <> </>
        : <>
            <div>
              <div className={classes.title} onClick={handleRedirect}>{detail.title}</div>
              <div>
                {products.map((data, index) => {
                  return (
                    <OrderDetailProduct key={index} detail={data} />
                  )
                })}
              </div>
              <div>Subtotal: ${subtotal}</div>
            </div>
          </>
      }
      
    </div>
  )
}

OrderDetailCard.propTypes = {
  id: PropTypes.string,
  products: PropTypes.array,
  subtotal: PropTypes.number,
}

export default OrderDetailCard;