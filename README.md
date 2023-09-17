## Description

Api developed to a test for the Onliner company, this api has the porpuse of receive a cnab file and save the transactions data into the database
## Installation

Before initialize the project, you need to install all the dependencies. To do that, run the follow command:

$ yarn

or

$ npm install

then you need to create the .env file in your project root, following the variables in the .env.example.

For the database and the app_port, the default constants are already there.

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
