/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogActions, Paper } from '@mui/material';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Qs from 'qs'

// import { useHistory } from 'react-router-dom';

import PreferenceCheckbox from './TextField/PreferenceCheckbox';
import SquareButton from './SquareButton';


const dialogTheme = createTheme({
  components: {
    // Name of the component
    MuiDialog: {
      styleOverrides: {
        // Name of the slot
        paper: {
          backgroundColor: '#F9FAF9',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '42px 223px',
          height: '80%'
        },
      },
    },
  },
});

const options = [
  ["Vegetarian", "Vegan", "Gluten Free"],
  ["Beef", "Pork", "Lamb", "Chicken", "Fish", "Seafood"],
  ["Australian", "American", "Chinese", "Indonesian", "Italian", "Japanese", "Korean", "Mexican", "Taiwanese", "Turkish"],
  ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"],
  ["No oven", "No toaster", "No stove", "No fridge/freezer", "No microwave"],
  ["0-15 min", "16-30 min", "31-60 min", "60+ min"]
];

const questions = [
  "Dietary restrictions (strict restriction)",
  "Meat",
  "Cuisine",
  "Course",
  "Appliance",
  "Cook/Prep time"
];

function PreferenceDialog({open, setOpen, setRecipes}) {
  // const history = useHistory();
  const [q1Object, setQ1Object] = useState({
    "Vegetarian": false, 
    "Vegan": false, 
    "Gluten Free": false
  });
  const [q2Object, setQ2Object] = useState({
    "Beef": false,
    "Pork": false, 
    "Lamb": false, 
    "Chicken": false, 
    "Fish": false, 
    "Seafood": false
  });
  const [q3Object, setQ3Object] = useState({
    "Australian": false, 
    "American": false, 
    "Chinese": false, 
    "Indonesian": false, 
    "Italian": false, 
    "Japanese": false, 
    "Korean": false, 
    "Mexican": false, 
    "Taiwanese": false, 
    "Turkish": false,
  });
  const [q4Object, setQ4Object] = useState({
    "Breakfast": false, 
    "Lunch": false, 
    "Dinner": false, 
    "Snack": false, 
    "Dessert": false
  });
  const [q5Object, setQ5Object] = useState({
    "No oven": false, 
    "No toaster": false, 
    "No stove": false, 
    "No fridge/freezer": false, 
    "No microwave": false
  });
  const [q6Object, setQ6Object] = useState({
    "0-15 min": false, 
    "16-30 min": false, 
    "31-60 min": false, 
    "60+ min": false
  });

  const getPreference = (qObject) => {
    const qList = [];
    for (const [key, value] of Object.entries(qObject)) {
      if (value) {
        qList.push(key.toLowerCase());
      }
    }
    // console.log(qList);
    return qList;
  };

  const handleSubmit = () => {
    const qq = {
      'q1': getPreference(q1Object),
      'q2': getPreference(q2Object),
      'q3': getPreference(q3Object),
      'q4': getPreference(q4Object),
      'q5': getPreference(q5Object),
      'q6': getPreference(q6Object),
    }
    axios.get('http://127.0.0.1:5000/recommendation/questions', {
      params: qq,
      paramsSerializer: function (params) {
        return Qs.stringify(params, {  arrayFormat: 'repeat' })
      },
    })
        .then((res) => {       
          const arr = [];
          res.data['recipe_list'].map(x => arr.push(x[0]));
          setRecipes(arr);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setOpen(!open));
  };
    

  return (
    <ThemeProvider theme={dialogTheme}>
      <Dialog 
        open={open} 
      > 
        <DialogTitle sx={{color: '#FE793D', fontSize: '2rem'}}>Welcome to CookBook!</DialogTitle>
        <DialogTitle sx={{color: '#89623D', fontSize: '1.25rem', textAlign: 'center'}}>We will ask you some questions that will help us to reccomend you our recipes.</DialogTitle>
        <Paper eleveation={3} sx={{width:'80%', display: 'flex', flexDirection: 'column', height: '60%', overflowY: 'scroll'}} >
          <PreferenceCheckbox
            question={questions[0]} 
            value={q1Object} 
            setValue={setQ1Object} 
            options={options[0]} 
          />
          <PreferenceCheckbox
            question={questions[1]} 
            value={q2Object} 
            setValue={setQ2Object} 
            options={options[1]} 
          />
          <PreferenceCheckbox
            question={questions[2]} 
            value={q3Object} 
            setValue={setQ3Object} 
            options={options[2]} 
          />
          <PreferenceCheckbox
            question={questions[3]} 
            value={q4Object} 
            setValue={setQ4Object} 
            options={options[3]} 
          />
          <PreferenceCheckbox
            question={questions[4]} 
            value={q5Object} 
            setValue={setQ5Object} 
            options={options[4]} 
          />
          <PreferenceCheckbox
            question={questions[5]} 
            value={q6Object} 
            setValue={setQ6Object} 
            options={options[5]} 
          />
        </Paper>
        <DialogActions sx={{margin: '28px'}}>
          <SquareButton name="Submit" onClick={handleSubmit}/>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}

export default PreferenceDialog;