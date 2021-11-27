import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Recipe from './pages/Recipe';
import AddRecipe from './pages/AddRecipe';
import AddProduct from './pages/AddProduct';
import User from './pages/User';
import MyProfile from './pages/MyProfile';
import Cart from './pages/Cart';
import Recommendation from './pages/Recommendation';
import RecipeSearch from './pages/RecipeSearch';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/recommendation">
          <Recommendation />
        </Route>
        <Route path="/search">
          <RecipeSearch />
        </Route>
        <Route exact path="/recipe/add">
          <AddRecipe />
        </Route>
        <Route path="/recipe/:recipeId">
          <Recipe />
        </Route>
        <Route path="/product/add">
          <AddProduct />
        </Route>
        <Route path="/user/:userId">
          <User />
        </Route>
        <Route path="/profile">
          <MyProfile />
        </Route>
        <Route path="/cart" >
          <Cart />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
