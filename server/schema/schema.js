const { GraphQLInt } = require("graphql");
const graphql = require("graphql");
const _ = require("lodash");

// Import different objects from GraphQL package
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema } = graphql;

// Movies dummy data
const movies = [
  { name: "Joker", genre: "Drama", id: "1" },
  { name: "La La land", genre: "Musical", id: "2" },
  { name: "Interstellar", genre: "Sci-Fi", id: "3" },
  { name: "Kingdom", genre: "Romance", id: "4" },
];

// Directors dummy data
const directors = [
  { name: "Philips", age: 40, id: "1" },
  { name: "Anderson", age: 36, id: "2" },
  { name: "Damien", age: 25, id: "3" },
  { name: "Nolan", age: 53, id: "4" },
];

// Create a new object type
// name is the name of the object type
// fields are the different fields of the object type
// PS the order is important
const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID }, // ID enables to pass not "1", but just 1 (= more flexible)
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID }, // ID enables to pass not "1", but just 1 (= more flexible)
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

/* Example query from the frontend:
movie(id: "fsd2123y") {
    name
    gerne
}
*/

// Root queries need to be defined in the schema
// Movie query needs to specify the argument id to work
// The actually database requests needs to be defined via resolve()
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    movie: {
      // defines the name of the query
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        console.log(typeof args.id); // returns a string, because GraphQLID is in the end a string

        // this function acutally gets data from database
        return _.find(movies, { id: args.id });
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(directors, { id: args.id });
      },
    },
  }),
});

// Exports the schema,
// which includes the query
// and the respective object types
module.exports = new GraphQLSchema({
  query: RootQuery,
});
