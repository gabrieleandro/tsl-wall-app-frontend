# TSL Wall App | Front-End

A TSL - Hiring Assignments project built  with [Create React App](https://github.com/facebook/create-react-app).

Wall App is an application that allows users to register, login, and write on a wall.

## Table of Contents

- [Installation](#installation)
- [Environment variables](#environment-variables)
- [Usage](#usage)
- [Testing](#testing)

# Installation

Clone this repo.

```bash
git clone git@github.com:gabrieleandro/tsl-wall-app-frontend.git
cd tsl-wall-app-frontend
```

Install the requirements

```bash
yarn install
```
or
```bash
npm install
```

# Environment variables

Copy our .env.example file (included in this repo) or create a .env file with 

```env
REACT_APP_API_BASE_URL=
REACT_APP_COOKIE_NAME=
```

# Usage

In order to work properly make sure you have the [back-end](https://github.com/gabrieleandro/tsl-wall-app-backend) app running.

Run the using the following command:

```bash
yarn start
```
or
```bash
npm start
```

Now you can access at http://localhost:3000/

# Testing

Test using [Cypress](https://docs.cypress.io/) is a next generation front end testing tool built for the modern web. We address the key pain points developers and QA engineers face when testing modern applications.


```bash
yarn run cypress:open 
```
or
```bash
npm run cypress:open
```