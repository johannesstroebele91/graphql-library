const fs = require("fs"); // built-in Node.js APIs // fs is short for file system
const { gql, ApolloServer } = require("apollo-server-express");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const db = require("./db");

const port = 9000;
const jwtSecret = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");

const app = express();
app.use(
  cors(),
  bodyParser.json(),
  expressJwt({
    secret: jwtSecret,
    credentialsRequired: false,
  })
);

// 1) Define GraphQL schema (inteface of the API)
// it describes what the API can do
// so what a query might return
// PS can contain multiple queries that can be made

// gql = graphql schema definition language
// "Query" if the name of the type here
// So a client can call the server and ask for the data greeting

// in typeDefs, a schema is defined
// it is by default "schema {query: Query}"
// so it can be skipped most of the times
const typeDefs = gql(fs.readFileSync("./schema.graphql", { encoding: "utf8" }));

// 2) Resolver
// Implementation how the server returns a value
// This function will be called by the GraphQL engine
// everytime the client sends a "greeting" query
// In other words it is called to "resolve" the value of the "greeting" field
const resolvers = require("./resolvers");

// 3) Apollo Server
// ApolloServer constructor takes configuration properties
// such as the schema "typeDef" and the resolvers
// Written in shorthand here, because property name match the variable names above
const apolloServer = new ApolloServer({ typeDefs, resolvers });
// Login
// Gets Email and the password from the request
// Tries to find the user from the db
// Check if the user with the password exists
// And if so returns an access token
// following the JSON web token standard

// 4) Plug apollo server into the exisitng express application
// Optionally a path can be added to specifiy
// where the GraphQL server should be exposed (default is "/graphql")
apolloServer.applyMiddleware({ app, path: "/graphql" });

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = db.users.list().find((user) => user.email === email);
  if (!(user && user.password === password)) {
    res.sendStatus(401);
    return;
  }
  const token = jwt.sign({ sub: user.id }, jwtSecret);
  res.send({ token });
});

app.listen(port, () =>
  console.info(`Server started on port ${port}: http://localhost:${port}/`)
);
