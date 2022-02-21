# Basics

_The following backend technologies can enhance GraphQL and make working with it easer_

- [Basics](#basics)
- [1. GraphQL Server](#1-graphql-server)
- [2. Express](#2-express)
- [3. MongoDB](#3-mongodb)
- [4. Mongoose](#4-mongoose)
- [5. Apollo Server](#5-apollo-server)

# 1. GraphQL Server

There, the **GraphQL server**

- defines and exposes the graph
- (e.g. movies and the relation b/w directors and movies)
- so data data can be retrieved from it

# 2. Express

Express is a web application framework for Node.js that enables

- create APIs (e.g. GraphQL server) more easily
- connect the GraphQL server to the MongoDB more easily
- in comparison to a pure Node.js backend, and
- many other standard operations (e.g. create APIs, web server)

# 3. MongoDB

MongoDB is a

- document-oriented database program
- a NoSQL database program,
- which uses JSON-like documents
- with optional schemas

It allows to

- store, retrieve, and change documents (data) in collections
- via the GraphQL server
- instead of records and tables in a SQL database

It does

- not enforce a schema, like SQL databases,
- but it still allows to create a schema if needed

The GraphQL API (https://docs.mongodb.com/realm/graphql/_)

- allows client applications
- to access data stored in a linked MongoDB cluster
- using any standard GraphQL client

# 4. Mongoose

Mongoose is a

- JavaScript object-oriented programming library
- that creates a connection between MongoDB
- and the Express web application

It makes communicating with the database

- more intuitive
- and faster

# 5. Apollo Server

_Referecene: https://www.apollographql.com/docs/apollo-server/_

Apollo server makes it

- easier to setup a GraphQL server with express (Node.js)
- Example see: `job-board/server/server.js`
