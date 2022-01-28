# How GraphQL and MongoDB are connected

_Reference: https://docs.mongodb.com/realm/graphql/_

GraphQL API

- allows client applications
- to access data stored in a linked MongoDB cluster
- using any standard GraphQL client

# Connect MongoDB and GraphQL

1. Disconnect from VPN (might block connection)
2. Search for connection string in to connect the application
3. Establish connection as shown in **app.js file**
4. Create a mongoose model and schema for the data types inside mongoDB

# GraphQL vs Mongoose Schema

GraphQL schema defines the graph, so

- the objects types
- and the relationships between them

Mongoose schema defines the data

- that is actually stored in MongoDB
- so that MongoDB understands
- what data will be requested from it,
- and it knows what data will be returned
