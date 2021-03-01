# Project 10 - Full Stack App with React and a REST API

In this project, we had to create a REST API using Express. This API provides a way to administer a school database containing information about users and courses. Users can interact with the database to create new courses, retrieve information on existing courses, and update or delete existing courses. To make changes to the database, users are required to log in so the API will also allow users to create a new account or retrieve information on an existing account.

In this project, we had to use React to create a client for our existing school database REST API (that we created in a previous project). The full stack application provides a way for users to administer a school database containing information about courses: users can interact with the database by retrieving a list of courses, view details for a specific course, as well as creating, updating and deleting courses in the database.

## Usage

- Clone the repo
- Install dependencies using `$ npm install`
- Start the server using `$ npm start`
- Create the database using `$ npm run seed`
- Navigate to the browser of choice and enter `http://localhost:5000/` to run the app locally
- You should see a `Welcome to the REST API project!` message
- To test the various routes, import the `RESTAPI.postman_collection.json` file into Postman

## Technologies

- JavaScript
- React (React Router, React Hooks and React Context API)
- Node.js
- Express
- bcryptjs
- REST API
- SQLite
- SQL ORM Sequelize
