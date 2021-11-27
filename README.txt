COMP3900-h18b-internship404

GitHub Repo: https://github.com/unsw-cse-comp3900-9900-21T3/capstone-project-3900-h18b-internship404
Jira Page: https://comp3900-h18b-internship404.atlassian.net/jira/software/projects/CHI/boards/1

Directory File Structure: 
    backend/ Directory
        - Contains all backend code using Flask framework
        - Contains connection to MongoDB 
    frontend/ Directory
        - Contains all frontend code using NodeJS
        - frontend/src/components/ contains all reactJS components
            subdirectories categorise each pages components
        - frontend/src/pages/ contains all pages for CookBook frontend
    Diaries Directory 
        - Contains individual diaries from all students in the group

Assumptions:
    - NodeJS has been installed such that 'npm' can be used

Set up instructions:
    1. Open a terminal on your computer (backend)
    2. Change to the correct directory - capstone-project-3900-h18b-internship404\backend
    3. Run 'pip3 install -r requirement.txt' to install libraries
    4. Start the back end server by running 'python3 \server.py'
    5. Open another terminal on your computer (frontend)
    6. Change to the correct directory- capstone-project-3900-h18b-internship404\frontend\CookBook
    7. Run 'npm install'
    8. Start the front end 'npm Start'
    9. The application should automatically open (http://localhost:3000)