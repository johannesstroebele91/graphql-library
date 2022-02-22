# Basics

It is important to

- hide the GraphQL API from the outside
- to probibit unautorized users
- from adding jobs without login

The API can be hidden

- in the resolver
- by checking in the query or mutation
- if it was made by an autorized user

# HowTo

This can be done by using the context parameter which

- can provide application-specific data (e.g. user)
- not GraphQL data
- to GraphQL resolvers

To make this possible,

- it needs to be added as a parameter
- to the apolloServer instance
- as shown in `job-board/server/server.js`

```javascript
const context = ({ req }) => ({ user: req.user });

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});
```

Then, the context can be used in the resolver

- e.g. `job-board/server/resolvers.js`
- and handle if the user is authenticated

```javascript
const Mutation = {
  createJob: (root, { input }, context) => {
    if (!context.user) {
      throw new Error("Unauthorized");
    }

    const id = db.jobs.create(input);
    return db.jobs.get(id);
  },
};
```

Now the mutation is protected,

- if we want to use the mutation
- we need to get the token from
- Network > login request > answer
- copy the value and paste it in the following way
- into the HTTP headers of the GraphQL playground

```json
{
  "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJCSnJwLUR1ZEciLCJpYXQiOjE2NDU1NDk4NTh9.1ZsldG5dqp5sRq9fJX6B5IiijhtO3Ucqv8j21pJy2D0"
}
```
