import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

import { CircularProgress, TextField, Stack, Box, FormLabel } from '@mui/material';
import RoundButton from '../RoundButton';
import SearchBar from "../SearchBar";
import IngredientModalCard from "../IngredientModalCard";

const useStyles = makeStyles({
  root: {
    backgroundColor: '#F9FAF9',
    height: '100%',
    width: '60vw',

    border: '3px solid #89623D',
    borderRadius: '10px',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center ',

    marginTop: '30px',
    marginBottom: '30px',

    color:'#FE793D', 
    fontWeight:'bold',
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

function SalesDashboard() {
  const classes = useStyles();
  const [loadingState, setLoadingState] = useState(true);
  const [total, setTotal] = useState();
  const [initialDate, setInitialDate] = useState();
  const [endDate, setEndDate] = useState();
  const [totalDate, setTotalDate] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [selected, setSelected] = useState({
    isSelected: false,
    product_id: '',
  });

  const [totalError, setTotalError] = useState('');
  const [dateError, setDateError] = useState('');
  const [productError, setProductError] = useState('');

  const [totalProduct, setTotalProduct] = useState();

  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/sales/total', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
        Accept: 'applicaton/json',
        'Content-Type': 'application/json'
      }
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          setTotal(res.sales_total);
          setTotalError('');
        })
      } else {
        data.json().then((res) => {
          const cleanText = res.message.replace(/<\/?[^>]+(>|$)/g, "");
          setTotalError(cleanText);
        })
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoadingState(false);
    })
  }, [])

  const handleInitialChange = (e) => {
    const arr = (e.target.value.split('-')).reverse();
    setInitialDate(arr.join('/'));
  }

  const handleEndChange = (e) => {
    const arr = (e.target.value.split('-')).reverse();
    setEndDate(arr.join('/'));
  }

  const handleSearch = () => {
    if (typeof initialDate !== "string" && typeof endDate !== "string") {
      return;
    }

    const body = {
      initial_date: initialDate,
      end_date: endDate,
    }
    fetch('http://127.0.0.1:5000/sales/timeframe', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
        Accept: 'applicaton/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          setTotalDate(res.sales_total);
          setDateError('');
        })
      } else {
        data.json().then((res) => {
          const cleanText = res.message.replace(/<\/?[^>]+(>|$)/g, "");
          setDateError(cleanText);
        })
      }
    }).catch((err) => {
      console.log(err);
    })
    
  }

  const searchIngredient = (keyword) => {
    fetch('http://127.0.0.1:5000/product/search_keyword?keyword=' + keyword, {
      method: 'GET',
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          setSearchResult(res.product_ids);
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  React.useEffect(() => {
    if (selected.product_id === '') {
      return;
    }
    
    const body = {
      product_id: selected.product_id
    }
    fetch('http://127.0.0.1:5000/sales/product', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
        Accept: 'applicaton/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          setTotalProduct(res.sales_total);
          setProductError('');
        })
      } else {
        data.json().then((res) => {
          const cleanText = res.message.replace(/<\/?[^>]+(>|$)/g, "");
          setProductError(cleanText);
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }, [selected.product_id])


  return (
    <div>
      
      {loadingState
        ? <div style={{ height: '100vh', backgroundColor: '#F9FAF9', paddingTop: '150px', display: 'flex', justifyContent: 'center' }}>
            <CircularProgress/>
          </div>
        : <>
          <div className={classes.title}>
            Sales
          </div>
        
          <div className={classes.root}>
            <div className={classes.container} >
              <div style={{ fontSize:'24px', color: 'black' }}>Total from all sales:</div> 
              <div style={{ fontSize:'24px' }}>
              {totalError !== ''
                  ? <>{totalError}</>
                  : <>${total}</>
                }
              </div>
            </div>
            <div className={classes.container} >
              <Stack
                direction="row"
                spacing={5}
              >
                <TextField
                  id="date"
                  label="Start Date"
                  type="date"
                  onChange={(e) => handleInitialChange(e) }
                  sx={{ width: 200 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="date"
                  label="End Date"
                  type="date"
                  onChange={(e) => handleEndChange(e) }
                  sx={{ width: 200 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <div style={{ marginTop:'10px' }}>
                  <RoundButton name={"Search"} onClick={handleSearch}/>
                </div>
              </Stack>
              <div style={{ marginTop: '2vh' }}>
                {typeof totalDate === undefined
                  ? <></>
                  : <>
                      <div style={{ fontSize:'18px', color: 'black' }}>Total sales from {initialDate} to {endDate}:</div> 
                      <div style={{ fontSize:'18px' }}>
                      {dateError !== ''
                        ? <>{dateError}</>
                        : <>${totalDate}</>
                      }
                      </div>
                    </>
                }
              </div>
            </div>
            <div className={classes.container} >
              <div>
                <div style={{ marginTop: '15px', marginBottom: '15px' }}>
                  <FormLabel component="legend" sx={{ color: '#89623D', fontSize: '18px', fontWeight: '500', marginBottom: '10px' }}>Search product</FormLabel>
                  <SearchBar width="375px" placeholder="Search Ingredient" border="1px solid black" searchFunc={searchIngredient} setSelected={setSelected} labelOption={false} />
                </div>
                {selected['isSelected'] ? <IngredientModalCard id={selected.product_id}  /> :
                  <Box p={1} sx={{maxHeight: '50vh', overflowY: 'scroll'}}>
                    {searchResult.map((id) => <IngredientModalCard id={id} key={id} setSelected={setSelected}/>)}
                  </Box>
                }
              </div>
              <div style={{ fontSize:'18px', color: 'black' }}>Total Sales: </div>
              <div style={{ fontSize:'18px' }}>
                {productError !== ''
                  ? <>{productError}</>
                  : <>${totalProduct}</>
                }
              </div>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default SalesDashboard;