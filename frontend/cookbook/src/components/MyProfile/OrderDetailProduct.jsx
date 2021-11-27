import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    borderRadius: '5px',
    width: '30vw',
    margin: '10px auto 10px auto',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10%',

    backgroundColor: 'white',
    border: '1px solid grey',

    fontSize: '14px',
  },
  thumbnail: {
    width: '85px',
    height: '85px',

    margin: '5px',

  }
})

function OrderDetailProduct({ detail }) {
  const classes = useStyles();
  const [loadingState, setLoadingState] = useState(true);

  React.useEffect(() => {
    setLoadingState(false);
  }, [detail])

  return (
    <div className={classes.root}>
      {loadingState
        ? <> </>
        : <>
            <img src={detail.photo} alt='thumbnail' className={classes.thumbnail}/>
            <div>
              <div>{detail.title}</div>
              <div>Price: ${detail.price}</div>
              <div>Quantity: {detail.quantity}</div>
              <div>Subtotal: ${detail.subtotal}</div>
            </div>
          </>
      }
      
    </div>
  )
}

OrderDetailProduct.propTypes = {
  detail: PropTypes.object,
}

export default OrderDetailProduct;