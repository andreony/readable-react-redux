
# Would you rather app
<a href="https://www.udacity.com/">
  <img src="https://s3-us-west-1.amazonaws.com/udacity-content/rebrand/svg/logo.min.svg" width="300" alt="Udacity logo">
</a>


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template and the new functional component approach

 -  `npx create-react-app my-app --template redux` 

  Readable project acts as a boilerplate for content and comment structure like applications, such as Hacker News and Reddit. It explores lots of functionality in terms of Redux store management as well as React-Redux bindings, providing users the usual **CRUD** capabilities for posts and comments, that is, Create/Read/Update/Delete.   
    
## Table of Contents

- [Table of Contents](#table-of-contents)
- [Instructions](#instructions)
- [Application](#application )
- [Backend Server](#backend-server)
- [To Do(s)](#to-dos)

## Instructions

`cd /your/project/path-here/frontend`
Go to frontend dir
  
`npm install`
To install dependencies

`yarn start`
Runs the app in the development mode.<br />

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

  

The page will reload if you make edits.<br />

You will also see any lint errors in the console.

  

### `yarn test`

  

Launches the test runner in the interactive watch mode.<br />

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

  

### `yarn build`

  

Builds the app for production to the `build` folder.<br />

It correctly bundles React in production mode and optimizes the build for the best performance.

  

The build is minified and the filenames include the hashes.<br />

Your app is ready to be deployed!

  

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

  

### `yarn eject`

  

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

  

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

  

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

  

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
  

## Application 

The app features a dashboard were the user can see all posts, sorted by date, with the newest on top. The users can also sort by the number of votes or post title.

All posts are grouped into several per-defined categories which allow viewers to easy browse to specific content types

Users ca create, read, update or delete as well as vote posts and comments, and search specific post titles using the navbar search feature.

## Backend Server
The backend features a light weight ExpressJS server, which provides documented API endpoints to manage application data storing, reading, updating, and deleting
`cd /your/project/path-here/api-server`

`node server`
Start the server

 - **NOTE**: The API documentation for the server can be seen by sending a `GET` request to the server root while it's running. You can open [http://localhost:3001](http://localhost:3000) to view it in the browser(server must be running).

## To Do(s)
- Add component proptypes
 - Add a [**Firebase**](https://firebase.google.com/docs/auth/) authentication mechanism
 - Add possibility to create post categories 


