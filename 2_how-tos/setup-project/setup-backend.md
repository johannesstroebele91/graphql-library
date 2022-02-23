**How to setup**

1. Create server folder
2. Initialize a node project `npm init`
3. Install express `npm i express`
4. Create an express app (see **app.js** or **server.js**)
5. Install GraphQL for Express `npm install graphql express-graphql` OR `npm install apollo-server-express graphql`
6. Define GraphQL Schemas
7. Define resolvers
8. Create an Apollo Server
9. Handle login
10. Create a MongoDB
11. Connect MongoDB and GraphQL
12. Setup apollo server fors subscriptions
13. Listen for connections

**Further explanations for the steps are provided below**

- [4. Create an express app](#4-create-an-express-app)
- [6. Define a GraphQL Schema](#6-define-a-graphql-schema)
- [7. Resolver](#7-resolver)
- [8. Apollo Server](#8-apollo-server)
- [9. Login](#9-login)
- [10. Create a MongoDB](#10-create-a-mongodb)
- [11. Connect MongoDB and GraphQL](#11-connect-mongodb-and-graphql)
- [12. Setup apollo server for subscription](#12-setup-apollo-server-for-subscription)
- [13. Listen for connections](#13-listen-for-connections)

# 4. Create an express app

```javascript
const app = express();
app.use(
  cors(),
  bodyParser.json(),
  expressJwt({
    secret: jwtSecret,
    credentialsRequired: false,
  })
);
```

# 6. Define a GraphQL Schema

Define GraphQL schema (inteface of the API)

- it describes what the API can do
- so what a query might return
- PS can contain multiple queries that can be made

gql = graphql schema definition language

- "Query" if the name of the type here
- So a client can call the server and ask for the data greeting

Example: `job-board/server/schema.graphql`

```graphql
type Query {
  jobs: [Job]
}

type Job {
  id: ID!
  title: String
  company: Company
  description: String
}
```

In typeDefs, a schema is defined

- it is by default "schema {query: Query}"
- so it can be skipped most of the times

Example `job-board/server/server.js`

```javascript
const typeDefs = gql(fs.readFileSync("./schema.graphql", { encoding: "utf8" }));
```

# 7. Resolver

Implementation how the server returns a value

- A resolver is called by the GraphQL engine
- everytime the client sends a request
- so it is called to "resolve"
- the value of the respective field field

The resolver takes the request from the client

- handels the data (in the database)
- as specified (e.g. query, mutation)
- and gives it back to the client

Example: `job-board/server/resolvers.js`

```javascript
const db = require("./db");
const Query = {
  jobs: () => db.jobs.list(),
};
module.exports = { Query };
```

Example `job-board/server/server.js`

```javascript
const resolvers = require("./resolvers");
```

Passing application data (e.g. user)

- to the resolver
- is done using the "context" function

# 8. Apollo Server

The ApolloServer constructor takes

- configuration properties
  - schema "typeDef"
  - resolvers
  - context

Mounts apollo server (GraphQL server)

- onto the exisiting express application
- optionally a path can be specified
- which is by default "/graphql"

Example `job-board/server/server.js`

```javascript
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

apolloServer.applyMiddleware({ app, path: "/graphql" });
```

# 9. Login

Gets Email and the password from the request

- tries to find the user from the db
- check if the user with the password exists
- and if so returns an access token
- following the JSON web token standard

```javascript
const jwtSecret = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");

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
```

# 10. Create a MongoDB

Two possibilities:

- MongoDB Atlas:
  1.  Visit https://cloud.mongodb.com/
  2.  Create a new project and shared database
  3.  Setup a user and whitelist an ip address
- Local instance: https://docs.mongodb.com/guides/server/install/

# 11. Connect MongoDB and GraphQL

1. Disconnect from VPN (might block connection)
2. Search for connection string in to connect the application
3. Establish connection as shown in **app.js file**
4. Create a mongoose model and schema for the data types inside mongoDB

# 12. Setup apollo server for subscription

Explicitly create a http server instance

- instead by letting it be created implicitly by express app
- which enables to tell the apollo server
- to install subscription handler on the http server

# 13. Listen for connections

Enables to start the server and

- listens for connections
- on a specified port

```javascript
app.listen(port, () =>
  console.info(
    `Server started on port ${port}: http://localhost:${port}/graphql`
  )
);
```
