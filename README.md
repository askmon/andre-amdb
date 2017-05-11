# AMDB - Andre Movie Database

This is Andre Movie Database, it uses Node, Typescript, Memcached and MySQL.

To see more details and explanations, check [here](explanations.md)

## Prerequisites

0. Install [nvm](https://github.com/creationix/nvm#installation)
0. On the project root folder, make sure you're using the same node version as in `.nvmrc` file by using: `nvm install` command, or just `nvm use` if you already have it installed
0. Install [yarn](https://yarnpkg.com): `npm install -g yarn`
0. Make sure you have (Docker)[https://docs.docker.com/engine/installation/] and (docker-compose)[https://docs.docker.com/compose/install/] installed (if you want to run the dev database/memcache locally)
0. Run `docker-compose up -d`
0. Create a `.env` file and add the environment variables according to your usage (you can use `.env.sample` as a base)
0. Run `yarn migrate` to create the database tables with the correct schemas

## Running

0. Run `yarn`, this will install the packages and build the project
0. Execute `yarn start` to run the api

## Tests

0. Run `yarn test`to execute the tests.

## Endpoints

There's a Postman collection on the docs folder with each endpoint, just remember to set the `url` environment variable according to your needs.

## Deploy

Just push the code to Heroku (and be sure the environment variables are set).