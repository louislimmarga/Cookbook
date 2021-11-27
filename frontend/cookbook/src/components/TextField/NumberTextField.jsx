/* eslint-disable react/prop-types */
import React from "react";
import { FormControl , FormLabel, OutlinedInput } from "@mui/material";

function NumberTextField(props) {
  const {id, name, value, setValue, field, width, endAdornment, startAdornment, min, max} = props;

  const handleChange = (event) => {
    if (field === "object") {
      setValue(prevState => {
        return {
        ...prevState,
        [id] : event.target.value,
        }
      });
    } else {
      setValue(event.target.value);
    }
  };

  return (
    <FormControl sx={{marginTop: '15px'}}>
        <FormLabel component="legend" sx={{ color: '#89623D', fontSize: '18px', fontWeight: '500' }}>{name}</FormLabel>
        <OutlinedInput id={id} value={value} type="number" onChange={handleChange} sx={{borderRadius: '3px', width: width, margin: '10px 0', backgroundColor:'#ffffff', color: '#000000'}}  
          startAdornment={startAdornment}
          endAdornment={endAdornment}
          inputProps={{ max: max, min: min }}
          />
    </FormControl>
  )  
}

export default NumberTextField;