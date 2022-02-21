# How to setup

1. Create server folder
2. Initialize a node project `npm init`
3. Install express `npm i express`
4. Create an express app (see **app.js** or **server.js**)
5. Install GraphQL for Express `npm install graphql express-graphql` OR `npm install apollo-server-express graphql`
6. Setup GraphQL server using Apollo Server and connect it to the express app (see **app.js** or **server.js**)
7. Connect GraphQL server with express (see **server.js**)
8. Create a MongoDB via
   1. MongoDB Atlas:
      1. Visit https://cloud.mongodb.com/
      2. Create a new project and shared database
      3. Setup a user and whitelist an ip address
   2. Locally: https://docs.mongodb.com/guides/server/install/
9. Connect MongoDB and GraphQL
   1. Disconnect from VPN (might block connection)
   2. Search for connection string in to connect the application
   3. Establish connection as shown in **app.js file**
   4. Create a mongoose model and schema for the data types inside mongoDB
10. How to create endpoints is explained here `make-endpoints.md`
