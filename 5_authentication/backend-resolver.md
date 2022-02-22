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
