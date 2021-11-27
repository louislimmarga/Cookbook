import React, {useState} from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Divider, FormControl, MenuItem, Select, Skeleton } from "@mui/material";
import RoundButton from "../RoundButton";
import OrderDetailModal from "./OrderDetailModal";

const useStyles = makeStyles({
  root: {
    backgroundColor: '#FFFFFF',
    width: '80%',

    borderRadius: '10px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',

    margin: '20px',
    padding: '30px 30px 30px 30px',

    display: 'flex',
    wordWrap: 'break-word',
  },
  block: {
    height: '150px',
    marginLeft: '2vw',
    marginRight: '2vw',
  }
})

function OrderCard({ order, handleMove, admin }) {
  const classes = useStyles();
  const [info, setInfo] = useState({
    'order_id': '',
    'status': '',
    'username': '',
    'order_time': '',
    'firstname':'',
    'lastname': '',
    'address': '',
    'state': '',
    'postcode': ''
  });
  const [loadingState, setLoadingState] = useState(true);
  const [status, setStatus] = useState('processing');
  const [openModal, setOpenModal] = useState(false);

  React.useEffect(() => {
    setLoadingState(true);
  }, [order])

  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/order/view?order_id=' + order, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
        Accept: 'applicaton/json',
        'Content-Type': 'application/json'
      },
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          setInfo(res);
          setStatus(res.status);
        })
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoadingState(false);
    })
  }, [order])

  const handleChange = (event) => {
    setStatus(event.target.value);
    const body = {
      'order_id': info.order_id,
      'status': event.target.value,
    }
    fetch('http://127.0.0.1:5000/order/update', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
        Accept: 'applicaton/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then((data) => {
      if (data.status === 200) {
        handleMove();
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoadingState(false);
    })
  };

  const handleModal = () => {
    setOpenModal(!openModal);
  }

  return (
    <div className={classes.root}>
      {loadingState
        ? <>
            <div className={classes.block} style={{ width: '14vw' }} >
              <div style={{ color:'#FE793D', fontWeight:'bold' }}>Order ID</div>
              <div style={{ color:'#89623D', paddingLeft: '15px' }}><Skeleton width="100%" /></div>
              <div style={{ height:'50px' }}></div>
              <div style={{ color:'#FE793D', fontWeight:'bold' }}>Order Status</div>
              <Skeleton height="50px" />
            </div>
            <Divider orientation="vertical" variant="middle" flexItem/>
            <div className={classes.block} style={{ width: '22vw' }}>
              <div style={{ color:'#89623D', fontWeight:'bold' }}>User Name</div>
              <Skeleton width="100%" />
              <div style={{ height:'20px' }}></div>
              <div style={{ color:'#89623D', fontWeight:'bold' }}>Ordered</div>
              <Skeleton width="100%" />
              <div style={{ height:'20px' }}></div>
              <div style={{ color:'#89623D', fontWeight:'bold' }}>Delivery address</div>
              <Skeleton width="100%" />
            </div>
            <div className={classes.block} style={{ width: '4vw' }}>
              <RoundButton name="View"/>        
            </div>
          </>
        : <>
            <div className={classes.block} style={{ width: '14vw' }} >
              <div style={{ color:'#FE793D', fontWeight:'bold' }}>Order ID</div>
              <div style={{ color:'#89623D', paddingLeft: '15px' }}>{info.order_id}</div>
              <div style={{ height:'50px' }}></div>
              <div style={{ color:'#FE793D', fontWeight:'bold' }}>Order Status</div>
              {admin 
                ? <FormControl sx={{ minWidth: 200 }}>
                    <Select
                      id="orderStatus"
                      value={status}
                      onChange={handleChange}
                      displayEmpty
                      sx={{ width: '13vw' }}
                    >
                      <MenuItem value='processing'>processing</MenuItem>
                      <MenuItem value='dispatched'>dispatched</MenuItem>
                      <MenuItem value='delivered'>delivered</MenuItem>
                    </Select>
                  </FormControl>
                : <div style={{ color:'#89623D', paddingLeft: '15px', display: 'flex', alignItems: 'center', height: '50px' }}>{info.status}</div>
              }
              
            </div>
            <Divider orientation="vertical" variant="middle" flexItem/>
            <div className={classes.block} style={{ width: '24vw' }}>
              <div style={{ color:'#89623D', fontWeight:'bold' }}>User Name</div>
              <div>{info.username}</div>
              <div style={{ height:'20px' }}></div>
              <div style={{ color:'#89623D', fontWeight:'bold' }}>Ordered</div>
              <div>{info.order_time}</div>
              <div style={{ height:'20px' }}></div>
              <div style={{ color:'#89623D', fontWeight:'bold' }}>Delivery address</div>
              <div>{info.address}, {info.state} {info.postcode}</div>
            </div>
            <div className={classes.block} style={{ width: '4vw' }}>
              <RoundButton name="View" onClick={handleModal}/>        
            </div>
            <OrderDetailModal open={openModal} onClose={handleModal} id={order}/>
          </>
      }
    </div>
  )
}

OrderCard.propTypes = {
  order: PropTypes.string,
  handleMove: PropTypes.func,
  admin: PropTypes.bool,
}

export default OrderCard;