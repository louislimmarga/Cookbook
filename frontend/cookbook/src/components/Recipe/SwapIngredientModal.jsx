import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import { Modal, Box, Stack, Typography, Divider, CircularProgress} from "@mui/material";
import axios from "axios";
import IngredientModalCard from "../IngredientModalCard";
// import SquareButton from "./SquareButton";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 410,
  bgcolor: 'background.paper',
  boxShadow: 10,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
};

function SwapIngredientModal({ open, onClose, ingredient, id, swapIngredient}) {
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState({
    isSelected: false,
    product_id: id,
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/recommendation/swap', {
      params: {
        product_id: id,
    }})
    .then((res) => {
      setRecommendedItems(res.data['product_id']);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    })
  }, [open]);

  useEffect(() => {
    if (selected['product_id'] != id) {
      swapIngredient(id, selected['product_id']);
    }
  }, [selected]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style} >
        <Stack
          alignItems="center"
          spacing={2}
        >
        <img src={ingredient['photo']} alt="Ingredient Image" width="60%"/>
        <Typography variant="h5" sx={{color: '#977554'}}>{ingredient['title']}</Typography>
        <Typography variant="h6" sx={{color: '#977554'}}>$ {ingredient['price']}</Typography>
        </Stack>
        <Divider />
        {loading ? <CircularProgress sx={{position: 'relative', left: '50%', margin: '20px 0'}}/> :
          <Stack sx={{overflowY: 'auto', height: '30vh', width: '440px'}}>
            {recommendedItems.map(item => <IngredientModalCard id={item} key={item} setSelected={setSelected}/>)}
          </Stack>
        }
      </Box>
    </Modal>
  )
}

SwapIngredientModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  ingredient: PropTypes.object,
  id: PropTypes.string,
  swapIngredient: PropTypes.func,
}

export default SwapIngredientModal;