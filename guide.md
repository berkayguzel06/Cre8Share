# Web Development Starter Kit

This is a starter kit for web development using Node.js, Express.js, React, and MySQL. Follow the steps below to set up your project.

## Prerequisites

- Node.js and npm installed. [Download Node.js](https://nodejs.org/)

- Visual Studio Code installed. [Download Visual Studio Code](https://code.visualstudio.com/)

## Step 1: Set Up a New Project

1. Create a new folder for your project.

2. Open the terminal in Visual Studio Code (`Ctrl + ` ` ` or `View > Terminal`), navigate to your project folder, and run:

    ```bash
    npm init -y
    ```

## Step 2: Install Dependencies

1. Install Express.js for your backend:

    ```bash
    npm install express
    ```

2. Install React and other necessary dependencies for the frontend:

    ```bash
    npx create-react-app client
    ```

3. Install MySQL package for Node.js:

    ```bash
    npm install mysql
    ```

## Step 3: Set Up Express.js Server

1. Create a file named `server.js` in your project's root folder.

2. Open `server.js` and set up a basic Express server:

    ```javascript
    const express = require('express');
    const app = express();
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    ```

## Step 4: Set Up MySQL Database

1. Create a MySQL database and table for your application.

2. Install the `mysql` package:

    ```bash
    npm install mysql
    ```

3. In your `server.js` file, configure the MySQL connection:

    ```javascript
    const mysql = require('mysql');

    const db = mysql.createConnection({
      host: 'your_database_host',
      user: 'your_database_user',
      password: 'your_database_password',
      database: 'your_database_name',
    });

    db.connect((err) => {
      if (err) {
        console.error('MySQL connection error: ' + err.stack);
        return;
      }
      console.log('Connected to MySQL database');
    });
    ```

## Step 5: Set Up React App

1. Navigate to the `client` folder and open `src/App.js`. Replace its content with your React components.

2. In the `client` folder, open the terminal and start the React development server:

    ```bash
    npm start
    ```

## Step 6: Connect Frontend and Backend

1. In your `server.js` file, add API routes to communicate with the React frontend:

    ```javascript
    app.get('/api/data', (req, res) => {
      // Handle database queries and return data
      res.json({ message: 'Data from server' });
    });
    ```

2. In your React component (e.g., `client/src/App.js`), make a fetch request to your backend:

    ```javascript
    useEffect(() => {
      fetch('/api/data')
        .then((res) => res.json())
        .then((data) => console.log(data));
    }, []);
    ```

## Step 7: Run Your Application

1. In the root folder of your project, run the following command to start the Express server:

    ```bash
    node server.js
    ```

2. In the `client` folder, run the React development server:

    ```bash
    npm start
    ```

3. Open your web browser and go to `http://localhost:3000` to view your React app.

Congratulations! You've now set up a basic web development project with Node.js, Express.js, React, and MySQL in Visual Studio Code. From here, you can continue building and expanding your application.

server runs port 5000
mysql db port 4000
react port 3000