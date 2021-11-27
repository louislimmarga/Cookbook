import React, { useState } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import { Modal, Box, FormLabel } from "@mui/material";
import CustomTextField from "./TextField/CustomTextField";
import SearchBar from "./SearchBar";
import SquareButton from "./SquareButton";
import IngredientModalCard from "./IngredientModalCard";
import NumberTextField from "./TextField/NumberTextField";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 10,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
};

function AddIngredientModal({ open, onClose, ingredients, setIngredients }) {
  const [name, setName] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState({
    isSelected: false,
    product_id: '',
  });

  const handleIngredient = () => {
    const body = {
      ingredient: name,
      product_id: selected['product_id'],
      quantity: parseInt(quantity),
    }
    setIngredients([...ingredients, body]);
    setName('');
    onClose();
  }
  const searchIngredient = (keyword) => {

    axios.get('http://127.0.0.1:5000/product/search_keyword', 
      {params: {
        keyword,
      }})
      .then((res) => {
        setSearchResult(res.data['product_ids']);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style} >
        <CustomTextField id="ingredientName" name="Name" value={name} setValue={setName} width="400px"/>
        <div style={{ marginTop: '15px', marginBottom: '15px' }}>
          <FormLabel component="legend" sx={{ color: '#89623D', fontSize: '18px', fontWeight: '500', marginBottom: '10px' }}>Ingredient</FormLabel>
          <SearchBar width="375px" placeholder="Search Ingredient" border="1px solid black" searchFunc={searchIngredient} setSelected={setSelected} labelOption={false}/>
        </div>
        {selected['isSelected'] ? <IngredientModalCard id={selected['product_id']}  /> :
          <Box p={1} sx={{maxHeight: '50vh', overflowY: 'scroll'}}>
            {searchResult.map((id) => <IngredientModalCard id={id} key={id} setSelected={setSelected}/>)}
          </Box>
        }
        <NumberTextField id="quantity" name="Quantity" value={quantity} setValue={setQuantity} width="70px" min="1" />
        {selected['product_id'] === ''
          ? <SquareButton name="Confirm" disabled={selected['product_id'] === ''}/>
          : <SquareButton name="Confirm" onClick={handleIngredient} />
        }
        
      </Box>
    </Modal>
  )
}

AddIngredientModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  ingredients: PropTypes.array,
  setIngredients: PropTypes.func,
}

export default AddIngredientModal;