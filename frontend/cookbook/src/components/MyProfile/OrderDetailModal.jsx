import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Modal, Box, FormLabel } from "@mui/material";
import OrderDetailCard from "./OrderDetailCard";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '31vw',
  bgcolor: 'background.paper',
  boxShadow: 10,
  p: 4,
};

function OrderDetailModal({ open, onClose, id }) {
  const [total, setTotal] = useState();
  const [productIds, setProductIds] = useState([]);
  const [loadingState, setLoadingState] = useState(true);

  React.useEffect(() => {
    if (id !== '') {
      fetch('http://127.0.0.1:5000/order/details?order_id=' + id, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
          Accept: 'applicaton/json',
          'Content-Type': 'application/json'
        },
      }).then((data) => {
        if (data.status === 200) {
          data.json().then((res) => {
            setTotal(res.total);
            setProductIds(res.details);
          })
        }
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoadingState(false);
      })
    }
  }, [])

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style} >
        {loadingState
          ?<></>
          : <div style={{ marginTop: '15px', marginBottom: '15px' }}>
              <FormLabel component="legend" sx={{ color: '#89623D', fontSize: '20px', fontWeight: '500', marginBottom: '10px' }}>Order Id</FormLabel>
              <FormLabel component="legend" sx={{ color: '#89623D', fontSize: '16px', fontWeight: '500', marginBottom: '10px', marginLeft: '15px' }}>{id}</FormLabel>
              <FormLabel component="legend" sx={{ color: '#89623D', fontSize: '20px', fontWeight: '500', marginBottom: '10px' }}>Details</FormLabel>
              {productIds.map((data, index) => {
                return (
                  <OrderDetailCard key={index} id={data.recipe_id} products={data.recipe_ingredients} subtotal={data.recipe_subtotal}/>
                )
              })}
              <FormLabel component="legend" sx={{ color: '#89623D', fontSize: '20px', fontWeight: '500', marginBottom: '10px' }}>Total Price</FormLabel>
              <FormLabel component="legend" sx={{ color: '#89623D', fontSize: '16px', fontWeight: '500', marginBottom: '10px', marginLeft: '15px' }}>${total}</FormLabel>
            </div>
        }
      </Box>
    </Modal>
  )
}

OrderDetailModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  id: PropTypes.string,
}

export default OrderDetailModal;