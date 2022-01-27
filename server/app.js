const express = require("express");
const { graphqlHTTP } = require("express-graphql"); // {} enables to destructure only certain objects of the complete express package
const schema = require("./schema/schema");

// Create express app
const app = express();

/* Setup supercharged endpoint
 * by using a middleware
 * The graphHTTP function will fire
 * based on the request comes in
 * and handle the request */
app.use(
  "/graphql",
  graphqlHTTP({
    schema, // or long: schema: schema
    graphiql: true,
  })
);

const port = 5000;

app.listen(port, () => {
  console.log("Server listening on port: " + port);
});
