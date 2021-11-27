import React, { useState } from "react";
import PropTypes from 'prop-types';
import { makeStyles, styled } from '@mui/styles';
import { CircularProgress, Pagination, ToggleButton, ToggleButtonGroup, } from "@mui/material";
import DashboardContainer from "./DashboardContainer";

const useStyles = makeStyles({
  root: {
    backgroundColor: '#F9FAF9',
    height: '850px',
    width: '60vw',
    
    

    border: '3px solid #89623D',
    borderRadius: '10px',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    top: '55px',
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
  filter: {
    // paddingRight: '900px',

    display: 'flex',
    gap: '5px',

  },
  total: {
    top: '0px',
    left: '50vw',
    position: "relative",

    height: '35px',
    width: '170px',

    textAlign: 'center',

    backgroundColor: '#F9FAF9',

    fontFamily: 'Roboto',
    fontSize: '20px',

    color: '#89623D',
  },
  big: {
    position: 'static'
  }
})

const StyledToggleButtonGroup = styled(ToggleButtonGroup) ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: '15px',
    border: 0,
    backgroundColor: '#89623D',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#785635',
    },
    color: 'white',
  },
  '&.Mui-selected': {
    backgroundColor: 'red',
  }
})

function OrderDashboard({ admin }) {
  const classes = useStyles();
  const [allOrder, setAllOrder] = useState([]);
  const [order, setOrder] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('processing');
  const [loadingState, setLoadingState] = useState(true);

  React.useEffect(() => {
    setAllOrder([]);
    setOrder([]);
    fetch('http://127.0.0.1:5000/order/listall?status=' + filter, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
        Accept: 'applicaton/json',
        'Content-Type': 'application/json'
      },
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          setAllOrder(res.order_list);
        })
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoadingState(false);
    })
  }, [filter])

  const handlePage = (event, value) => {
    setPage(value);
  }

  React.useEffect(() => {
    const newOrder = allOrder.slice((page - 1) * 3, page * 3);
    setOrder(newOrder);
  }, [allOrder])

  React.useEffect(() => {
    const newOrder = allOrder.slice((page - 1) * 3, page * 3);
    setOrder(newOrder);
  }, [page])

  const handleMove = () => {
    fetch('http://127.0.0.1:5000/order/listall?status=' + filter, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
        Accept: 'applicaton/json',
        'Content-Type': 'application/json'
      },
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          setAllOrder(res.order_list);
        })
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoadingState(false);
    })
  }

  const handleFilter = (event, name) => {
    if (name !== null) {
      setFilter(name);
      setPage(1);
    }
  }

  return (
    <>
      {loadingState
        ? <div style={{ height: '100vh', backgroundColor: '#F9FAF9', paddingTop: '150px', display: 'flex', justifyContent: 'center', width: '90vh' }}>
            <CircularProgress
            />
          </div>
        : <div className={classes.big}>
            <div className={classes.filter}>
              <StyledToggleButtonGroup
                orientation="horizontal"
                exclusive
                sx={{ width:'100%' }}
                value={filter}
                onChange={handleFilter}
              >
                <ToggleButton value="processing">
                  Processing
                </ToggleButton>

                <ToggleButton value="dispatched">
                  Dispatched
                </ToggleButton>

                <ToggleButton value="delivered">
                  Delivered
                </ToggleButton>

              </StyledToggleButtonGroup>
              
            </div>
            <div className={classes.title}>
              Orders
            </div>
            <div className={classes.total}>
              Total: {allOrder.length}
            </div>
            <div className={classes.root}>
              <DashboardContainer data={order} handleMove={handleMove} admin={admin}/>
              <Pagination count={Math.ceil(allOrder.length / 3)} page={page} onChange={handlePage} />
            </div>
          </div>
      }
    </>
  )
}

OrderDashboard.propTypes = {
  admin: PropTypes.bool,
}

export default OrderDashboard;