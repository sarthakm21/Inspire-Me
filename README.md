# Inspire Me
A website on which people can share the productive tasks they are doing during this lockdown period. You can share your efforts or see what others are doing, to get motivated to work on some skills and learn something new yourself!

## Technology Used
- HTML, CSS and Vanilla Javascript
- Nodejs and Express as server-side environment
- MongoDB for database
- ejs as templating engine

## To run the project locally,

- Clone the repo from https://github.com/sarthakm21/sarthakm21-SGR-2.git by running **git clone https://github.com/sarthakm21/sarthakm21-SGR-2.git** in the terminal
- cd inside the folder sarthakm21-SGR-2 and run **npm install**
- Install MongoDB if not already installed.
- run **npm start**
- Navigate to **localhost:3000** on your browser.

## Routes

- ### "/" ### 
    - Get route that redirects to "/home" which renders the home page.
    - The ejs file 'home.ejs' is rendered

- ### "/posts" GET Route ###
    - This route takes you to the page where posts shared by people can be viewed
    - The ejs file 'index.ejs' is rendered

- ### "/posts/new" GET route ###
    - This route takes you to the page where you can share your work with other users
    - Renders 'new.ejs' file.
    - Sends a post request to 'localhost:3000/posts' page with the data entered by the user

- ### "/posts" POST request ###
    - This route adds the data sent from the '/posts/new' route to the database.
    - After addition of data, user is redirected to '/posts' page where the newly shared post is added.

## Database Schema (postSchema)

- Title : The title of Post (Datatype : String)
- Author : The name of the User posting (Datatype : String).
- Created : Date of posting. Set as Date.now by default (Datatype : Date).
- Content : The main content user wants to share (Datatype : String)
