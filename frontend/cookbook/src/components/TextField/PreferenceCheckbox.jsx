/* eslint-disable react/prop-types */
import React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function PreferenceCheckbox({question, value, setValue, options}) {
  const handleChange = (event) => {
    // const selected =  event.target.checked;
    setValue({
      ...value,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">{question}</FormLabel>
        <FormGroup>
          {options.map(option => 
            <FormControlLabel
            control={
              <Checkbox checked={value[option]} onChange={handleChange} name={option} />
            }
            label={option}
            key={option}
          />
          )}
        </FormGroup>
      </FormControl>
    </Box>
  );
}

export default PreferenceCheckbox;