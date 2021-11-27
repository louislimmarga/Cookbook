/* eslint-disable react/prop-types */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const labelList = [
  "Vegetarian", "Vegan", "Gluten Free",
  "Beef", "Pork", "Lamb", "Chicken", "Fish", "Seafood",
  "Australian", "American", "Chinese", "Indonesian", "Italian", "Japanese", "Korean", "Mexican", "Taiwanese", "Turkish",
  "Breakfast", "Lunch", "Dinner", "Snack", "Dessert", 
  "No oven", "No toaster", "No stove", "No fridge/freezer", "No microwave",
  "0-15 min", "16-30 min", "31-60 min", "60+ min"
];

function getStyles(label, labels, theme) {
  return {
    fontWeight:
      labels.indexOf(label) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function LabelSelect({labels, setLabels}) {
  const theme = useTheme();
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setLabels(prevState => {
      return {
      ...prevState,
      labels :  typeof value === 'string' ? value.split(',') : value,
      }
    });
  };

  return (
    <div>
      <FormControl sx={{width: '781px' }}>
        <FormLabel component="legend" sx={{ color: '#89623D', fontSize: '18px', fontWeight: '500' }}>Labels</FormLabel>
        <Select
          multiple
          sx={{margin: '10px 0', backgroundColor:'#ffffff', color: '#000000'}}
          value={labels}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {labelList.map((label) => (
            <MenuItem
              key={label}
              value={label}
              style={getStyles(label, labels, theme)}
            >
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default LabelSelect;