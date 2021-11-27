# COMP3900 Computer Science Project - Internship404

## Project 5 - CookBook - E-Commerce Recommender System 

### Group Members
- Jenna Chan - z5259784 
- Trina (Ya-Ting) Chang - z5236461 
- Maria Cuyutupa Garcia - z5223865 
- Louis Limmarga - z5261841 
- Wincent Winarko - z5240353 

### What is CookBook

CookBook is an ecommerce system which sells grocery items filtered by recipe. A user will search or be recommended a recipe, then proceed to add all required ingredients to the cart with a few clicks. This increases the convenience of shopping for groceries as items do not need to be added and searched for individually. The platform also allows users to share, recipes and link ingredients so that other users can purchases them. CookBook allows for customisation of the cart so items can be added, removed or replaced, giving the customer increased flexibility.  

CookBook has two novel features: 1. The recommender system and 2. The community functions. CookBook has the functionality to make several types of recommendations – recommendations of recipes based on past purchases, questionnaire results, similar recipes or similar ingredients. The recommendation system encourages users to try new recipes and buy new ingredients and hence increases profits. Community functions such as adding recipes and rating/ commenting on recipes is highly encouraged through the use of CookBook Rewards points. Points are award when another user purchases items one’s uploaded recipe. These points can be converted into monetary values for use in a future purchase.

### Technology

Frontend - React.js

Backend - Python (Flask)

Database - Mongodb

## Library

**Backend**

1. flask
2. flask_cors
3. pyjwt
4. pymongo 
5. dnspython
6. pretty_html_table

**Frontend**
1. react
2. react-router-dom
3. material-ui
4. axios


### Build & Configure for First Time

Notes: Make sure you have installed node.js (recommended version: 12.16.2) and python3 (Python 3.6, pip >= 19.0) beforehand

1. Git clone or download this repo

  ` $ git clone git@github.com:unsw-cse-comp3900-9900-21T3/capstone-project-3900-h18b-internship404.git CookBook`

2. Change directory to CookBook's backend

  ` $ cd CookBook/backend `

3. Pip install requirement.txt to install required python libraries

  ` $ pip3 install -r requirement.txt`

4. Run the backend server (Flask application will run on localhost:5000)

` $ python3 server.py `

5. Open new terminal and Change directory to CookBook's frontend/cookbook

` $ cd CookBook/frontend/cookbook `

6. Run npm install to install required libraries

` $ npm install `

7. Run npm start to run the frontend server (React application will run on localhost:3000)

` $ npm start `

8. Open http://localhost:3000 with your favourite brower and enjoy our service

### Run
Notes: make sure you're on root directory

1. Change directory to backend directory

 ` $ cd CookBook/backend `
 
2. Run the backend server (Flask application will run on localhost:5000)

` $ python3 server.py `

3. Open new terminal and Change directory to CookBook's frontend/cookbook

` $ cd CookBook/frontend/cookbook `

4. Run npm start to run the frontend server (React application will run on localhost:3000)

` $ npm start `

5. Open http://localhost:3000 with your favourite brower and enjoy our service
