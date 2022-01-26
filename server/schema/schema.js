const graphql = require("graphql");

// Import different objects from GraphQL package
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// Create a new object type
// name is the name of the object type
// fields are the different fields of the object type
// PS the order is important
const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

// Root queries need to be defined in the schema
// Movie query needs to specify the argument id to work
// The actually database requests needs to be defined via resolve()
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    movie: {
      // defines the name of the query
      type: MovieType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // this function acutally gets data from database
      },
    },
  }),
});

/* Example query from the frontend:
movie(123) {
    name
    gerne
}
*/

// Exports the schema,
// which includes the query
// and the respective object types
module.export = newGraphQLSchema({
  query: RootQuery,
});
