import React, { useState } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { Stack, Typography, InputAdornment, FormLabel, Button, } from "@mui/material";
import { styled } from '@mui/material/styles';

import CustomTextField from "../components/TextField/CustomTextField";
import NumberTextField from "../components/TextField/NumberTextField";
import Navbar from '../components/Navbar';
import FileTextField from "../components/TextField/FileTextField";
import AddRecipeStepsContainer from '../components/AddRecipeStepsContainer';
import AddStep from "../components/AddStep";
import RoundButton from "../components/RoundButton";
import AddIngredientModal from "../components/AddIngredientModal";
import LabelSelect from "../components/LabelSelect";
import BuyRecipeModalCard from "../components/Recipe/BuyRecipeModalCard";
import Notification from "../components/Notification";

export const AddButton = styled(Button)(() => ({
  backgroundColor: '#89623D',
  color: "#ffffff",
  borderRadius: '3px',
  border: 'none',
  padding: '10px 16px',
  '&:hover': {
    backgroundColor: '#89623D',
  },
  textTransform: 'none',
  fontSize: '16px',
  margin: '16px 0',
}));


function AddRecipe() {
  const history = useHistory();
  const location = useLocation();
  
  const [recipeInfo, setRecipeInfo] = useState(
    {
      recipeName: '',
      photo: '',
      description: '',
      prepTime: 1,
      cookTime: 1,
      difficulty: 1,
      serves: 1,
      labels: [],
    });
  // const [attachment, setAttachment] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [newStep, setNewStep] = useState(false);
  const [newIngredient, setNewIngredient] = useState(false);
  const [edit, setEdit] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: 'error',
  });

  const handleNewIngredient = () => setNewIngredient(!newIngredient);

  const handleNewStep = () => {
    setNewStep(!newStep);
  }
  
  const sendToBack = () => {
    const recipeBody = {
      token: localStorage.getItem('cookbook-token'),
      title: recipeInfo.recipeName,
      photo: recipeInfo.photo,
      intro: recipeInfo.description,
      difficulty: recipeInfo.difficulty,
      cooktime: recipeInfo.cookTime,
      preptime: recipeInfo.prepTime,
      serves: recipeInfo.serves,
      ingredients: ingredients,
      steps: steps,
      labels: recipeInfo.labels,
    }

    if (edit === true) {
      recipeBody.recipe_id =  location.state.id;
      fetch('http://127.0.0.1:5000/recipe/edit', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
          Accept: 'applicaton/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipeBody)
      }).then((data) => {
        if (data.status === 200) {
          data.json().then((res) => {
            history.push('/recipe/' + res.recipe_id);
          })
        } else {
          data.json().then((res) => {
            setNotify({
              isOpen: true,
              message: res.message,
              type: 'error',
            });
          })
        }
      }).catch((err) => {
        console.log(err);
      })
    } else {
      fetch('http://127.0.0.1:5000/recipe/upload', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
          Accept: 'applicaton/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipeBody)
      }).then((data) => {
        if (data.status === 200) {
          data.json().then((res) => {
            history.push('/recipe/' + res.recipe_id);
          })
        } else {
          data.json().then((res) => {
            setNotify({
              isOpen: true,
              message: res.message,
              type: 'error',
            });
          })
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  React.useEffect(() => {
    if (location.state) {
      setSteps(location.state.steps);
      setIngredients(location.state.ingredients);
      setRecipeInfo({
        recipeName: location.state.name,
        photo: location.state.photo,
        description: location.state.description,
        prepTime: location.state.prep,
        cookTime: location.state.cook,
        difficulty: location.state.difficulty,
        serves: location.state.serves,
        labels: location.state.labels,
      })
      setEdit(true);
    }
  }, [])

  const handleRemoveIngredient = (id) => {
    setIngredients(ingredients.filter((ingredient) => ingredient['product_id'] !== id));
  }
  const changeQuantity = (id,event) => {
    const newList = [...ingredients];
    newList.map(item => {
      if (item['product_id'] === id) {
        item['quantity'] = parseInt(event.target.value);
      }
    });
    setIngredients(newList);
  }

  const handleRemoveStep = (item) => {
    setSteps(steps.filter((i) => i !== item));
  }

  return (
    <>
      <Navbar />
      <Stack
        direction="column"
        alignItems="center"
        pt={20}
        sx={{backgroundColor: '#F9FAF9', height: '100%'}}>
        <Notification notify={notify} setNotify={setNotify} /> 
        <Typography component="h1" variant="h3" sx={{color: "#FE793D", marginBottom: '36px'}}>Add Recipe</Typography>
        <Stack
          direction="column"
          alignItems="flex-start"
        >
          <CustomTextField id="recipeName" name="Recipe Name" value={recipeInfo['recipeName']} setValue={setRecipeInfo} field="object" width="781px"/>
          <FileTextField id="photo" name="Photo" setValue={setRecipeInfo} field="object" width="781px" accept="image/*"/>
          <CustomTextField id="description" name="Description" multiline value={recipeInfo['description']} setValue={setRecipeInfo} field="object" width="781px"/>
          <Stack
            direction="row"
            sx={{width: '781px'}}
            justifyContent="space-between"
          >
            <NumberTextField id="prepTime" name="Prep Time" value={recipeInfo['prepTime']} setValue={setRecipeInfo} field="object" width="100px" min="1" endAdornment={<InputAdornment position="end">min</InputAdornment>}/>
            <NumberTextField id="cookTime" name="Cook Time"  value={recipeInfo['cookTime']} setValue={setRecipeInfo} field="object" width="100px" min="1" endAdornment={<InputAdornment position="end">min</InputAdornment>}/>
            <NumberTextField id="difficulty" name="Difficulty" value={recipeInfo['difficulty']} setValue={setRecipeInfo} field="object" width="70px" min="1" max="5"/>
            <NumberTextField id="serves" name="Serves" value={recipeInfo['serves']} setValue={setRecipeInfo} field="object" width="70px" min="1" />
          </Stack>
          <LabelSelect labels={recipeInfo['labels']} setLabels={setRecipeInfo}/>
          <FormLabel component="legend" sx={{ color: '#89623D', fontSize: '18px', fontWeight: '500', marginTop: '15px' }}>Ingredients</FormLabel>

          {ingredients.map((ingredient => {
            return (
              <>
                <Typography component="p" sx={{color: '#9D9D9D', fontWeight: '600'}}>{ingredient.ingredient}</Typography> 
                <BuyRecipeModalCard key={ingredient['product_id']} id={ingredient['product_id']} quantity={ingredient['quantity']} removeItem={handleRemoveIngredient} changeQuantity={changeQuantity}/>
              </>
            )
          }))}


          <AddButton onClick={handleNewIngredient}> Add ingredient </AddButton>
          <AddIngredientModal open={newIngredient} onClose={handleNewIngredient} ingredients={ingredients} setIngredients={setIngredients}/>
          <FormLabel component="legend" sx={{ color: '#89623D', fontSize: '18px', fontWeight: '500', marginTop: '15px' }}>Steps</FormLabel>
          <div style={{ width: '100%' }}>
            <AddRecipeStepsContainer recipesData={steps} handleRemove={handleRemoveStep} />
            {newStep ? <AddStep steps={steps} setSteps={setSteps} newStep={newStep} setNewStep={() => setNewStep(false)}/> : <AddButton onClick={handleNewStep}> Add step </AddButton>}
          </div>
        </Stack>
        <div style={{ marginBottom: '20px'}}>
          {edit
            ? <RoundButton name="Edit Recipe" onClick={sendToBack}/>
            : <RoundButton name="Add Recipe" onClick={sendToBack}/>
          }
        </div>
      </Stack>
    </>
  )
}

export default AddRecipe;