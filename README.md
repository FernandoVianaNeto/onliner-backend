## Description

Api developed to a test for the Onliner company, this api has the porpuse of receive a cnab file and save the transactions data into the database

## Installation

Before initialize the project, you need to install all the dependencies. To do that, run the follow command:

$ yarn

or

$ npm install

then you need to create the .env file in your project root, following the variables in the .env.example.

For the database and the app_port, the default constants are already there.

OBS: the client_app and the secret_app are the credentials to get the access token at /auth/app endpoint (you can see more informantion in /docs after you run the project)
OBS: you can use any value in the .env variables, except the app_port and database_uri.

## Running the app

After followed the steps above,

To start the project, you need to have the docker-compose and docker globally installed in your computer. After this, just run the follow command:

$ sudo docker-compose (for ubuntu)


# Tests

To run the tests, just use the command using the flag --coverage to access the project test coverage

$ yarn test --coverage

# Documentation

After run the project, you can access the swagger using the endpoint /docs in your browser.

There you can see the parameters of the endpoint, the expected results, the examples parameters and the description of the endpoint.

# Tecnologies
Nestjs (Node.js framework)
MongoDB (Database)
Typescript

# Libraries

Jest (Tests)
Passport (Authentication)
Swagger (Documentation)
