# Base (nodejs typescript exspress mongodb) backend REST API application.

Flexible and expandable base backend REST API application structure with authorize by email/password and login by token; Using nodejs, typescript, express, mongodb, migrations, mocha, chai, swagger.

## • Requirements

- nginx
- nodeJs (version >= 10.8)
- mongodb
- git

## • Technologies

- nodeJS
- typescript
- express
- mongoDB
- migrations
- mocha/chai
- swagger

## • Scripts and Tasks

- `npm run build` - Build application (tsc)
- `npm run test`  - Run tests
- `npm run dev`   - Run application for development (via nodemon)
- `npm run prod`  - Run application for production

## • Getting Started

#### Step 1: Environment preparation

Install:

- Node.js and npm [https://nodejs.org/en/](https://nodejs.org/en/)
- MongoDB [https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/)
- Install global TypeScript and Nodemon `npm install -g typescript nodemon`
- Install global ts-node and debug`npm install -g ts-node debug`

#### Step 2: Configure Database

##### Create the user administrator

Start mongodb service and connect to the mongo shell

`$ mongo`

Create admin

> Set custom `<Username>` and `<Password>`

#### {- ! This operation create the admin user with access to all databases ! -}

```mongoshell
use admin
db.createUser(
  {
    user: "<Username>",
    pwd: "<Password>",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)
```

##### Enable Auth

Set 

```
auth = true
```

or 

```
security:
  authorization: "enabled"
```

in mongo config file 

Restart mongodb service

#### Step 3: Clone app

```
cd /var/www/ 

git clone https://github.com/artroot/base-nodejs-typescript-exspress-mongodb-backend-rest-api-app.git
```

#### Step 4:


## • Migrations

`node_modules/.bin/migrate list` -  Lists all migrations and their current state.

`node_modules/.bin/migrate up [migration-name]` - Migrates all the migration files 
that have not yet been run in chronological order. Not including [migration-name] will run UP 
on all migrations that are in a DOWN state.

`node_modules/.bin/migrate down <migration-name>` - Rolls back all migrations down to given name (if down
function was provided)

`node_modules/.bin/migrate prune` - Allows you to delete extraneous migrations by
removing extraneous local migration files/database migrations.

`node_modules/.bin/migrate create <migration-name>` - Creates a new migration file.

##  • Testing

Documentations:
- [Mocha](https://mochajs.org/#getting-started)
- [Chai](https://www.chaijs.com/api/bdd/)
- [Chai-http](https://www.chaijs.com/plugins/chai-http/)

Run all tests: 

```$xslt
npm run test
```

## • API Routes & Documentations


## • Project Structure

```
├── dist/ .......................... Compiled source files place
├── src/ ........................... Source files
│   ├── app.ts ..................... Application startpoint
│   ├── configs/ ................... App configuration files
│   │   └── config.ts.example ...... Configuration example
│   ├── controllers/ ............... API Controllers
│   ├── core/ ...................... Business logic implementation
│   │   ├── error .................. Custom Error Classes
│   │   ├── handlers/ .............. handlers middleware
│   │   │   ├── ErrorHandler.ts .... Handle all NOT OK responses
│   │   │   ├── HeadersHandler.ts .. Headers handler (Access-Control)
│   │   │   └── ResponseHandler.ts . Handle all OK responses
│   │   ├── sequrity/ .............. Security middleware
│   │   │   ├── Access.ts .......... Access controls to API methods
│   │   │   └── Auth.ts ............ Authorisation
│   │   ├── storages/ .............. Storages middleware
│   │   │   ├── mongodb/ ........... Base for work with mongoose
│   │   │   └── MongoStorage.ts .... Mongodb storage
│   │   ├── DBFactory.ts ........... Working with DB connections (static factory)
│   │   └── Helpers.ts ............. Custom helper class
│   ├── dbs/ ....................... Databases connection points
│   │   └── MongoDb.ts ............. Working with MongoDB
│   ├── ifaces/ .................... Interfaces
│   ├── models/ .................... Models
│   ├── routes/ .................... API routes
│   │   └── RoutesAvailable.ts ..... Available routes pool
│   ├── schemas/ ................... Object Schemes
│   └── server.ts .................. Web Server point
├── migrations ..................... Migration files
├── migrate.js ..................... Configuration for migrate package
├── swagger-iu ..................... Swagger UI - to visualize and interact with the API’s resources without having any of the implementation logic in place.
├── swagger.json ................... API documentation
├── swagger.yaml ................... swagger src file
├── test ........................... Tests place
│   └── api ........................ Contain API tests (Test file names must be <name>.test.ts)
├── tsconfig.json .................. tsc compilation configurations
```

## • Docker

