import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

import { CircularProgress, Pagination } from '@mui/material';
import ProductCard from './ProductCard';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#F9FAF9',
    height: '850px',
    width: '60vw',

    border: '3px solid #89623D',
    borderRadius: '10px',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginTop: '30px',
  },
  title: {
    top: '20px',
    left: '20px',
    position: "relative",

    height: '35px',
    width: '170px',

    textAlign: 'center',

    backgroundColor: '#F9FAF9',

    fontFamily: 'Roboto',
    fontSize: '24px',
    fontWeight: 'bold',

    color: '#89623D',
  },
})

function ProductDashboard() {
  const classes = useStyles();
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loadingState, setLoadingState] = useState(true);

  React.useEffect(() => {
    const newProducts = allProducts.slice((page - 1) * 3, page * 3);
    setProducts(newProducts);
  }, [allProducts])

  React.useEffect(() => {
    const newProducts = allProducts.slice((page - 1) * 3, page * 3);
    setProducts(newProducts);
  }, [page])

  const handlePage = (event, value) => {
    setPage(value);
  }

  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/product/listall', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
        Accept: 'applicaton/json',
        'Content-Type': 'application/json'
      },
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          setAllProducts(res.product_list);
        })
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoadingState(false);
    })
  }, [])

  return (
    <div>
      {loadingState
        ? <div style={{ height: '100vh', backgroundColor: '#F9FAF9', paddingTop: '150px', display: 'flex', justifyContent: 'center' }}>
            <CircularProgress/>
          </div>
        : <> 
          <div className={classes.title}>
            Products
          </div>
          <div className={classes.root}>
            <div className={classes.container} >
              {products.map((data, index) => {
                return (
                    <ProductCard key={index} id={data} />
                )
              })}
            </div>
            <Pagination count={Math.ceil(allProducts.length / 3)} page={page} onChange={handlePage} />
          </div>
          </>
      }
    </div>
  )
}

export default ProductDashboard;