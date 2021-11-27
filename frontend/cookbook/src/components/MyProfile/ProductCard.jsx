import React, { useState } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import RoundButton from "../RoundButton";
import { Skeleton, Stack } from "@mui/material";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#FFFFFF',
    width: '80%',

    borderRadius: '10px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',

    margin: '20px',
    padding: '30px 30px 30px 30px',

    display: 'flex',
  },
  block: {
    height: '150px',
    marginLeft: '2vw',
    marginRight: '2vw',

    wordWrap: 'break-word',
  }
})

function ProductCard({ id }) {
  const classes = useStyles();
  const history = useHistory();
  const [loadingState, setLoadingState] = useState(true);
  const [product, setProduct] = useState({});
  const [labels, setLabels] = useState([]);

  const handleEdit = () => {
    history.push('/product/add', {
      id: id,
      productName: product.title,
      photo: product.photo,
      description: product.description,
      labels: product.labels,
      price: product.price,
    });
  }

  React.useEffect(() => {
    setLoadingState(true);
  }, [id])

  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/product/view?product_id=' + id, {
      method: 'GET',
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          setProduct(res);
          setLabels(res.labels);
        })
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoadingState(false);
    })
  }, [id])

  return (
    <div className={classes.root}>
      {loadingState
        ? <>
            <div className={classes.block}>
              <Skeleton height="7vw" width="7vw" />
            </div>
            <div className={classes.block} style={{ width:'14vw'}} >
              <div style={{ color:'#FE793D', fontWeight:'bold' }}>Product Name</div>
              <Skeleton width="100%" />
              <div style={{ height:'50px' }}></div>
              <div style={{ color:'#FE793D', fontWeight:'bold' }}>Price</div>
              <Skeleton width="100%" />
            </div>
            <div className={classes.block} style={{ width:'22vw'}} >
              <div style={{ color:'#89623D', fontWeight:'bold' }}>Owner</div>
              <Skeleton width="100%" />
              <div style={{ height:'20px' }}></div>
              <div style={{ color:'#89623D', fontWeight:'bold' }}>Description</div>
              <Skeleton width="100%" />
              <div style={{ height:'20px' }}></div>
            </div>
            <div className={classes.block}>
              <Stack
                spacing={1}
              >
                <RoundButton name="Edit"/>
              </Stack>
            </div>
          </>
        : <>
            <div className={classes.block}>
              <img src={product.photo} alt='thumbnail' style={{ minWidth:'7vw', minHeight:'7vw', width:'7vw', height:'7vw', border:'1px solid', borderRadius:'7px' }} />
            </div>
            <div className={classes.block} style={{ width:'14vw'}} >
              <div style={{ color:'#FE793D', fontWeight:'bold' }}>Product name</div>
              <div style={{ color:'#89623D', paddingLeft: '15px' }}>{product.title}</div>
              <div style={{ height:'20px' }}></div>
              <div style={{ color:'#FE793D', fontWeight:'bold' }}>Price</div>
              <div style={{ color:'#89623D', paddingLeft: '15px' }}>${product.price}</div>
            </div>
            <div className={classes.block} style={{ width:'20vw'}} >
              <div style={{ color:'#89623D', fontWeight:'bold' }}>Description</div>
              <div>{product.description}</div>
              <div style={{ height:'20px' }}></div>
              <div style={{ color:'#89623D', fontWeight:'bold' }}>Labels</div>
              <div>
                {labels.map((data) => {
                  return (
                    <>{data}</>
                  )
                })}
              </div>
            </div>
            <div className={classes.block} style={{ width:'4vw' }}>
              <Stack
                spacing={1}
              >
                <RoundButton name="Edit" onClick={handleEdit}/>
              </Stack>
            </div>
          </>
      }
    </div>
  )
}

ProductCard.propTypes = {
  id: PropTypes.string,
}

export default ProductCard;